import { Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { getRepository } from "typeorm";
import { Notification } from "../entity/notification.entity";
import { User } from "../entity/user.entity";

export const Get = async (req: Request, res: Response) => {
	try {
        const accessToken = req.header("Authorization")?.split(" ")[1] || "";

        const payload: any = verify(accessToken, process.env.ACCESS_TOKEN || "");

        if (!payload) {
            return res.status(401).send({
                message: "unauthenticated"
            });
        }

        const auth = await getRepository(User).findOne({
            where: {
                id: payload["id"]
            }
        });

        if (!auth) {
            return res.status(401).send({
                message: "unauthenticated"
            });
        }

		const notification = await getRepository(Notification).findOne({
			where: {
				id: parseInt(req.params["id2"])
			}
		});
		
		res.send({
			"notifier": notification?.notifier,
            "other": notification?.other
		});
	}
    catch (e) {
        return res.status(401).send({
            message: "unauthenticated"
        });
    }
};

export const Create = async (req: Request, res: Response) => {
	try {
        const accessToken = req.header("Authorization")?.split(" ")[1] || "";

        const payload: any = verify(accessToken, process.env.ACCESS_TOKEN || "");

        if (!payload) {
            return res.status(401).send({
                message: "unauthenticated"
            });
        }

        const auth = await getRepository(User).findOne({
            where: {
                id: payload["id"]
            }
        });

        if (!auth) {
            return res.status(401).send({
                message: "unauthenticated"
            });
        }

		const body = req.body;

		await getRepository(Notification).save({
			id: parseInt(req.params["id2"]),
			notifier: body["notifier"],
            other: body["other"]
		});
		
		res.send({
			"notifier": body["notifier"],
            "other": body["other"]
		});
	}
    catch (e) {
        return res.status(401).send({
            message: "unauthenticated"
        });
    }
};

export const Update = async (req: Request, res: Response) => {
	try {
        const accessToken = req.header("Authorization")?.split(" ")[1] || "";

        const payload: any = verify(accessToken, process.env.ACCESS_TOKEN || "");

        if (!payload) {
            return res.status(401).send({
                message: "unauthenticated"
            });
        }

        const auth = await getRepository(User).findOne({
            where: {
                id: payload["id"]
            }
        });

        if (!auth) {
            return res.status(401).send({
                message: "unauthenticated"
            });
        }

		const body = req.body;

		await getRepository(Notification).update(parseInt(req.params["id2"]), {
			notifier: body["notifier"],
            other: body["other"]
		});
		
		res.send({
			"notifier": body["notifier"],
            "other": body["other"]
		});
	}
    catch (e) {
        return res.status(401).send({
            message: "unauthenticated"
        });
    }
};
