import express, { NextFunction, Request, Response, Router } from 'express';
import { applyCheckAuth } from '../../middleware/checkAuth';
import UserController from '../Controllers/userController';

export default class UserRouter {
    private router: Router;
    private userController: UserController;

    constructor() {
        this.router = express.Router();
        this.userController = new UserController();
        this.createRoutes();
    }

    public getRouter() {
        return this.router;
    }

    public createRoutes() {
        this.router.post('/user-register', this.userController.userRegister);
        //Protected Router
        this.router.get('/user-profile', applyCheckAuth, this.userController.userProfile);
    }
}