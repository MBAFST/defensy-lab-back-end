import { Request, Response } from "express";
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
	const information = await getRepository(Incident).findOne({
		where: {
			id: parseInt(req.params["id2"])
		}
	});

	res.send(information);
};

export const Create = async (req: Request, res: Response) => {
	const body = req.body;

	const information = await getRepository(Incident).save({
		userId: parseInt(body["user-id"]),
	});
	
	res.send(information);
};

export const Delete = async(req:Request, res:Response)=>{
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
};
