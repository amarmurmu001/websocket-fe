
import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [socket,setSocket]=useState();
  const [message, setMessage] = useState("");

  function sendMessage() {

    if(!socket){
      return;
    }
    //@ts-ignore
    socket.send(message);

    setMessage("");
  }

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");
    if(!socket){
      return;
    }
    //@ts-ignore
    setSocket(socket);
    socket.onopen = () => {
      console.log("WebSocket connection established");
    };

    socket.onmessage = (event) => {
      alert("Message from server: " + event.data);

    }
    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
    };
  }, []);


  return (
    <>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", width: "100vw", flexDirection: "column" }}>
        <input style={{ padding: "10px" }} value={message} onChange={(e)=>{setMessage(e.target.value)}} type='text' placeholder='Message...'></input>
        <button onClick={sendMessage}>Send</button>

      </div>
    </>
  )
}

export default App
