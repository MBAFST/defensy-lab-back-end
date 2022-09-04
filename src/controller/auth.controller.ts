import { Request, Response } from "express"
import { getRepository, MoreThanOrEqual } from "typeorm";
import { User } from "../entity/user.entity";
import bcryptjs from "bcryptjs";
import { sign, verify } from "jsonwebtoken";
import { Token } from "../entity/token.entity";

export const Register = async (req : Request, res: Response) => {
    const body = req.body;

    await getRepository(User).save({
        username: body["username"],
        firstName: body["first-name"],
        lastName: body["last-name"],
        email: body["email"],
        password: await bcryptjs.hash(body["password"], 12),
        contact: body["contact"],
        place: body["place"],
        isAdmin: "user",
        profilPhoto: body["profil-photo"]
    });

    res.send({
        message: "Success"
    });
}

export const Login = async (req: Request, res: Response) => {
    const userWithMail = await getRepository(User).findOne({
        where: {
            email: req.body["email"]
        }
    });

    const userWithUsername = await getRepository(User).findOne({
        where: {
            username: req.body["email"]
        }
    });

    const user = userWithMail || userWithUsername;

    if (!user) {
        return res.status(400).send({
            message: "Invalid credentials"
        });
    }

    if (!await bcryptjs.compare(req.body.password, user.password)) {
        return res.status(400).send({
            message: "Invalid credentials"
        });
    }

    const refreshToken = sign({ id: user.id }, process.env.REFRESH_TOKEN || "", { expiresIn: "1w" });

    res.cookie("refresh-token", refreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000
    });

    const issuedAt = new Date();
    const expiredAt = new Date();
    expiredAt.setDate(issuedAt.getDate() + 7);

    await getRepository(Token).save({
        userId: user.id,
        token: refreshToken,
        issuedAt: issuedAt,
        expiredAt: expiredAt
    });

    const token = sign({ id: user.id }, process.env.ACCESS_TOKEN || "", { expiresIn: "15m" });

    res.send({
        token
    });
}

export const AuthenticatedUser = async (req: Request, res: Response) => {
    try {
        const accessToken = req.header("Authorization")?.split(" ")[1] || "";

        const payload: any = verify(accessToken, process.env.ACCESS_TOKEN || "");

        if (!payload) {
            return res.status(401).send({
                message: "unauthenticated"
            });
        }

        const user = await getRepository(User).findOne({
            where: {
                id: payload["id"]
            }
        });

        if (!user) {
            return res.status(401).send({
                message: "unauthenticated"
            });
        }

        res.send({
            "id": user.id,
            "username": user.username,
            "first-name": user.firstName,
            "last-name": user.lastName,
            "contact": user.contact,
            "place": user.place,
            "is-admin": user.isAdmin
        });
    }
    catch (e) {
        return res.status(401).send({
            message: "unauthenticated"
        });
    }
}

export const Refresh = async (req: Request, res: Response) => {
    try {
        const cookie = req.cookies["refresh-token"];

        const payload: any = verify(cookie, process.env.REFRESH_TOKEN || "");

        if (!payload) {
            return res.status(401).send({
                message: "unauthenticated"        
            });
        }

        const refreshToken = await getRepository(Token).findOne({
            where: {
                userId: payload["id"],
                expiredAt: MoreThanOrEqual(new Date())
            }
        });

        if (!refreshToken) {
            return res.status(401).send({
                message: "unauthenticated"
            });
        }

        const token = sign({ id: payload["id"] }, process.env.ACCESS_TOKEN || "", { expiresIn: "1m" });

        res.send({
            message: "refreshed"
        });
    }
    catch (e) {
        return res.status(401).send({
            message: "unauthenticated"
        });
    }
}

export const Logout = async (req: Request, res: Response) => {
    await getRepository(Token).delete({
        token: req.cookies["refresh-token"]
    })

    res.cookie("refresh-token", "", { maxAge: 0 });
    
    res.send({
        message: "success"
    });
}
