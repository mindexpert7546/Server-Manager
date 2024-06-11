import { Server } from "./server"

export interface CustomResponse{
    timeStam: Date;
    statusCode: string;
    status: string;
    reason: string;
    message: string;
    developerMessage: string;
    data: {
        servers?: Server[], server?:Server;
    }
}