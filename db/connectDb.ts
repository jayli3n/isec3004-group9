const { MongoClient } = require("mongodb")

// Connection URL
// Download and make sure db server is running: https://www.mongodb.com/try/download/community?tck=docs_server
const url = "mongodb://localhost:27017"
const DB_NAME = "myProject"
const client = new MongoClient(url)

export const connectDb = async () => {
    await client.connect()
    console.log("Connected successfully to db")
    return client.db(DB_NAME)
}
