import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Attachement } from "../entity/Attachement";
class AttachementController {
    static Post=async(req:Request, res:Response)=>{
        const newAtt={
            image1 : req.body.image1,
            image2 : req.body.image2,
            image3 : req.body.image3,
            image4 : req.body.image4,
           

        };

    const Att = getRepository(Attachement).create(newAtt);
    const result = await getRepository(Attachement).save(Att);
    return res.json(result);
 };
 static Get=async(req:Request, res:Response)=>{
    const result = await getRepository(Attachement).find();
    return res.json(result);
 };
 static GetOne=async(req:Request, res:Response)=>{
    const id = parseInt(req.params.id);
    const Att = await getRepository(Attachement).findOneById(id);
    return res.json(Att);
 };
 static Update=async(req:Request, res:Response)=>{
    const id = parseInt(req.params.id);
    const Att = await getRepository(Attachement).findOneById(id);
     if(Att){
        getRepository(Attachement).merge(Att,req.body);
        const result = await getRepository(Attachement).save(Att);
        return res.json(result);
     }
    return res.json({msg : "Attachement not found"});
 };
 
}
export default AttachementController;