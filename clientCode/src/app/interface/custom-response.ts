import { Server } from "./server"

export interface CustomResponse{
    timeStam            :        Date;
    statusCode          :        string;
    status              :        string;
    reason              :        string;
    message             :        string;
    developerMessage    :        string;
    data                :        data;
}

export interface data{
    Server?            :         Server[];
    server?             :         Server;
}