import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Client } from "../entity/client.entity";
import { Incident } from "../entity/incident.entity";
import { User } from "../entity/user.entity";

export const Get = async (req: Request, res: Response) => {
	const user = await getRepository(User).findOne({
		where: {
			id: parseInt(req.params["id"])
		}
	});

	const client = await getRepository(Client).findOne({
		where: {
			id: parseInt(req.params["id"])
		}
	});

	res.send({
		"first-name": user?.firstName,
		"last-name": user?.lastName,
		"contact": client?.contact,
		"place": client?.place,
		"profil-photo": client?.profilPhoto
	});
};

export const Create = async (req: Request, res: Response) => {
	const body = req.body;
	
	const user = await getRepository(User).findOne({
		where: {
			id: parseInt(req.params["id"])
		}
	});

	await getRepository(Client).save({
		id: parseInt(req.params["id"]),
		contact: body["contact"],
		place: body["place"],
		profilPhoto: body["profil-photo"]
	});
	
	res.send({
		"first-name": user?.firstName,
		"last-name": user?.lastName,
		"contact": body["contact"],
		"place": body["place"],
		"profil-photo": body["profil-photo"]
	});
};

export const Update = async (req: Request, res: Response) => {
	const body = req.body;

	const user = await getRepository(User).findOne({
		where: {
			id: parseInt(req.params["id"])
		}
	});

	await getRepository(Client).update(parseInt(req.params["id2"]), {
		contact: body["contact"],
		place: body["place"],
		profilPhoto: body["profil-photo"]
	});
	
	res.send({
		"first-name": user?.firstName,
		"last-name": user?.lastName,
		"contact": body["contact"],
		"place": body["place"],
		"profil-photo": body["profil-photo"]
	});
}

export const Delete = async (req: Request, res: Response) => {
	await getRepository(Incident).delete({
		userId: parseInt(req.params["id"])
	});

	await getRepository(Client).delete({
		id: parseInt(req.params["id"])
	});

	res.send({
		message: "success"
	});
}
