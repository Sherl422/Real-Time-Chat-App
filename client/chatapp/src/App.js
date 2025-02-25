import './App.css';
import io from "socket.io-client";
import { useState } from "react";
import Chat from './Chat';

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setusername] = useState("");
  const [room, setroom] = useState("");

  const joinroom = () =>{
    if(username !== "" && room !== ""){
      socket.emit("join_room", room);
    }
  }
  return (
    <>
    <div className="">
      <h3>Join a Chat</h3>
      <input type="text" placeholder="Join" onChange={(event) => {
        setusername(event.target.value);
      }} />
      <input type="text" placeholder="Password" onChange={(event) => {
        setroom(event.target.value);
      }}/>
      <button onClick = {joinroom}>Join the Meeting</button>
    </div>

    <Chat socket = {socket} username = {username} room = {room}/>
  </>

    )
  }
export default App;
