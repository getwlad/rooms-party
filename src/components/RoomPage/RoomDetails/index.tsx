import React, { useEffect, useState } from "react";
import { ListUsers, Section, UserItem } from "./style";
const RoomDetails = ({ socket, room, userData }: any) => {
  //Lista de usuários ativos na sala
  const [users, setUsers] = useState<string[]>(userData);

  //Função pra renderizar usuários na sala a cada atualização
  useEffect(() => {
    const handler = (data: any) => {
      setUsers(data);
    };
    //Evento para quando houver alguma atualização na lista, a lista será atualizada
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
