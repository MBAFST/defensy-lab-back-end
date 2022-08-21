import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Evaluation } from "../entity/evaluation.entity";

export class EvaluationController {
	static get = async (req: Request, res: Response) => {
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
	};
	
	static create = async (req: Request, res: Response) => {
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
	};

	static update = async (req: Request, res: Response) => {
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
}
