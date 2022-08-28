import { Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { getRepository } from "typeorm";
import { Evaluation } from "../entity/evaluation.entity";

export const Get = async (req: Request, res: Response) => {
	try {
        const accessToken = req.header("Authorization")?.split(" ")[1] || "";

        const payload: any = verify(accessToken, process.env.ACCESS_TOKEN || "");

        if (!payload) {
            return res.status(401).send({
                message: "unauthenticated"
            });
        }

		const evaluation = await getRepository(Evaluation).findOne({
			where: {
				id: parseInt(req.params["id2"])
			}
		});
		
		res.send({
			"member-reaction": evaluation?.memberReaction,
			"documenting-procedures": evaluation?.documentingProcedures,
			"actions-could-prevented-recovery": evaluation?.actionsCouldPreventedRecovery,
			"members-must-do": evaluation?.membersMustDo,
			"correct-actions": evaluation?.correctActions,
			"additional-resources-needed": evaluation?.additionalResourcesNeeded,
			"other-recommandations": evaluation?.otherRecommandations
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

		await getRepository(Evaluation).save({
			id: parseInt(req.params["id2"]),
			memberReaction: body["member-reaction"],
			documentingProcedures: body["documenting-procedures"],
			actionsCouldPreventedRecovery: body["actions-could-prevented-recovery"],
			membersMustDo: body["members-must-do"],
			correctActions: body["correct-actions"],
			additionalResourcesNeeded: body["additional-resources-needed"],
			otherRecommandations: body["other-recommandations"]
		});
		
		res.send({
			"member-reaction": body["member-reaction"],
			"documenting-procedures": body["documenting-procedures"],
			"actions-could-prevented-recovery": body["actions-could-prevented-recovery"],
			"members-must-do": body["members-must-do"],
			"correct-actions": body["correct-actions"],
			"additional-resources-needed": body["additional-resources-needed"],
			"other-recommandations": body["other-recommandations"]
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

		await getRepository(Evaluation).update(parseInt(req.params["id2"]), {
			memberReaction: body["member-reaction"],
			documentingProcedures: body["documenting-procedures"],
			actionsCouldPreventedRecovery: body["actions-could-prevented-recovery"],
			membersMustDo: body["members-must-do"],
			correctActions: body["correct-actions"],
			additionalResourcesNeeded: body["additional-resources-needed"],
			otherRecommandations: body["other-recommandations"]
		});
		
		res.send({
			"member-reaction": body["member-reaction"],
			"documenting-procedures": body["documenting-procedures"],
			"actions-could-prevented-recovery": body["actions-could-prevented-recovery"],
			"members-must-do": body["members-must-do"],
			"correct-actions": body["correct-actions"],
			"additional-resources-needed": body["additional-resources-needed"],
			"other-recommandations": body["other-recommandations"]
		});
	}
    catch (e) {
        return res.status(401).send({
            message: "unauthenticated"
        });
    }
};
