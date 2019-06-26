import React from "react";
import { Router } from "@reach/router";

import "./App.css";

import TodoList from "./components/TodoList";
import Home from "./components/Home";

function App() {
  return (
    <div className="app">
      <Router>
        <Home path="/" />
        <TodoList path="lists/:listId" />
      </Router>
    </div>
  );
}

export default App;
