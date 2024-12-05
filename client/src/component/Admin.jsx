import { useEffect, useState } from "react";
import client from "../api/Api";
import {
  Divider,
  Grid2,
} from "@mui/material";

export default function Admin() {
  const [users, setUsers] = useState([]);

  const listUsers = async () => {
    try {
      const res = await client.get(`/user/`);
      if (res.data) {
        setUsers(res.data.users);
      } else {
        setUsers([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    listUsers();
  }, []);

  return (
    <div className="flex justify-center mt-4">
      <div className="border border-solid rounded-md shadow-md p-5 w-[1000px]">
        <div className="text-2xl mb-2 w-full flex justify-center">
          User para Veterinário
        </div>
        <Divider variant="middle" component="div" />
        <div className="my-2"></div>

        <Grid2 container rowSpacing={1} columnSpacing={1}>
          {users.map((user) => (
            <Grid2 key={user.id} size={3}>
              <div className="border p-2 cursor-pointer hover:bg-[#273469] hover:text-white" onClick={() => {
                client.post(`/user/vet/${user.id}`)
                location.reload()
              }}>
              <div>
                {user.name}
              </div>
              <div className="text-xs">
                {user.address}
              </div>
              </div>
            </Grid2>
          ))}
        </Grid2>
      </div>
    </div>
  )
}