import { Request,Response } from "express";

export function getUsers(req: Request , res:Response){
    res.send("HELLO")
}

export function createUsers(req: Request , res:Response){
    res.send("HELLO")
}