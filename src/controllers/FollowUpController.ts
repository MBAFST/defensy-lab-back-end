import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { FollowUp} from "../entity/FollowUp";
class FollowUpController {
    static Post=async(req:Request, res:Response)=>{
        const newFollow={
         reviwer: req.body.reviwer,
         recommendedActions : req.body.recommendedActions,
         rapporter : req.body. rapporter,
         carredOut: req.body.carredOut,
            
        };

    const follow= getRepository(FollowUp).create(newFollow);
    const result = await getRepository(FollowUp).save(follow);
    return res.json(result);
 };
 static Get=async(req:Request, res:Response)=>{
    const result = await getRepository(FollowUp).find();
    return res.json(result);
 };
 static GetOne=async(req:Request, res:Response)=>{
    const id = parseInt(req.params.id);
    const follow = await getRepository(FollowUp).findOneById(id);
    return res.json(follow);
 };
 static Update=async(req:Request, res:Response)=>{
    const id = parseInt(req.params.id);
    const fllow= await getRepository(FollowUp).findOneById(id);
     if(fllow){
        getRepository(FollowUp).merge(fllow,req.body);
        const result = await getRepository(FollowUp).save(fllow);
        return res.json(result);
     }
    return res.json({msg : "FollowUp not found"});
 };
 
}
export default FollowUpController;