import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Notification } from "../entity/notification.entity";

export class NotificationController {
	static get = async (req: Request, res: Response) => {
		const notification = await getRepository(Notification).findOne({
			where: {
				id: parseInt(req.params["id2"])
			}
		});
		
		res.send({
			"notifier": notification?.notifier
		});
	};
	
	static create = async (req: Request, res: Response) => {
		const body = req.body;

		await getRepository(Notification).save({
			id: parseInt(req.params["id2"]),
			notifier: body["notifier"]
		});
		
		res.send({
			"notifier": body["notifier"]
		});
	};

	static update = async (req: Request, res: Response) => {
		const body = req.body;

		await getRepository(Notification).update(parseInt(req.params["id2"]), {
			notifier: body["notifier"]
		});
		
		res.send({
			"notifier": body["notifier"]
		});
	}
}
