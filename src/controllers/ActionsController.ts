import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Actions } from "../entity/Actions";
class ActionsController {
    static Post=async(req:Request, res:Response)=>{
        const newAction={
            identificationMeasures : req.body.identificationMeasures,
            restrainMeasures : req.body.restrainMeasures,
            evidenceCollected : req.body.evidenceCollected,
            eradicationMeasures: req.body.eradicationMeasures,
            recoveryMeasures: req.body.recoveryMeasures,
            otherMitigationMeasures :req.body.otherMitigationMeasures,

        };

    const Action = getRepository(Actions).create(newAction);
    const result = await getRepository(Actions).save(Action);
    return res.json(result);
 };
 static Get=async(req:Request, res:Response)=>{
    const result = await getRepository(Actions).find();
    return res.json(result);
 };
 static GetOne=async(req:Request, res:Response)=>{
    const id = parseInt(req.params.id);
    const Action = await getRepository(Actions).findOneById(id);
    return res.json(Action);
 };
 static Update=async(req:Request, res:Response)=>{
    const id = parseInt(req.params.id);
    const Action= await getRepository(Actions).findOneById(id);
     if(Action){
        getRepository(Actions).merge(Action,req.body);
        const result = await getRepository(Actions).save(Action);
        return res.json(result);
     }
    return res.json({msg : "Action not found"});
 };
 
}
export default ActionsController;