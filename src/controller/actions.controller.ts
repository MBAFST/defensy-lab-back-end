import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Actions } from "../entity/actions.entity";

export class ActionsController {
	static get = async (req: Request, res: Response) => {
		const actions = await getRepository(Actions).findOne({
			where: {
				id: parseInt(req.params["id2"])
			}
		});
		
		res.send({	
			"identification-measures": actions?.identificationMeasures,
			"restrain-measures": actions?.restrainMeasures,
			"evidence-collected": actions?.evidenceCollected,
			"eradication-measures": actions?.eradicationMeasures,
			"recovery-measures": actions?.recoveryMeasures,
			"other-mitigation-measures": actions?.otherMitigationMeasures
		});
	};
	
	static create = async (req: Request, res: Response) => {
		const body = req.body;

		await getRepository(Actions).save({
			id: parseInt(req.params["id2"]),
        	identificationMeasures: body["identification-measures"],
			restrainMeasures: body["restrain-measures"],
			evidenceCollected: body["evidence-collected"],
			eradicationMeasures: body["eradication-measures"],
			recoveryMeasures: body["recovery-measures"],
			otherMitigationMeasures: body["other-mitigation-measures"]
		});
		
		res.send({	
			"identification-measures": body["identification-measures"],
			"restrain-measures": body["restrain-measures"],
			"evidence-collected": body["evidence-collected"],
			"eradication-measures": body["eradication-measures"],
			"recovery-measures": body["recovery-measures"],
			"other-mitigation-measures": body["other-mitigation-measures"]
		});
	};

	static update = async (req: Request, res: Response) => {
		const body = req.body;

		await getRepository(Actions).update(parseInt(req.params["id2"]), {
        	identificationMeasures: body["identification-measures"],
			restrainMeasures: body["restrain-measures"],
			evidenceCollected: body["evidence-collected"],
			eradicationMeasures: body["eradication-measures"],
			recoveryMeasures: body["recovery-measures"],
			otherMitigationMeasures: body["other-mitigation-measures"]
		});
		
		res.send({	
			"identification-measures": body["identification-measures"],
			"restrain-measures": body["restrain-measures"],
			"evidence-collected": body["evidence-collected"],
			"eradication-measures": body["eradication-measures"],
			"recovery-measures": body["recovery-measures"],
			"other-mitigation-measures": body["other-mitigation-measures"]
		});
	}
}
