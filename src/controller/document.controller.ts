import { Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { getRepository } from "typeorm";
import { Actions } from "../entity/actions.entity";
import { Attachments } from "../entity/attachments.entity";
import { Client } from "../entity/client.entity";
import { Evaluation } from "../entity/evaluation.entity";
import { FollowUp } from "../entity/follow-up.entity";
import { Incident } from "../entity/incident.entity";
import { Information } from "../entity/information.entity";
import { Notification } from "../entity/notification.entity";
import { Resume } from "../entity/resume.entity";
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
        
        const documents: any[] = [];

        const incident = await getRepository(Incident).findOne({
            where: {
				id: parseInt(req.params["id"])
			}
        });

        const document: any = {};
        document["id"] = incident?.id;
            
        const action = await getRepository(Actions).findOne({
            where: {
                id: incident?.id
            }
        });

        document["identification-measures"] = action?.identificationMeasures;
        document["restraint-measures"] = action?.restraintMeasures;
        document["evidence-collected"] = action?.evidenceCollected;
        document["eradication-measures"] = action?.eradicationMeasures;
        document["recovery-measure"] = action?.recoveryMeasure;
        document["other-mitigation-measures"] = action?.otherMitigationMeasures;

        const attachement = await getRepository(Attachments).findOne({
            where: {
                id: incident?.id
            }
        });

        document["image-1"] = attachement?.image1;
        document["image-2"] = attachement?.image2;
        document["image-3"] = attachement?.image3;
        document["image-4"] = attachement?.image4;
        document["image-5"] = attachement?.image5;

        const user = await getRepository(User).findOne({
            where: {
                id: incident?.userId
            }
        });
        document["first-name"] = user?.firstName;
        document["last-name"] = user?.lastName;

        const client = await getRepository(Client).findOne({
            where: {
                id: incident?.userId
            }
        });
        document["contact"] = client?.contact;
        document["place"] = client?.place;

        const evaluation = await getRepository(Evaluation).findOne({
            where: {
                id: incident?.id
            }
        });
        document["members-reaction"] = evaluation?.membersReaction;
        document["documenting-procedures"] = evaluation?.documentingProcedures;
        document["needed-information"] = evaluation?.neededInformation;
        document["actions-could-prevented-recovery"] = evaluation?.actionsCouldPreventedRecovery;
        document["members-must-do"] = evaluation?.membersMustDo;
        document["correct-actions"] = evaluation?.correctActions;
        document["additional-resources-needed"] = evaluation?.additionalResourcesNeeded;
        document["other-recommandations"] = evaluation?.otherRecommandations;
        
        const followUp = await getRepository(FollowUp).findOne({
            where: {
                id: incident?.id
            }
        });
        document["reviewer"] = followUp?.reviewer;
        document["recommanded-actions"] = followUp?.recommandedActions;
        document["rapporter"] = followUp?.rapporter;
        document["carred-out"] = followUp?.carredOut;
        
        const information = await getRepository(Information).findOne({
            where: {
                id: incident?.id
            }
        });
        document["date-of-notification"] = information?.dateOfNotification;
        document["tier"] = information?.tier;
        document["date-of-detection"] = information?.dateOfDetection;
        document["type-of-software"] = information?.typeOfSoftware;
        
        const notification = await getRepository(Notification).findOne({
            where: {
                id: incident?.id
            }
        });
        document["notifier"] = notification?.notifier;
        document["other"] = notification?.other;
        
        const resume = await getRepository(Resume).findOne({
            where: {
                id: incident?.id
            }
        });
        document["detection-type"] = resume?.detectionType;
        document["description"] = resume?.description;
        document["members"] = resume?.members;

        documents.push(document);

		res.send({
            document
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

		const incident = await getRepository(Incident).save({
			userId: parseInt(req.params["id"]),
		});

		const body = req.body;

		await getRepository(Actions).save({
			id: incident.id,
			identificationMeasures: body["identification-measures"],
			restraintMeasures: body["restraint-measures"],
			evidenceCollected: body["evidence-collected"],
			eradicationMeasures: body["eradication-measures"],
			recoveryMeasure: body["recovery-measure"],
			otherMitigationMeasures: body["other-mitigation-measures"]
		});

		await getRepository(Attachments).save({
			id: incident.id,
			image1: body["image-1"],
			image2: body["image-2"],
			image3: body["image-3"],
			image4: body["image-4"],
			image5: body["image-5"]
		});

		await getRepository(Evaluation).save({
			id: incident.id,
			membersReaction: body["members-reaction"],
			documentingProcedures: body["documenting-procedures"],
			neededInformation: body["needed-information"],
			actionsCouldPreventedRecovery: body["actions-could-prevented-recovery"],
			membersMustDo: body["members-must-do"],
			correctActions: body["correct-actions"],
			additionalResourcesNeeded: body["additional-resources-needed"],
			otherRecommandations: body["other-recommandations"]
		});

		await getRepository(FollowUp).save({
			id: incident.id,
			reviewer: body["reviewer"],
			recommandedActions: body["recommanded-actions"],
			rapporter: body["rapporter"],
			carredOut: body["carred-out"]
		});

		await getRepository(Information).save({
			id: incident.id,
			dateOfNotification: body["date-of-notification"],
			tier: body["tier"],
			dateOfDetection: body["date-of-detection"],
			typeOfSoftware: body["type-of-software"]
		});

		await getRepository(Notification).save({
			id: incident.id,
			notifier: body["notifier"],
            other: body["other"]
		});

		await getRepository(Resume).save({
			id: incident.id,
			detectionType: body["detection-type"],
			description: body["description"],
			members: body["members"]
		});

		res.send({
            message: incident.id
        });
	}
    catch (e) {
        return res.status(401).send({
            message: "unauthenticated"
        });
    }
};
