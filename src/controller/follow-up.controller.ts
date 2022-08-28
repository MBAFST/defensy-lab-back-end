import { Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { getRepository } from "typeorm";
import { FollowUp } from "../entity/follow-up.entity";

export const Get = async (req: Request, res: Response) => {
	try {
        const accessToken = req.header("Authorization")?.split(" ")[1] || "";

        const payload: any = verify(accessToken, process.env.ACCESS_TOKEN || "");

        if (!payload) {
            return res.status(401).send({
                message: "unauthenticated"
            });
        }

		const followUp = await getRepository(FollowUp).findOne({
			where: {
				id: parseInt(req.params["id2"])
			}
		});

		res.send({
			"reviwer": followUp?.reviwer,
			"recommended-actions": followUp?.recommendedActions,
			"rapporter": followUp?.rapporter,
			"carred-out": followUp?.carredOut	
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

		await getRepository(FollowUp).save({
			id: parseInt(req.params["id2"]),
			reviwer: body["reviwer"],
			recommendedActions: body["recommended-actions"],
			rapporter: body["rapporter"],
			carredOut: body["carred-out"]
		});

		res.send({
			"reviwer": body["reviwer"],
			"recommended-actions": body["recommended-actions"],
			"rapporter": body["rapporter"],
			"carred-out": body["carred-out"]	
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
		
		await getRepository(FollowUp).update(parseInt(req.params["id2"]), {
			reviwer: body["reviwer"],
			recommendedActions : body["recommended-actions"],
			rapporter: body["rapporter"],
			carredOut: body["carred-out"]
		});

		res.send({
			"reviwer": body["reviwer"],
			"recommended-actions": body["recommended-actions"],
			"rapporter": body["rapporter"],
			"carred-out": body["carred-out"]	
		});
	}
    catch (e) {
        return res.status(401).send({
            message: "unauthenticated"
        });
    }
};
