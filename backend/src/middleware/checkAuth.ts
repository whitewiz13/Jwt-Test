import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config/config";
import { User } from "../database/Models/User";

interface JwtPayload {
    username: string
}

function extractToken(req: Request) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query.token) {
        return req.query.token;
    }
    return null;
}

export const applyCheckAuth = async (req: any, res: Response, next: NextFunction) => {
    let token = extractToken(req);
    let decoded;
    if (!token) {
        return res.status(400).send("Unauthorized");
    }
    try {
        decoded = jwt.verify(token.toString(), config.jwt.secret) as JwtPayload;
    } catch (error) {
        return res.status(400).send("Unauthorized");
    }
    const { username } = decoded;
    let user = await User.findOne({
        username
    });
    if (!user) {
        return res.status(400).send("unauthorized / user not found");
    }
    req.user = user;
    next();
}