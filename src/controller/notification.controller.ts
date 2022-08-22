import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Notification } from "../entity/notification.entity";

export const Get = async (req: Request, res: Response) => {
	const notification = await getRepository(Notification).findOne({
		where: {
			id: parseInt(req.params["id2"])
		}
	});
	
	res.send({
		"notifier": notification?.notifier
	});
};

export const Create = async (req: Request, res: Response) => {
	const body = req.body;

	await getRepository(Notification).save({
		id: parseInt(req.params["id2"]),
		notifier: body["notifier"]
	});
	
	res.send({
		"notifier": body["notifier"]
	});
};

export const Update = async (req: Request, res: Response) => {
	const body = req.body;

	await getRepository(Notification).update(parseInt(req.params["id2"]), {
		notifier: body["notifier"]
	});
	
	res.send({
		"notifier": body["notifier"]
	});
}
