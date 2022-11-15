import React, { useState } from "react";
import api from "../../services/api.service";
import RoomPage from "../RoomPage";
import { Section, Button, Input, Content } from "./style";
import { toast } from "react-toastify";
import * as io from "socket.io-client";
const socket = io.connect("https://room-api-party.herokuapp.com/");

const MainPage = (props: React.PropsWithChildren) => {
  const [user, setUser] = useState("");
  const [userData, setUserData] = useState([]);

  const [room, setRoom] = useState("");
  const [roomVideoId, setRoomVideoId] = useState("");
  const [logged, setLogged] = useState(false);

  const entrarNumaSala = async () => {
    if (user === "") {
      toast.error("Preencha um nome de usuário");
      return;
    } else if (room === "") {
      toast.error("Digite o nome de uma sala");
      return;
    }

    socket.emit("join_room", { user, room });
    await api.get(`/users/${room}`).then((response) => {
      setUserData(response.data);
    });
    await api.get(`/video/${room}`).then((response) => {
      setRoomVideoId(response.data.id);
    });
    setLogged(true);
  };
  return (
    <>
      {logged ? (
        <RoomPage
          socket={socket}
          userData={userData}
          username={user}
          room={room}
          roomVideoId={roomVideoId}
        />
      ) : (
        <Section>
          <Content>
            <h1>Usuário</h1>
            <Input
              type="text"
              placeholder="Digite seu nome"
              onChange={(e) => setUser(e.target.value)}
            />
          </Content>
          <Content>
            <h1>Entrar em uma sala</h1>
            <Input
              type="text"
              placeholder="Digite o nome da sala"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
            />
            <Button onClick={(e) => entrarNumaSala()}>Entrar</Button>
          </Content>
        </Section>
      )}
    </>
  );
};

export default MainPage;
