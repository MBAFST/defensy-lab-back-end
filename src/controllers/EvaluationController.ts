import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Evaluation } from "../models/Evaluation";
class EvaluationController {
    static Post=async(req:Request, res:Response)=>{
        const newEval={
            memberReaction : req.body.memberReaction,
            documentingProcedures : req.body.documentingProcedures,
            actionsCouldPreventedReco : req.body.actionsCouldPreventedReco,
            membersMustDo : req.body.membersMustDo,
            correctActions : req.body.correctActions,
            additionalResourcesNeeded : req.body.additionalResourcesNeeded,
            otherRecommandationsreq : req.body.otherRecommandationsreq,
  


        };

    const Eval = getRepository(Evaluation).create(newEval);
    const result = await getRepository(Evaluation).save(Eval);
    return res.json(result);
 };
 static Get=async(req:Request, res:Response)=>{
    const result = await getRepository(Evaluation).find();
    return res.json(result);
 };
}
export default EvaluationController;