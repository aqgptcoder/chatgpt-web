import { resetFPCount, removeExprieFP } from '../middleware/storage/mongo'

// 重置指纹对应的次数
const schedule_reset_count = function () {
    const PER_DAY_COUNT = !isNaN(+process.env.PER_DAY_COUNT) ? +process.env.PER_DAY_COUNT : 10 //默认10次
    resetFPCount(PER_DAY_COUNT)
}

// 定时删除过期数据
const schedule_remove_exprie = function () {
    const EXPRIE_DAY = !isNaN(+process.env.EXPRIE_DAY) ? +process.env.EXPRIE_DAY : 1 //默认1天
    removeExprieFP(EXPRIE_DAY)
}

export { schedule_reset_count, schedule_remove_exprie }