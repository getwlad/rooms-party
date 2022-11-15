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
  const [messageList, setMessageList] = useState<messageData[]>();
  const [currentMessage, setCurrentMessage] = useState("");

  useEffect(() => {
    const handler = (data: messageData) => {
      setMessageList((current) => {
        if (!current) return [data];

        return [...current, data];
      });
    };
    socket.on("receive_message", handler);
    return () => socket.off("receive_message", handler);
  }, []);

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

    await socket.emit("send_message", messageData);
    setMessageList((current) => {
      if (!current) return [messageData];

      return [...current, messageData];
    });
    setCurrentMessage("");
  };
  return (
    <Section>
      <MessageLog>
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
      />
      <Button onClick={(e) => sendMessage()}>Enviar</Button>
    </Section>
  );
};

export default Chat;
