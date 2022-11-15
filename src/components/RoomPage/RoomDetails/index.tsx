import React, { useEffect, useState } from "react";
import { ListUsers, Section, UserItem } from "./style";
const RoomDetails = ({ socket, room, userData }: any) => {
  const [users, setUsers] = useState<string[]>(userData);
  useEffect(() => {
    const handler = (data: any) => {
      setUsers(data);
    };
    socket.on("updateUserList", handler);
    return () => socket.off("updateUserList", handler);
  }, []);
  return (
    <Section>
      <h1>Sala: {room}</h1>
      <h1>Usuários</h1>
      <ListUsers>
        {users?.map((user: any) => {
          return <UserItem>{user}</UserItem>;
        })}
      </ListUsers>
    </Section>
  );
};

export default RoomDetails;
