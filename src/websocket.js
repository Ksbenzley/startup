let ws;

export function connectWebSocket(onMessageCallback) {
  const wsUrl =
    import.meta.env.MODE === 'development'
      ? 'ws://localhost:5173/ws' // Vite proxy forwards this
      : 'wss://startup.jammix.click/ws'; // Production URL

  ws = new WebSocket(wsUrl);

  ws.onopen = () => console.log('✅ Connected to WebSocket');

  ws.onmessage = (event) => {
    console.log('📩 WebSocket message:', event.data);
    if (onMessageCallback) onMessageCallback(event.data);
  };

  ws.onclose = () => console.log('⚠️ WebSocket disconnected');
  ws.onerror = (err) => console.error('WebSocket error:', err);

  return ws;
}

export function sendMessage(msg) {
  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.send(msg);
  }
}
