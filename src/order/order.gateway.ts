import { Logger } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, 
  OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from "ws"

@WebSocketGateway({
  cors: true,
  path : '/ws',
  transports: ['websocket'], // 指定传输协议
  // serveClient: false, // 不提供客户端文件
})
export class OrderGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer ()
  server: Server

  private clients: Set<WebSocket> = new Set();
  private clientIdMap: WeakMap<WebSocket, string> = new WeakMap();
  private readonly logger = new Logger(OrderGateway.name);

  private generateClientId(): string {
    return Math.random().toString(36).substring(2, 15);
  }
  @SubscribeMessage('events')
  onEvent(client: any, data: any):any {
    // console.log(data);
    this.broadcast({
      message: "新订单",
      code:100
    })
    // return JSON.stringify({ name: "jenvyx" });
  }
  handleConnection(client: any, ...args: any[]) {
    // 为客户端生成唯一ID
    const clientId = this.generateClientId();
    this.clientIdMap.set(client, clientId);
    this.clients.add(client);

    // 发送欢迎消息
    client.send(JSON.stringify({
      event: 'connection',
      data: {
        message: 'Successfully connected to server',
        clientId
      }
    }));
    
  }

  handleDisconnect(client: WebSocket) {
    const clientId = this.clientIdMap.get(client);
    this.clients.delete(client);
    console.log(`Client disconnected: ${clientId}`);
  }
  broadcast(message: any) {
    const messageStr = JSON.stringify(message);
    console.log(messageStr)
    this.clients.forEach(client => {
      console.log(`client.readyState: ${client.readyState}`);
      console.log(client.readyState, client.OPEN, client.readyState === client.OPEN)
      if (client.readyState === client.OPEN) {
        
        client.send(messageStr);
      }
    });
  }

  afterInit(server: any) {
     console.log('init');
  }
}
