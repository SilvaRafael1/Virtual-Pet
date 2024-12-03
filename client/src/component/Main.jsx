import { useEffect, useState } from "react";
import client from "../api/Api";
import { useParams } from "react-router-dom";
import { Divider } from "@mui/material";
import Pets from "./Pet";
import Sales from "./Sales";

export default function Main() {
  const { id } = useParams();
  const [user, setUser] = useState([]);
  const [pets, setPets] = useState([]);

  const listUser = async () => {
    try {
      const res = await client.get(`/user/${id}`);
      if (res.data) {
        setUser(res.data.user);
        setPets(res.data.user.pets);
      } else {
        setUser([]);
        setPets([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    listUser();
  }, []);

  return (
    <div className="flex justify-center mt-4">
      <div className="border border-solid rounded-md shadow-md p-5 w-[1000px]">
        <div>
          <div className="text-3xl font-bold">{user.name}</div>
          <div className="my-2 font-thin">E-mail: {user.email}</div>
          <div className="my-2 font-thin">Endereço: {user.address}</div>
        </div>
        <div>
          <Divider variant="middle" component="div" />
        </div>
        <div className="flex flex-row">
          <Pets userid={user.id} pets={pets} />
          <Divider
            variant="fullWidth"
            component="div"
            orientation="vertical"
            flexItem
          />
          <Sales userid={id} />
        </div>
      </div>
    </div>
  );
}
