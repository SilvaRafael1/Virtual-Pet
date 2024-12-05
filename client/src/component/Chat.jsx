import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import client from "../api/Api";
import ChatMessages from "./ChatMessages";
import ChatSendMessage from "./ChatSendMessages";
import { useLocation } from "react-router-dom";

export default function Chat({ socket }) {
  const { id } = useParams();
  const [user, setUser] = useState([]);
  const location = useLocation();
  const message = location.state?.message || [];
  const vet = location.state?.vet || [];

  const listUser = async () => {
    try {
      const res = await client.get(`/user/${id}`);
      if (res.data) {
        setUser(res.data.user);
      } else {
        setUser([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (vet.length != 0) {
      const newObj = {
        id: message.room,
        name: `${vet.name} - Veterinário(a)`
      }
      setUser(newObj);
      return
    }
    listUser();
  }, []);
  
  const joinRoom = () => {
    const username = user.name;
    const room = user.id;
    console.log(user);
    socket.emit('join_room', { username, room });
    if (vet.length != 0) {
      socket.emit('join_vet', { room });
    }
  };

  useEffect(() => {
    joinRoom();
  }, [user]);

  return (
    <div className="flex justify-center mt-4">
      <div className="border border-solid rounded-md shadow-md p-5 w-[600px]">
        <ChatMessages socket={socket} />
        <ChatSendMessage socket={socket} username={user.name} room={user.id} />
      </div>
    </div>
  )
}