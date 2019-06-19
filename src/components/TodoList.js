import React, { useState, useEffect } from "react";
import { Box, Section, Container, Button, Content } from "bloomer";

function Todo({ todo, index, completeTodo, removeTodo }) {
  return (
    <div className="todo">
      <label class="checkbox" disabled={todo.isCompleted}>
        <input
          type="checkbox"
          checked={todo.isCompleted}
          onClick={() => completeTodo(index)}
        />
        {todo.text}
      </label>

      <div>
        <button className="button" onClick={() => removeTodo(index)}>
          <span class="icon">
            <i class="fas fa-trash-alt" />
          </span>
        </button>
      </div>
    </div>
  );
}

function TodoForm({ addTodo }) {
  const [value, setValue] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        value={value}
        placeholder="What are you gonna do?"
        onChange={e => setValue(e.target.value)}
      />
    </form>
  );
}

function TodoList(props) {
  const todos_key = `steller-todos-${props.listId}`;
  const todolist = JSON.parse(localStorage.getItem("steller-todolists"))[
    props.listId
  ];
  const initialTodos = localStorage.getItem(todos_key) || "[]";
  const [todos, setTodos] = useState(JSON.parse(initialTodos));

  const addTodo = text => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  };

  const completeTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = true;
    setTodos(newTodos);
  };

  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  useEffect(() => localStorage.setItem(todos_key, JSON.stringify(todos)));

  return (
    <Section>
      <Container>
        <Box>
          <Content>
            <Button onClick={() => window.history.back()}>戻る</Button>

            <h2>{todolist.name}</h2>

            {todos.map((todo, index) => (
              <Todo
                key={index}
                index={index}
                todo={todo}
                completeTodo={completeTodo}
                removeTodo={removeTodo}
              />
            ))}
            <TodoForm addTodo={addTodo} />
          </Content>
        </Box>
      </Container>
    </Section>
  );
}

export default TodoList;
