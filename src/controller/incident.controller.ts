import { Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { getRepository } from "typeorm";
import { Actions } from "../entity/actions.entity";
import { Attachement } from "../entity/attachement.entity";
import { Evaluation } from "../entity/evaluation.entity";
import { FollowUp } from "../entity/follow-up.entity";
import { Incident } from "../entity/incident.entity";
import { Information } from "../entity/information.entity";
import { Notification } from "../entity/notification.entity";
import { Resume } from "../entity/resume.entity";

export const Get = async (req: Request, res: Response) => {
	try {
        const accessToken = req.header("Authorization")?.split(" ")[1] || "";

        const payload: any = verify(accessToken, process.env.ACCESS_TOKEN || "");

        if (!payload) {
            return res.status(401).send({
                message: "unauthenticated"
            });
        }

		const information = await getRepository(Incident).findOne({
			where: {
				id: parseInt(req.params["id2"])
			}
		});

		res.send(information);
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

		const body = req.body;

		const information = await getRepository(Incident).save({
			userId: parseInt(body["user-id"]),
		});
		
		res.send(information);
	}
    catch (e) {
        return res.status(401).send({
            message: "unauthenticated"
        });
    }
};

export const Delete = async(req:Request, res:Response)=>{
	try {
        const accessToken = req.header("Authorization")?.split(" ")[1] || "";

        const payload: any = verify(accessToken, process.env.ACCESS_TOKEN || "");

        if (!payload) {
            return res.status(401).send({
                message: "unauthenticated"
            });
        }

		await getRepository(Actions).delete({ id: parseInt(req.params["id2"]) });
		await getRepository(Attachement).delete({ id: parseInt(req.params["id2"]) });
		await getRepository(Evaluation).delete({ id: parseInt(req.params["id2"]) });
		await getRepository(FollowUp).delete({ id: parseInt(req.params["id2"]) });
		await getRepository(Information).delete({ id: parseInt(req.params["id2"]) });
		await getRepository(Notification).delete({ id: parseInt(req.params["id2"]) });
		await getRepository(Resume).delete({ id: parseInt(req.params["id2"]) });
		
		await getRepository(Incident).delete({
			id: parseInt(req.params["id2"])
		});

		res.send({
			message: "success"
		});
	}
    catch (e) {
        return res.status(401).send({
            message: "unauthenticated"
        });
    }
};
