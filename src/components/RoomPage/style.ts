import styled from "styled-components";

export const Section = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

export const H1 = styled.h2`
  color: #fff;
  width: 200px;
  margin: 5px;
  @media screen and (max-width: 728px) {
    display: none;
  }
`;

export const Button = styled.button`
  width: 150px;
  height: 40px;
  cursor: pointer;
  margin: 2px;
  color: #fff;
  background-color: #006644;
  &:hover {
    background-color: #006044;
  }
`;

export const Input = styled.input`
  width: 60%;
  height: 40px;
  font-size: 1rem;
  margin: 2px;
  padding: 5px;
  outline: none;

  &:focus {
    outline: 1.5px solid #36b67e;
  }
  @media screen and (max-width: 728px) {
    width: 80%;
  }
`;

export const Content = styled.div`
  width: 100%;
  height: 900px;
  display: flex;
  justify-content: center;
  @media screen and (max-width: 728px) {
    flex-direction: column;
    align-items: center;
    height: 900px;
  }
`;

export const Div = styled.div`
  height: 180px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Main = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const VideoDiv = styled.div`
  width: 70%;
  height: 92%;
  background-color: #bdbdbd;
  border-radius: 5px;
  margin-top: 5px;
  box-shadow: 0px 0px 6px #bdbdbd;
  @media screen and (max-width: 728px) {
    width: 90%;
    height: 100%;
  }
`;
