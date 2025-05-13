import { 
  WebSocketGateway as NestWebSocketGateway, 
  WebSocketServer, 
  OnGatewayConnection, 
  OnGatewayDisconnect, 
  SubscribeMessage 
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@NestWebSocketGateway({ 
  cors: {
    origin: "http://localhost:3000", // Укажите ваш клиентский URL
    methods: ["GET", "POST"],
    credentials: true
  }
})
export class AppWebSocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('buttonClick')
  handleButtonClick(client: Socket, payload: number) {
    console.log(`Button ${payload} clicked by client ${client.id}`);
    
    // Отправляем обновление всем клиентам
    this.server.emit('squareUpdate', { 
      index: payload
    });
  }
}