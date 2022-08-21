import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Evaluation } from "../entity/Evaluation";
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
 static GetOne=async(req:Request, res:Response)=>{
    const id = parseInt(req.params.id);
    const Eval = await getRepository(Evaluation).findOneById(id);
    return res.json(Eval);
 };
 static Update=async(req:Request, res:Response)=>{
    const id = parseInt(req.params.id);
    const Eval = await getRepository(Evaluation).findOneById(id);
     if(Eval){
        getRepository(Evaluation).merge(Eval,req.body);
        const result = await getRepository(Evaluation).save(Eval);
        return res.json(result);
     }
    return res.json({msg : "Evaluation not found"});
 };
}
export default EvaluationController;