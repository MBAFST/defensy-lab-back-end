import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Attachement } from "../entity/attachement.entity";

export class AttachementController {
	static get = async (req: Request, res: Response) => {
		const attachement = await getRepository(Attachement).findOne({
			where: {
				id: parseInt(req.params["id2"])
			}
		});
		
		res.send({
			"image-1": attachement?.image1,
			"image-2": attachement?.image2,
			"image-3": attachement?.image3,
			"image-4": attachement?.image4,
			"image-5": attachement?.image5
		});
	};
	
	static create = async (req: Request, res: Response) => {
		const body = req.body;

		await getRepository(Attachement).save({
			id: parseInt(req.params["id2"]),
			image1: body["image-1"],
			image2: body["image-2"],
			image3: body["image-3"],
			image4: body["image-4"],
			image5: body["image-5"]
		});
		
		res.send({
			"image-1": body["image-1"],
			"image-2": body["image-2"],
			"image-3": body["image-3"],
			"image-4": body["image-4"],
			"image-5": body["image-5"]
		});
	};

	static update = async (req: Request, res: Response) => {
		const body = req.body;

		await getRepository(Attachement).update(parseInt(req.params["id2"]), {
			image1: body["image-1"],
			image2: body["image-2"],
			image3: body["image-3"],
			image4: body["image-4"],
			image5: body["image-5"]
		});
		
		res.send({
			"image-1": body["image-1"],
			"image-2": body["image-2"],
			"image-3": body["image-3"],
			"image-4": body["image-4"],
			"image-5": body["image-5"]
		});
	}
}
