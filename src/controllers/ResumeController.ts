import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Resume} from "../entity/Resume";
class ResumeController {
    static Post=async(req:Request, res:Response)=>{
        const newRes={
            detectionType: req.body.detectionType,
            description : req.body.description,
            members : req.body. members,
            
         };

    const resume= getRepository(Resume).create(newRes);
    const result = await getRepository(Resume).save(resume);
    return res.json(result);
 };
 static Get=async(req:Request, res:Response)=>{
    const result = await getRepository(Resume).find();
    return res.json(result);
 };
 static GetOne=async(req:Request, res:Response)=>{
    const id = parseInt(req.params.id);
    const resume = await getRepository(Resume).findOneById(id);
    return res.json(resume);
 };
 static Update=async(req:Request, res:Response)=>{
    const id = parseInt(req.params.id);
    const resume= await getRepository(Resume).findOneById(id);
     if(resume){
        getRepository(Resume).merge(resume,req.body);
        const result = await getRepository(Resume).save(resume);
        return res.json(result);
     }
    return res.json({msg : "Resume not found"});
 };
 
}
export default ResumeController;