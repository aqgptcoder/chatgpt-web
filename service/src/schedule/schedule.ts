import { resetFPCount, removeExprieFP } from '../middleware/storage/mongo'

// 重置指纹对应的次数
const schedule_reset_count = function () {
    const COUNT = !isNaN(+process.env.COUNT) ? +process.env.COUNT : 10 //默认10次
    resetFPCount(COUNT)
}

// 定时删除过期数据
const schedule_remove_exprie = function () {
    const EXPRIE_TIME = !isNaN(+process.env.EXPRIE_TIME) ? +process.env.EXPRIE_TIME : 1 //默认1天
    removeExprieFP(EXPRIE_TIME)
}

export { schedule_reset_count, schedule_remove_exprie }