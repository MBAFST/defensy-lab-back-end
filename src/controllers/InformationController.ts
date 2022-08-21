import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Information} from "../entity/Information";
class InformationController {
    static Post=async(req:Request, res:Response)=>{
        const newInf={
            dateOfNotification: req.body.dateOfNotification,
            tier : req.body.tier,
            dateOfDetection : req.body. dateOfDetection,
            typeOfSoftware: req.body.typeOfSoftware,
         };

    const info= getRepository(Information).create(newInf);
    const result = await getRepository(Information).save(info);
    return res.json(result);
 };
 static Get=async(req:Request, res:Response)=>{
    const result = await getRepository(Information).find();
    return res.json(result);
 };
 static GetOne=async(req:Request, res:Response)=>{
    const id = parseInt(req.params.id);
    const info = await getRepository(Information).findOneById(id);
    return res.json(info);
 };
 static Update=async(req:Request, res:Response)=>{
    const id = parseInt(req.params.id);
    const info= await getRepository(Information).findOneById(id);
     if(info){
        getRepository(Information).merge(info,req.body);
        const result = await getRepository(Information).save(info);
        return res.json(result);
     }
    return res.json({msg : "Information not found"});
 };
 
}
export default InformationController;