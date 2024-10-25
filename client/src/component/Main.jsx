import { useEffect, useState } from "react";
import client from "../api/Api";
import { useParams } from "react-router-dom";
import { Divider } from "@mui/material";
import { If, Then, Else } from "react-if"
import { Add } from "@mui/icons-material";

export default function Main() {
  const { id } = useParams();
  const [user, setUser] = useState([]);

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
    listUser();
  }, []);

  return (
    <div className="flex justify-center mt-4">
      <div className="border border-solid rounded-md p-5 w-[1000px]">
        <div>
          <div className="text-3xl font-bold">{user.name}</div>
          <div className="my-2 font-thin">{user.email}</div>
        </div>
        <Divider variant="middle" component="div" />
        <div className="flex flex-row">
          <div className="w-[50%] p-4">
            <div className="flex flex-row justify-between">
              <div className="font-semibold">Pets</div>
              <Add fontSize="small" />
            </div>
            <div>
              <If condition={user.pets}>
                <Then>
                  A
                </Then>
                <Else>
                  Você não adicionou nenhum PET até o momento.
                </Else>
              </If>
            </div>
          </div>
          <Divider
            variant="fullWidth"
            component="div"
            orientation="vertical"
            flexItem
          />
          <div className="w-[50%] p-4 font-semibold">Últimas Compras</div>
        </div>
      </div>
    </div>
  );
}
