import express, { Application } from 'express';
import cors from 'cors';
import UserRouter from './api/Routers/userRouter';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { config } from './config/config';

export default class App {
    private app: Application;
    private port: Number;

    constructor(port: Number = 4000) {
        this.app = express();
        this.app.use(cors({
            origin: ["http://localhost:3000"]
        }));
        this.app.use(bodyParser.json());
        this.port = port;
        this.registerRoutes();
        this.connectDatabase();
    }

    public getPort() {
        return this.port;
    }

    public getApp() {
        return this.app;
    }

    private registerRoutes() {
        const userRouter = new UserRouter();
        this.app.use('/api/v1/', userRouter.getRouter());
    }

    private async connectDatabase() {
        try {
            mongoose.set("strictQuery", false);
            await mongoose.connect(config.database.url);
            console.log("DB connected");
        } catch (error) {
            console.log(error);
        }
    }

}