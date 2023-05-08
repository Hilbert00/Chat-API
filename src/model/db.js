const { MongoClient } = require("mongodb");

let singleton;

async function connect() {
    if (singleton) return singleton;

    const client = new MongoClient(process.env.DB_HOST);
    await client.connect();

    singleton = client.db(process.env.DB_DATABASE);
    return singleton;
}

async function findAll(collection) {
    const db = await connect();

    return db.collection(collection).find().toArray();
}

async function findOne(collection, filter) {
    const db = await connect();

    return db.collection(collection).findOne(filter);
}

async function insertOne(collection, object) {
    const db = await connect();

    return db.collection(collection).insertOne(object);
}

async function updateOne(collection, filter, data) {
    const db = await connect();

    return db.collection(collection).updateOne(filter, data);
}

module.exports = { findAll, findOne, insertOne, updateOne };
