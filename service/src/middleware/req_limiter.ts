import { isNotEmptyString, isEmptyString } from '../utils/is'
import { getFPByfingerprint, insertFP, updateFP, countDocuments } from '../middleware/storage/mongo'

const req_limiter = async (req, res, next) => {
    const MONGODB_URL = process.env.MONGODB_URL
    const PER_DAY_COUNT = !isNaN(+process.env.PER_DAY_COUNT) ? +process.env.PER_DAY_COUNT : 10 //每日使用上限，默认10次
    const USER_MAX_NUMBER = !isNaN(+process.env.USER_MAX_NUMBER) ? +process.env.USER_MAX_NUMBER : 100 //用户最大数量，防止滥用，默认100个
    const sign = req.header('Sign')
    if (isEmptyString(MONGODB_URL)) {
        next()
    }
    // sign为空
    if (isEmptyString(sign)) {
        countDocuments().then(num => {
            if (num > USER_MAX_NUMBER) {
                let msg = 'Error: 免费用户已达上限，可购买专属域名解除限制 | Free users have reached the limit'
                res.status(200).send({ status: 'Error', message: msg ?? 'Please authenticate.', data: null })
                res.end()
                return
            }
            insertFP(sign, PER_DAY_COUNT)
            next()
        })
    }
    // sign不为空
    if (isNotEmptyString(sign)) {
        getFPByfingerprint(sign).then(fp => {
            if (fp == null || fp.per_count <= 0) {
                let msg = 'Error: 已超出每日' + PER_DAY_COUNT + '次免费次数，可购买专属域名解除限制 | ' + PER_DAY_COUNT + ' free times per day'
                res.status(200).send({ status: 'Error', message: msg ?? 'Please authenticate.', data: null })
                res.end()
                return
            }
            updateFP(sign)
            next()
        })
    }
}

export { req_limiter }