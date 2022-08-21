import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Client } from "../entity/Client";
class ClientController {
    static Post=async(req:Request, res:Response)=>{
        const newClient={
            firstName : req.body. firstName,
            lastName : req.body.lastName,
            email :req.body.email,
            username  : req.body.username,
            password : req.body.password,
            contact  : req.body.contact,
            place  : req.body.place,
            profilePhoto : req.body.profilePhoto,
            incidents : req.body.incidents,    
        };

    const client = getRepository(Client).create(newClient);
    const result = await getRepository(Client).save(client);
    return res.json(result);
 };
 static Get=async(req:Request, res:Response)=>{
    const result = await getRepository(Client).find();
    return res.json(result);
 };
 static GetOne=async(req:Request, res:Response)=>{
    const id = parseInt(req.params.id);
    const client = await getRepository(Client).findOneById(id);
    return res.json(client);
 };
 static Update=async(req:Request, res:Response)=>{
    const id = parseInt(req.params.id);
    const client = await getRepository(Client).findOneById(id);
     if(client){
        getRepository(Client).merge(client,req.body);
        const result = await getRepository(Client).save(client);
        return res.json(result);
     }
    return res.json({msg : "Client not found"});
 };
 static Delete=async(req:Request, res:Response)=>{
    const id = parseInt(req.params.id);
    const client = await getRepository(Client).delete(id);

    return res.json(client);
 };
}
export default ClientController;