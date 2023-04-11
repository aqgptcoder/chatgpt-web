import type { ObjectId } from 'mongodb'

export class FP {
    _id: ObjectId
    fingerprint: string
    per_day_count: number
    update_time: number
    constructor(fingerprint: string, per_day_count: number) {
        this.fingerprint = fingerprint
        this.per_day_count = per_day_count
        this.update_time = new Date().getTime()
      }
}