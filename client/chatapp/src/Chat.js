import React, { useState, useEffect } from 'react';

export default function Chat({ socket, username, room }) {
  const [currMessage, setCurrMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMsg = async () => {
    if (currMessage !== "") {
      const msgData = {
        room: room,
        author: username,
        message: currMessage,
        time: `${new Date(Date.now()).getHours()}:${new Date(Date.now()).getMinutes()}`,
      };

      await socket.emit("send_message", msgData);
      setCurrMessage(""); 
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]); 
    });

    return () => {
      socket.off("receive_message"); 
    };
  }, [socket]);

  return (
    <div>
      <div className="chat-header">Chat Room: {room}</div>
      <div className="chat-body">
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.author}</strong>: {msg.message} <em>({msg.time})</em>
          </div>
        ))}
      </div>
      <div className="chat-footer">
        <input
          type="text"
          placeholder="Send a Message"
          value={currMessage}
          onChange={(event) => setCurrMessage(event.target.value)}
        />
        <button onClick={sendMsg}>Send</button>
      </div>
    </div>
  );
}
