import { Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { getRepository } from "typeorm";
import { Information } from "../entity/information.entity";

export const Get = async (req: Request, res: Response) => {
	try {
        const accessToken = req.header("Authorization")?.split(" ")[1] || "";

        const payload: any = verify(accessToken, process.env.ACCESS_TOKEN || "");

        if (!payload) {
            return res.status(401).send({
                message: "unauthenticated"
            });
        }

		const information = await getRepository(Information).findOne({
			where: {
				id: parseInt(req.params["id2"])
			}
		});

		res.send({
			"date-of-notification": information?.dateOfNotification,
			"tier": information?.tier,
			"date-of-detection": information?.dateOfDetection,
			"type-of-software": information?.typeOfSoftware
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

		const body = req.body;

		await getRepository(Information).save({
			id: parseInt(req.params["id2"]),
			dateOfNotification: body["date-of-notification"],
			tier: body["tier"],
			dateOfDetection: body["date-of-detection"],
			typeOfSoftware: body["type-of-software"]
		});
		
		res.send({
			"date-of-notification": body["date-of-notification"],
			"tier": body["tier"],
			"date-of-detection": body["date-of-detection"],
			"type-of-software": body["type-of-software"]
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

		const body = req.body;

		await getRepository(Information).update(parseInt(req.params["id2"]), {
			dateOfNotification: body["date-of-notification"],
			tier: body["tier"],
			dateOfDetection: body["date-of-detection"],
			typeOfSoftware: body["type-of-software"]
		});
		
		res.send({
			"date-of-notification": body["date-of-notification"],
			"tier": body["tier"],
			"date-of-detection": body["date-of-detection"],
			"type-of-software": body["type-of-software"]
		});
	}
    catch (e) {
        return res.status(401).send({
            message: "unauthenticated"
        });
    }
};
