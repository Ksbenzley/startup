import { WebSocketServer } from 'ws';

let socketServer;

export function peerProxy(httpServer) {
  socketServer = new WebSocketServer({ server: httpServer });

  socketServer.on('connection', (socket) => {
    socket.isAlive = true;

    // Forward messages to all other clients
    socket.on('message', (data) => {
      socketServer.clients.forEach((client) => {
        if (client !== socket && client.readyState === WebSocket.OPEN) {
          client.send(data);
        }
      });
    });

    // Respond to pong to keep connection alive
    socket.on('pong', () => {
      socket.isAlive = true;
    });
  });

  // Periodic heartbeat to terminate dead sockets
  setInterval(() => {
    socketServer.clients.forEach((client) => {
      if (client.isAlive === false) return client.terminate();
      client.isAlive = false;
      client.ping();
    });
  }, 10000);
}

export function broadcastMessage(msg) {
  if (!socketServer) return;
  socketServer.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) client.send(msg);
  });
}
