// peerProxy.js
import { WebSocketServer } from 'ws';

let socketServer; // store globally so we can broadcast later

export function peerProxy(httpServer) {
  socketServer = new WebSocketServer({ server: httpServer });

  socketServer.on('connection', (socket) => {
    socket.isAlive = true;

    // Forward messages to everyone except the sender
    socket.on('message', (data) => {
      socketServer.clients.forEach((client) => {
        if (client !== socket && client.readyState === WebSocket.OPEN) {
          client.send(data);
        }
      });
    });

    // Respond to pong messages by marking the connection alive
    socket.on('pong', () => {
      socket.isAlive = true;
    });
  });

  // Periodically ping clients to check if they are alive
  const interval = setInterval(() => {
    socketServer.clients.forEach((client) => {
      if (!client.isAlive) return client.terminate();

      client.isAlive = false;
      client.ping();
    });
  }, 10000);

  // Clean up interval if the server closes
  socketServer.on('close', () => clearInterval(interval));
}

// --- Helper function to broadcast messages to all connected clients ---
export function broadcastMessage(msg) {
  if (!socketServer) return;
  socketServer.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(msg);
    }
  });
}
