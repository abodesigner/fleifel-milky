import { Request, Response, NextFunction } from "express";
import Error from "../inerfaces/error.interface";
const errorMiddleware = (error: Error, req: Request, res:Response, next: NextFunction) => {

    const status = error.status || 500;
    const message = error.message || "someting went error";
    res.status(status).json({ status, message })
}


export default errorMiddleware;