import { Request, Response } from "express"
import { getRepository } from "typeorm";
import { User } from "../entity/user.entity";
import bcryptjs from "bcryptjs";

export const Register = async (req : Request, res: Response) => {
    const body = req.body;

    if (body["password"] !== body["password-confirm"]) {
        return res.status(400).send({
            message: "Password's do not matches!"
        });
    }

    const user = await getRepository(User).save({
        username: body["username"],
        firstName: body["first-name"],
        lastName: body["last-name"],
        email: body["email"],
        password: await bcryptjs.hash(body["password"], 12),
        isAdmin: "user"
    });

    res.send({
        "id": user.id,
        "username": user.username,
        "first-name": user.firstName,
        "last-name": user.lastName,
        "email": user.email,
        "password": user.password,
        "is-admin": user.isAdmin    
    });
}
