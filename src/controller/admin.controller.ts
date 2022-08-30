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
                if (incident.userId === user.id)
                    documents.push({
                        "id": incident.id,
                        "first-name": user?.firstName,
                        "last-name": user?.lastName
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
