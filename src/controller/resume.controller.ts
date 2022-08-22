import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Resume } from "../entity/resume.entity";

export const Get = async (req: Request, res: Response) => {
	const resume = await getRepository(Resume).findOne({
		where: {
			id: parseInt(req.params["id2"])
		}
	});
	
	res.send({
		"detection-type": resume?.detectionType,
		"description": resume?.description,
		"members": resume?.members
	});
};

export const Create = async (req: Request, res: Response) => {
	const body = req.body;

	await getRepository(Resume).save({
		id: parseInt(req.params["id2"]),
		detectionType: body["detection-type"],
		description: body["description"],
		members: body["members"]
	});
	
	res.send({
		"detection-type": body["detection-type"],
		"description": body["description"],
		"members": body["members"]
	});
};

export const Update = async (req: Request, res: Response) => {
	const body = req.body;

	await getRepository(Resume).update(parseInt(req.params["id2"]), {
		detectionType: body["detection-type"],
		description: body["description"],
		members: body["members"]
	});
	
	res.send({
		"detection-type": body["detection-type"],
		"description": body["description"],
		"members": body["members"]
	});
}
