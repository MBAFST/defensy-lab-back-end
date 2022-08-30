import { Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { getRepository } from "typeorm";
import { FollowUp } from "../entity/follow-up.entity";
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

		const followUp = await getRepository(FollowUp).findOne({
			where: {
				id: parseInt(req.params["id2"])
			}
		});

		res.send({
			"reviewer": followUp?.reviewer,
			"recommanded-actions": followUp?.recommandedActions,
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

		await getRepository(FollowUp).save({
			id: parseInt(req.params["id2"]),
			reviewer: body["reviewer"],
			recommendedActions: body["recommanded-actions"],
			rapporter: body["rapporter"],
			carredOut: body["carred-out"]
		});

		res.send({
			"reviewer": body["reviewer"],
			"recommanded-actions": body["recommanded-actions"],
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
		
		await getRepository(FollowUp).update(parseInt(req.params["id2"]), {
			reviewer: body["reviewer"],
			recommandedActions : body["recommanded-actions"],
			rapporter: body["rapporter"],
			carredOut: body["carred-out"]
		});

		res.send({
			"reviewer": body["reviewer"],
			"recommanded-actions": body["recommanded-actions"],
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
