import React, { useState } from "react";
import api from "../../services/api.service";
import RoomPage from "../RoomPage";
import { Section, Button, Input, Content } from "./style";
//Usado para notificações
import { toast } from "react-toastify";
//Client socket
import * as io from "socket.io-client";

//Url de conexão  com o socket, caso a url abaixo não funcione, você pode usar esta api e roda-la localmente: https://github.com/getwlad/api-rooms-party
const socket = io.connect("https://api-rooms-party-production.up.railway.app/");

const MainPage = (props: React.PropsWithChildren) => {
  //Nome do usuário que vai efetuar a conexão
  const [user, setUser] = useState("");

  //Array de usuários que vão ser renderizados na RoomPage
  const [userData, setUserData] = useState([]);

  //Sala que o usuário vai entrar
  const [room, setRoom] = useState("");

  //Id do video a ser renderizado caso alguém já tenha o inserido dentro da sala a ser feita conexão
  const [roomVideoId, setRoomVideoId] = useState("");

  //Variavel pra ver se o usuário já está logado
  const [logged, setLogged] = useState(false);

  //Verifica se a tecla pressionada é o enter
  const checkKeys = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      entrarNumaSala();
    }
  };

  //Função pra entrar na sala
  const entrarNumaSala = async () => {
    if (user === "") {
      toast.error("Preencha um nome de usuário");
      return;
    } else if (room === "") {
      toast.error("Digite o nome de uma sala");
      return;
    }
    //Emitindo a comunicação do usuário com a sala.
    socket.emit("join_room", { user, room });

    //Obtendo lista de usuários pra ser renderizada na RoomPage
    await api.get(`/users/${room}`).then((response) => {
      setUserData(response.data);
    });
    //Obtendo id do vídeo se já inserido
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
              value={user}
              onChange={(e) => setUser(e.target.value)}
              onKeyUp={(e) => {
                checkKeys(e);
                if (e.key === "Escape") {
                  setUser("");
                }
              }}
            />
          </Content>
          <Content>
            <h1>Entrar em uma sala</h1>
            <Input
              type="text"
              placeholder="Digite o nome da sala"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              onKeyUp={(e) => {
                checkKeys(e);
                if (e.key === "Escape") {
                  setUser("");
                }
              }}
            />
            <Button onClick={(e) => entrarNumaSala()}>Entrar</Button>
          </Content>
        </Section>
      )}
    </>
  );
};

export default MainPage;
