import React, { useEffect, useState } from "react";
import {
  Section,
  MessageLog,
  ListLogs,
  MessageItem,
  Hour,
  Name,
  Message,
  TextArea,
  Button,
} from "./style";
interface messageData {
  room: string;
  username: string;
  message: string;
  time: string;
}
const Chat = ({ socket, room, username }: any) => {
  //Lista de mensagens enviadas
  const [messageList, setMessageList] = useState<messageData[]>();
  //Mensagem do usuário
  const [currentMessage, setCurrentMessage] = useState("");

  //Atualiza a lista de mensagens
  useEffect(() => {
    const handler = (data: messageData) => {
      setMessageList((current) => {
        if (!current) return [data];

        return [...current, data];
      });
    };
    //Sempre que uma nova mensagem é recebida a lista é atualizada
    socket.on("receive_message", handler);
    return () => socket.off("receive_message", handler);
  }, []);

  //Sempre que uma alteração é feita na lista de mensagens o scroll da área do chat abaixa até o final
  useEffect(() => {
    const messageLogEl = document.getElementById("messageLog");
    if (messageLogEl) {
      messageLogEl.scrollTop += 999;
    }
  }, [messageList]);

  //Função de envio de mensagem
  const sendMessage = async () => {
    if (currentMessage === "") {
      return;
    }
    const messageData: messageData = {
      room,
      username,
      message: currentMessage,
      time:
        new Date(Date.now()).getHours() +
        ":" +
        new Date(Date.now()).getMinutes(),
    };
    //Envio de mensagem
    await socket.emit("send_message", messageData);

    //Atualização da lista de mensagens para o usuário atual
    setMessageList((current) => {
      if (!current) return [messageData];

      return [...current, messageData];
    });
    setCurrentMessage("");
  };
  return (
    <Section>
      <MessageLog id="messageLog">
        <ListLogs>
          {messageList?.map((messageContent) => {
            return (
              <MessageItem>
                <Name>{messageContent.username}</Name>
                <Message>{messageContent.message}</Message>
                <Hour>{messageContent.time}</Hour>
              </MessageItem>
            );
          })}
        </ListLogs>
      </MessageLog>

      <TextArea
        placeholder="Digite sua mensagem"
        onChange={(e) => setCurrentMessage(e.target.value)}
        value={currentMessage}
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            sendMessage();
          } else if (e.key === "Escape") {
            setCurrentMessage("");
          }
        }}
      />
      <Button onClick={(e) => sendMessage()}>Enviar</Button>
    </Section>
  );
};

export default Chat;
