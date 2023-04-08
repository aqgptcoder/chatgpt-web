import type { ObjectId } from 'mongodb'

export class FP {
    _id: ObjectId
    fingerprint: string
    count: number
    update_time: number
    constructor(fingerprint: string, count: number) {
        this.fingerprint = fingerprint
        this.count = count
        this.update_time = new Date().getTime()
      }
}