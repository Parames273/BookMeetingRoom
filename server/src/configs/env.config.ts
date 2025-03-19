import dotenv from "dotenv";

dotenv.config()

const config = {
    port: process.env.PORT || 5050,
    mongoURI: process.env.MONGO_URI as string,
    jwtSecret: process.env.JWT_SECRET as string,
    nodeEnv: process.env.NODE_ENV,
    jwtExpire: process.env.JWT_EXPIRE as string,
}

export default config;