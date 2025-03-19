import express from "express";
import cors from "cors";
import envConfig from "./configs/env.config";
import connectDB from "./configs/database.config";
import router from "./routes/routes";
import logger from "./utils/logger";
import morgan, {StreamOptions} from "morgan";

const morganFormat = ":method :url :status :response-time ms";
const stream: StreamOptions = {
    write: (message: string) => {
      const [method, url, status, responseTime] = message.trim().split(" ");
      const logObject = {
        method,
        url,
        status,
        responseTime,
      };
      logger.info(JSON.stringify(logObject));
    },
};

//Database connection
connectDB();
//Config
const app = express();
const { port } = envConfig;

//middleware
app.use(express.json());

//cors
app.use(cors({
    origin : "http://localhost:3000",
    credentials : true
  }))
  app.use(morgan(morganFormat, { stream }));
//response Interceptor
app.use('/api/v1', router)

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});