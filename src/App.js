import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

// Connect to the WebSocket server
const socket = io('http://localhost:3001');

function App() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  
  // เมื่อมีข้อความใหม่จาก server
  useEffect(() => {
    socket.on('chat message', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    // Clean up the socket listener when component unmounts
    return () => {
      socket.off('chat message');
    };
  }, []);

  // ส่งข้อความไปยัง server
  const sendMessage = () => {
    if (message.trim()) {
      socket.emit('chat message', message);
      setMessage('');
    }
  };

  return (
    <div className="App">
      <div>
        <h2>Real-Time Chat Application</h2>
        <div>
          {messages.map((msg, index) => (
            <p key={index}>{msg}</p>
          ))}
        </div>
      </div>

      <div>
        <input 
          type="text" 
          value={message} 
          onChange={(e) => setMessage(e.target.value)} 
          placeholder="Type a message..." 
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;
