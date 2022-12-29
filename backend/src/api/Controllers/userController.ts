import { NextFunction, Request, Response } from "express";
import UserService from "../Services/userService";

export default class UserController {

    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    public userRegister = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let { name, username, password } = req.body;
            let { result, error } = await this.userService.userRegister(name, username, password);
            if (result) {
                let dataToSend = {
                    data: result,
                    status: "SUCCESS",
                    message: "USER REGISTERED SUCCESSFULLY"
                }
                return res.status(200).json(dataToSend);
            }
            if (error) {
                let dataToSend = {
                    data: null,
                    status: "ERROR",
                    message: error
                }
                return res.status(500).json(dataToSend);
            }
        } catch (error: any) {
            console.log(error);
            let dataToSend = {
                data: null,
                status: "ERROR",
                message: error.message
            }
            return res.status(500).json(dataToSend);
        }
    }

    public userProfile = async (req: any, res: Response, next: NextFunction) => {
        try {
            return res.status(200).send(req.user);
        } catch (error) {
            let dataToSend = {
                data: null,
                status: "ERROR",
                message: error
            }
            return res.status(500).json(dataToSend);
        }
    }
}