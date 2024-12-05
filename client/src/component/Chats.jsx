import { useEffect, useState, useContext } from "react";
import client from "../api/Api";
import {
  Divider,
  Grid2,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Chats() {
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState([]);
  const { id } = useContext(AuthContext);

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

  const listWaiting = async () => {
    try {
      const res = await client.get(`/chat/waiting`);
      if (res.data) {
        setMessages(res.data.messages);
      } else {
        setMessages([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    listWaiting();
    listUser();
  }, []);

  return (
    <div className="flex justify-center mt-4">
      <div className="border border-solid rounded-md shadow-md p-5 w-[1000px]">
        <div className="text-2xl mb-2 w-full flex justify-center">
          Chats Disponíveis
        </div>
        <Divider variant="middle" component="div" />
        <div className="my-2"></div>
        <Grid2 container rowSpacing={1} columnSpacing={1}>
          {messages.map((message) => (
            <Grid2 key={message.id} size={3}>
              {message.vet == false ? (
                <div className="border border-black rounded-sm p-2 cursor-pointer bg-blue-300 hover:bg-[#273469] hover:text-white">
                  <NavLink 
                    to={`/chat/${message.room}`}
                    state={{ vet: user, message }}
                  >
                    <div>
                      {message.username}
                    </div>
                  </NavLink>
                </div>
              ) : (
                <div className="border p-2 cursor-pointer rounded-sm hover:bg-[#273469] hover:text-white">
                  <NavLink 
                    to={`/chat/${message.room}`}
                    state={{ vet: user, message }}
                  >
                    <div>
                      {message.username}
                    </div>
                  </NavLink>
                </div>
              )}
            </Grid2>
          ))}
        </Grid2>
      </div>
    </div>
  )
}