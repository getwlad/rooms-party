import React, { useEffect, useRef, useState } from "react";

import {
  H1,
  Input,
  Button,
  Content,
  Div,
  Section,
  Main,
  VideoDiv,
  ButtonSync,
  AreaButton,
} from "./style";
import Plyr from "plyr-react";
import "plyr-react/plyr.css";
import { toast } from "react-toastify";
import Chat from "./Chat";
import RoomDetails from "./RoomDetails";

const RoomPage = ({ socket, username, room, userData, roomVideoId }: any) => {
  // const [player, setPlayer] = useState(new Plyr("#player"));
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

  useEffect(() => {
    const handler = (data: any) => {
      if (ref.current) {
        const player: HTMLVideoElement = ref.current["plyr"];
        player.currentTime = data;
        if (player.paused) {
          player.play();
          player.muted = false;
        }
      }
    };
    socket.on("updateVideoTime", handler);
    return () => socket.off("updateVideoTime", handler);
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

  const ref = useRef(null);

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
          <VideoDiv>
            {videoId ? (
              <>
                <Plyr
                  height={"100%"}
                  width={"100%"}
                  ref={ref}
                  source={{
                    type: "video",
                    sources: [
                      {
                        src: videoId!,
                        provider: "youtube",
                      },
                    ],
                  }}
                />
                <AreaButton>
                  <ButtonSync
                    onClick={(e) => {
                      if (ref.current) {
                        const player: HTMLVideoElement = ref.current["plyr"];
                        if (player.paused) {
                          player.play();
                        }
                        const data = { room, time: player.currentTime };
                        socket.emit("played_video", data);
                      }
                    }}
                  >
                    Sincronizar todos com meu video
                  </ButtonSync>
                </AreaButton>
              </>
            ) : (
              <></>
            )}
          </VideoDiv>

          <Chat socket={socket} room={room} username={username} />
        </Content>
        <RoomDetails room={room} userData={userData} socket={socket} />
      </Main>
    </Section>
  );
};

export default RoomPage;
