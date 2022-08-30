import { Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { getRepository } from "typeorm";
import { Attachments } from "../entity/attachments.entity";
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

		const attachement = await getRepository(Attachments).findOne({
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

		await getRepository(Attachments).save({
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

		await getRepository(Attachments).update(parseInt(req.params["id2"]), {
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
    catch (e) {
        return res.status(401).send({
            message: "unauthenticated"
        });
    }
};
