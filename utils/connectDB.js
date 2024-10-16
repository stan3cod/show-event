import mongoose from "mongoose";
require('dotenv').config()

async function ConnectDB() {
    // console.log(process.env)
    try {
        const dblink = process.env.CONNECTIONSTRING
        await mongoose.connect(dblink)
        console.log('Database Connected')
    } catch (error) {
        console.error(error)
    }
}
export default ConnectDB

