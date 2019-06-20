import React from "react";
import { Router } from "@reach/router";

import "./App.css";

import TodoList from "./components/TodoList";
import TodoListList from "./components/TodoListList";

function App() {
  return (
    <div className="app">
      <Router>
        <TodoListList path="/" />
        <TodoList path="lists/:listId" />
      </Router>
    </div>
  );
}

export default App;
