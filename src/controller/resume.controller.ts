import { Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { getRepository } from "typeorm";
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
    catch (e) {
        return res.status(401).send({
            message: "unauthenticated"
        });
    }
};
