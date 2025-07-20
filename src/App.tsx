import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("Disconnected");

  function sendMessage() {
    if (!socket || message.trim() === "") {
      return;
    }
    
    socket.send(message);
    setMessage("");
  }

  function handleKeyPress(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      sendMessage();
    }
  }

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    
    setSocket(ws);
    setStatus("Connecting...");

    ws.onopen = () => {
      console.log("WebSocket connection established");
      setStatus("Connected");
    };

    ws.onmessage = (event) => {
      alert("Message from server: " + event.data);
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
      setStatus("Connection Error");
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
      setStatus("Disconnected");
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div className="app-container">
      <div className="chat-container">
        <h1>WebSocket Chat</h1>
        <p>Send "ping" to get pong..</p>
        <div className={`status ${status.toLowerCase().replace(/\s+/g, '-')}`}>
          Status: {status}
        </div>
        
        <div className="input-group">
          <input
          style={{padding: "10px",  boxSizing: "border-box"}}
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            disabled={status !== "Connected"}
          />
          <button 
            onClick={sendMessage}
            disabled={!socket || status !== "Connected" || message.trim() === ""}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;