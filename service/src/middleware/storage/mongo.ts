import { MongoClient } from 'mongodb'
import { FP } from './model'

const url = process.env.MONGODB_URL

const client = new MongoClient(url)
const fpCol = client.db('chatgpt').collection('fp')


export async function insertFP(fingerprint: string, count: number) {
    const fp = new FP(fingerprint, count)
    await fpCol.insertOne(fp)
    return fp
}

export async function getFPByfingerprint(fingerprint: string) {
    return await fpCol.findOne({ fingerprint: fingerprint })
}

export async function updateFP(fingerprint: string) {
    const query = { fingerprint: fingerprint }
    const update = {
        $inc: { count: -1 }
    }
    return await fpCol.updateOne(query, update)
}

export async function resetFPCount(count: number) {
    const query = {}
    const update = {
        $set: {
            count: count
        }
    }
    return await fpCol.updateMany(query, update)
}

export async function countDocuments() {
    return await fpCol.countDocuments({})
}

export async function removeExprieFP(day) {
    const query = {
        update_time: { $lte: new Date().getTime() - day * 24 * 60 * 1000 }
    }
    return await fpCol.deleteMany(query)
}