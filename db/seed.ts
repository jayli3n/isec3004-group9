const { MongoClient } = require("mongodb")

// Connection URL
// Download and make sure db server is running: https://www.mongodb.com/try/download/community?tck=docs_server
const url = "mongodb://localhost:27017"
const DB_NAME = "myProject"
const client = new MongoClient(url)

async function main() {
    await client.connect()
    console.log("Connected successfully to db")
    const db = client.db(DB_NAME)
    // db.createCollection("users",
    //     {
    //         metaField: string,
    //         granularity: string
    //     }
    //  )
    return "done."
}

main()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close())
