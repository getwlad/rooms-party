import styled from "styled-components";

export const Section = styled.section`
  background-color: #1c1e21;
  width: 100%;
  height: 100%;
  color: #fff;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 10px;
  width: 70%;
`;

export const Layout = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`;

const adjusts = `
  height: 64px;
`;

export const Button = styled.button`
  width: 200px;

  color: #fff;
  cursor: pointer;
  margin: 5px;
  ${adjusts}
  background-color: #006644;
  &:hover {
    background-color: #006044;
  }
`;

export const Input = styled.input`
  width: 80%;
  font-size: 1.1rem;
  ${adjusts}
  outline: none;
  &:focus {
    outline: 1.5px solid #36b67e;
  }
`;
