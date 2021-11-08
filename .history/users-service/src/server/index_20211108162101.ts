import express, {NextFunction, Request, Response} from 'express';

import accessEnv from "#root/helpers/accessEnv"
import cors from 'cors';
import setupRoutes from './routes';

const PORT = parseInt(accessEnv('PORT', "7101"), 10);

const startServer = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors({
    origin: (origin, cb) => { cb(null, true) },
    credentials:true
  }));

  setupRoutes(app)

  app.use((err:Error, req:Request, res:Response,next:NextFunction) => {
    return res.status(500).json({ message: err.message });
  });
  app.listen(PORT,"0.0.0.0",() => {
    console.log(`User Server started on port ${PORT}`);
  });
};

export default startServer;
