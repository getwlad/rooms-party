import styled from "styled-components";

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  height: 800px;
  margin: 5px 5px;
  width: calc(100vw - 80%);
  @media screen and (max-width: 728px) {
    width: 90%;
    height: 70%;
  }
`;

export const MessageLog = styled.div`
  background-color: #fafafa;
  border-radius: 5px;
  width: 100%;
  height: 50%;
  overflow: scroll;
`;

export const ListLogs = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  list-style: none;
`;

export const MessageItem = styled.li`
  height: 100%;
  width: 90%;
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  border-radius: 5px;
  margin: 5px;
  padding: 4px;
`;

export const Hour = styled.span`
  align-self: flex-end;
`;

export const Name = styled.span`
  font-weight: bold;
  font-size: 1.1rem;
`;

export const Message = styled.span`
  font-size: 1rem;
`;

export const TextArea = styled.textarea`
  width: 100%;
  height: 50px;
  font-size: 1.1rem;
  margin-top: 5px;
  padding: 5px;
  border: none;
`;

export const Button = styled.button`
  margin-top: 5px;
  cursor: pointer;
`;