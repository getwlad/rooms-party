import React, { useEffect, useState } from "react";

import {
  H1,
  Input,
  Button,
  Content,
  Div,
  Section,
  Main,
  Iframe,
} from "./style";
import { toast } from "react-toastify";
import Chat from "./Chat";
import RoomDetails from "./RoomDetails";

const RoomPage = ({ socket, username, room, userData, roomVideoId }: any) => {
  //Url do video a ser carregado
  const [url, setUrl] = useState("");

  //Id do video carregada da url
  const [videoId, setVideoId] = useState<string | null>(roomVideoId);

  //Capturando evento de quando algum usuário inserir algum video, este também seja renderizado na janela atual.
  useEffect(() => {
    const handler = (data: any) => {
      setVideoId(data);
    };
    socket.on("receive_videoid", handler);
    return () => socket.off("receive_videoid", handler);
  }, []);

  //Função pra obter a id do video pela url
  const getId = (url: string) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return match && match[2].length === 11 ? match[2] : null;
  };

  //Função para definir o video a ser executado
  const setVideo = async (url: string) => {
    if (url === "") {
      toast.error("Preencha o campo com a URL");
      return;
    }
    const id: string | null = getId(url);
    if (!id) {
      toast.error("URL inválida");
      return;
    }
    setVideoId(id);
    const data = { room, id };
    //Emite o evento para salvar e notificar os usuários que o video foi definido
    await socket.emit("set_video", data);
  };

  return (
    <Section>
      <Div>
        <H1>Url do video: </H1>
        <Input
          type={"text"}
          placeholder="Cole aqui a URL do video"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              setVideo(url);
            } else if (e.key === "Escape") {
              setUrl("");
            }
          }}
        />
        <Button onClick={(e) => setVideo(url)}>Carregar</Button>
      </Div>

      <Main>
        <Content>
          {videoId ? (
            <Iframe
              id="video"
              width="70%"
              height="100%"
              src={`https://www.youtube.com/embed/${videoId}?&autoplay=1`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              frameBorder="0"
            ></Iframe>
          ) : (
            <></>
          )}
          <Chat socket={socket} room={room} username={username} />
        </Content>
        <RoomDetails room={room} userData={userData} socket={socket} />
      </Main>
    </Section>
  );
};

export default RoomPage;
