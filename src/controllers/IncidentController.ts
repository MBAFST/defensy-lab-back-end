import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Incident } from "../entity/Incident";
class IncidentController {
    static Post=async(req:Request, res:Response)=>{
        const newIncident={
            client : req.body.client,
           
        };

    const incident = getRepository(Incident).create(newIncident);
    const result = await getRepository(Incident).save(incident);
    return res.json(result);
 };
 static Get=async(req:Request, res:Response)=>{
    const result = await getRepository(Incident).find();
    return res.json(result);
 };
 static GetOne=async(req:Request, res:Response)=>{
    const id = parseInt(req.params.id);
    const incident = await getRepository(Incident).findOneById(id);
    return res.json(incident);
 };
 static Update=async(req:Request, res:Response)=>{
    const id = parseInt(req.params.id);
    const incident = await getRepository(Incident).findOneById(id);
     if(incident){
        getRepository(Incident).merge(incident,req.body);
        const result = await getRepository(Incident).save(incident);
        return res.json(result);
     }
    return res.json({msg : "Incident not found"});
 };
 static Delete=async(req:Request, res:Response)=>{
    const id = parseInt(req.params.id);
    const incident = await getRepository(Incident).delete(id);

    return res.json(incident);
 };
}
export default IncidentController;