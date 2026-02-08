import { Injectable } from '@nestjs/common';
import { ConnectedClients } from '../../dist/messages-ws/interfaces/connected-clients.interface';
import { Socket } from "socket.io";



@Injectable()
export class MessagesWsService {

    private connectedClients:ConnectedClients = {}

    registerClient(client:Socket){
        this.connectedClients[client.id] = client
    }

    removeClient(clientId:string){
        delete this.connectedClients[clientId]
    }

}
