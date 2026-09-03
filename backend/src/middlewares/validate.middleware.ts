import { Request, Response, NextFunction } from "express";
import { ZodType } from "zod";

export const validate = ( schema: ZodType, target: "body" | "params" ) => { 
    return (req: Request, res: Response, next: NextFunction) => { 
        req[target] = schema.parse(req[target]); next(); 
    }; 
};