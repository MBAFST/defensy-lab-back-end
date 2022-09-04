import { Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { getRepository } from "typeorm";
import { Actions } from "../entity/actions.entity";
import { Attachments } from "../entity/attachments.entity";
import { Evaluation } from "../entity/evaluation.entity";
import { FollowUp } from "../entity/follow-up.entity";
import { Incident } from "../entity/incident.entity";
import { Information } from "../entity/information.entity";
import { Notification } from "../entity/notification.entity";
import { Resume } from "../entity/resume.entity";
import { User } from "../entity/user.entity";

export const GetAll = async (req: Request, res: Response) => {
	try {
        const accessToken = req.header("Authorization")?.split(" ")[1] || "";

        const payload: any = verify(accessToken, process.env.ACCESS_TOKEN || "");

        if (!payload) {
            return res.status(401).send({
                message: "unauthenticated"
            });
        }
        
        const admin = await getRepository(User).findOne({
            where: {
                id: payload["id"]
            }
        });

        if (!admin || admin.isAdmin !== "admin") {
            return res.status(401).send({
                message: "unauthenticated"
            });
        }

        const documents: any[] = [];

        const incidents = await getRepository(Incident).find();
        const users = await getRepository(User).find();

        for (let incident of incidents) {
            for (let user of users) {
                if (incident.userId === user?.id)
                    documents.push({
                    	"id": incident.id,
                    	"username": user.username,
                    	"first-name": user.firstName,
                    	"last-name": user.lastName,
                    });
            }
        }

		res.send({
            documents
        });
	}
    catch (e) {
        return res.status(401).send({
            message: "unauthenticated"
        });
    }
};

export const Get = async (req: Request, res: Response) => {
	try {
        const accessToken = req.header("Authorization")?.split(" ")[1] || "";

        const payload: any = verify(accessToken, process.env.ACCESS_TOKEN || "");

        if (!payload) {
            return res.status(401).send({
                message: "unauthenticated"
            });
        }

        const admin = await getRepository(User).findOne({
            where: {
                id: payload["id"]
            }
        });

        if (!admin || admin.isAdmin !== "admin") {
            return res.status(401).send({
                message: "unauthenticated"
            });
        }
        
        const incident = await getRepository(Incident).findOne({
            where: {
				id: parseInt(req.params["id"])
			}
        });

            
        const action = await getRepository(Actions).findOne({
            where: {
                id: incident?.id
            }
        });

        
        const attachement = await getRepository(Attachments).findOne({
            where: {
                id: incident?.id
            }
        });

        
        const user = await getRepository(User).findOne({
            where: {
                id: incident?.userId
            }
        });

        const evaluation = await getRepository(Evaluation).findOne({
            where: {
                id: incident?.id
            }
        });
        
        const followUp = await getRepository(FollowUp).findOne({
            where: {
                id: incident?.id
            }
        });
        
        const information = await getRepository(Information).findOne({
            where: {
                id: incident?.id
            }
        });
        
        const notification = await getRepository(Notification).findOne({
            where: {
                id: incident?.id
            }
        });
        
        const resume = await getRepository(Resume).findOne({
            where: {
                id: incident?.id
            }
        });

		res.send({
            "id": incident?.id,
            "identification-measures": action?.identificationMeasures,
            "restraint-measures": action?.restraintMeasures,
            "evidence-collected": action?.evidenceCollected,
            "eradication-measures": action?.eradicationMeasures,
            "recovery-measure": action?.recoveryMeasure,
            "other-mitigation-measures": action?.otherMitigationMeasures,
            "image-1": attachement?.image1,
            "image-2": attachement?.image2,
            "image-3": attachement?.image3,
            "image-4": attachement?.image4,
            "image-5": attachement?.image5,
            "first-name": user?.firstName,
            "last-name": user?.lastName,
            "contact": user?.contact,
            "place": user?.place,
            "members-reaction": evaluation?.membersReaction,
            "documenting-procedures": evaluation?.documentingProcedures,
            "needed-information": evaluation?.neededInformation,
            "actions-could-prevented-recovery": evaluation?.actionsCouldPreventedRecovery,
            "members-must-do": evaluation?.membersMustDo,
            "correct-actions": evaluation?.correctActions,
            "additional-resources-needed": evaluation?.additionalResourcesNeeded,
            "other-recommandations": evaluation?.otherRecommandations,
            "reviewer": followUp?.reviewer,
            "recommanded-actions": followUp?.recommandedActions,
            "rapporter": followUp?.rapporter,
            "carred-out": followUp?.carredOut,
            "date-of-notification": information?.dateOfNotification,
            "tier": information?.tier,
            "date-of-detection": information?.dateOfDetection,
            "type-of-software": information?.typeOfSoftware,
            "notifier": notification?.notifier,
            "other": notification?.other,
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

export const Delete = async(req:Request, res:Response)=>{
	try {
        const accessToken = req.header("Authorization")?.split(" ")[1] || "";

        const payload: any = verify(accessToken, process.env.ACCESS_TOKEN || "");

        if (!payload) {
            return res.status(401).send({
                message: "unauthenticated"
            });
        }

        const admin = await getRepository(User).findOne({
            where: {
                id: payload["id"]
            }
        });

        if (!admin || admin.isAdmin !== "admin") {
            return res.status(401).send({
                message: "unauthenticated"
            });
        }

		await getRepository(Actions).delete({ id: parseInt(req.params["id"]) });
		await getRepository(Attachments).delete({ id: parseInt(req.params["id"]) });
		await getRepository(Evaluation).delete({ id: parseInt(req.params["id"]) });
		await getRepository(FollowUp).delete({ id: parseInt(req.params["id"]) });
		await getRepository(Information).delete({ id: parseInt(req.params["id"]) });
		await getRepository(Notification).delete({ id: parseInt(req.params["id"]) });
		await getRepository(Resume).delete({ id: parseInt(req.params["id"]) });
		
		await getRepository(Incident).delete({ id: parseInt(req.params["id"]) });

		res.send({
			message: "success"
		});
	}
    catch (e) {
        return res.status(401).send({
            message: "unauthenticated"
        });
    }
};
