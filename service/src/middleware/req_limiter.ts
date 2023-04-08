import { isNotEmptyString } from '../utils/is'
import { getFPByfingerprint, insertFP, updateFP, countDocuments } from '../middleware/storage/mongo'

const req_limiter = function (req, res) {
    const MONGODB_URL = process.env.MONGODB_URL
    const COUNT = !isNaN(+process.env.COUNT) ? +process.env.COUNT : 10 //每日使用上限，默认10次
    const MAX_NUMBER = !isNaN(+process.env.MAX_NUMBER) ? +process.env.MAX_NUMBER : 10 //用户最大数量，防止滥用，默认100个
    if (isNotEmptyString(MONGODB_URL)) {
        try {
            const sign = req.header('Sign')
            if (isNotEmptyString(sign)) {
                getFPByfingerprint(sign).then(fp => {
                    if (fp != null) {
                        const count = fp.count;
                        if (count <= 0) {
                            res.status(200).send(JSON.stringify({
                                status: 'Unlock',
                                message: 'Error: 已超出每日10次免费次数，可购买专属域名解除限制 | 10 free times per day' ?? 'Please authenticate.',
                                data: null
                            }))
                            return
                        } else {
                            updateFP(sign)
                        }
                    } else {
                        countDocuments().then(num => {
                            if (num > MAX_NUMBER) {
                                res.status(200).send(JSON.stringify({
                                    status: 'Unlock',
                                    message: 'Error: 免费用户已达上限，可购买专属域名解除限制 | Free users have reached the limit',
                                    data: null
                                }))
                                return
                            } else {
                                insertFP(sign, COUNT)
                            }
                        })
                    }
                })
            } else {
                throw new Error('Error: 无访问权限 | No access rights')
            }
        }
        catch (error) {
            res.send({ status: 'Unauthorized', message: error.message ?? 'Please authenticate.', data: null })
        }
    }
}

export { req_limiter }