import mongoose from "mongoose"
import config from "./env.config";
import { DB_NAME } from "../constants";

const connectDB = async() => {
    try{
        const conn = await mongoose.connect(config.mongoURI,{
            dbName: DB_NAME
        })
        console.log(`MongoDB connected: ${conn.connection.host}`);
    }catch(error){
        console.error(`MongoDB connection has failed: ${error}`);
        process.exit(1);
    }
}

export default connectDB;