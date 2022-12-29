import { User } from "../../database/Models/User";
import jwt from "jsonwebtoken";
import { config } from "../../config/config";

export default class UserService {
    public async userRegister(name: string, username: string, password: string) {
        try {
            let exist = await User.findOne({
                username
            });
            if (exist) {
                return {
                    result: null,
                    error: "Username already taken"
                }
            }
            const user = new User({
                name,
                username,
                password
            });
            await user.save();
            const token = jwt.sign({ username }, config.jwt.secret, {
                expiresIn: config.jwt.expireseIn
            });
            return {
                result: token,
                error: null
            }
        } catch (error: any) {
            return {
                result: null,
                error: error.message
            }
        }
    }
}