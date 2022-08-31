import { Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { getRepository } from "typeorm";
import { Incident } from "../entity/incident.entity";
import { User } from "../entity/user.entity";

export const GetAll = async (req: Request, res: Response) => {
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

        const documents: any[] = [];

        const user = await getRepository(User).findOne({
            where: {
                id: payload["id"]
            }
        });

        const incidents = await getRepository(Incident).find();

        for (let incident of incidents) {
            if (incident.userId === user?.id)
                documents.push({
                    "id": incident.id,
                    "first-name": user.firstName,
                    "last-name": user.lastName,
                    "email": user.email,
                    "username": user.username,
                    "is-admin": user.isAdmin
                });
        }

		res.send({
            documents
        });
	}
    catch (e) {
        return res.status(401).send({
            message: "unauthenticated"
        });
    }
};

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

		const incident = await getRepository(Incident).findOne({
			where: {
				id: parseInt(req.params["id2"])
			}
		});

		res.send(incident);
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

		const incident = await getRepository(Incident).save({
			userId: parseInt(req.params["id"]),
		});
		
		res.send({
            "id": incident.id,
            "user-id": incident.userId
        });
	}
    catch (e) {
        return res.status(401).send({
            message: "unauthenticated"
        });
    }
};
