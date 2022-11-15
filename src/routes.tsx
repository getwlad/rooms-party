import React from "react";

import {
  BrowserRouter as Router,
  Routes as Rotas,
  Route,
} from "react-router-dom";

import MainPage from "./components/MainPage";
import RoomPage from "./components/RoomPage";
export default function Routes() {
  return (
    <>
      <Router>
        <Rotas>
          <Route path={"/:id"} element={<RoomPage />} />
          <Route path={"/"} element={<MainPage />} />
        </Rotas>
      </Router>
    </>
  );
}
