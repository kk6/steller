import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Container,
  Content,
  Delete,
  Field,
  Control,
  Checkbox,
  Section
} from "bloomer";

function Todo({ todo, index, completeTodo, removeTodo }) {
  return (
    <div className="todo">
      <Field>
        <Control>
          <Checkbox
            checked={todo.isCompleted}
            onClick={() => completeTodo(index)}
          >
            {todo.text}
          </Checkbox>
        </Control>
      </Field>
      <Delete onClick={() => removeTodo(index)} />
    </div>
  );
}
Todo.propTypes = {
  todo: PropTypes.shape({
    text: PropTypes.string.isRequired,
    isCompleted: PropTypes.bool.isRequired
  }).isRequired,
  index: PropTypes.number.isRequired,
  completeTodo: PropTypes.func.isRequired,
  removeTodo: PropTypes.func.isRequired
};

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
TodoForm.propTypes = {
  addTodo: PropTypes.func.isRequired
};

function TodoList(props) {
  const { listId } = props;
  const todosKey = `steller-todos-${listId}`;
  const todolist = JSON.parse(localStorage.getItem("steller-todolists"))[
    listId
  ];
  const initialTodos = localStorage.getItem(todosKey) || "[]";
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

  useEffect(() => localStorage.setItem(todosKey, JSON.stringify(todos)));

  return (
    <Section>
      <Container>
        <Box>
          <Content>
            <Button onClick={() => window.history.back()}>戻る</Button>

            <h2>{todolist.name}</h2>

            {todos.map((todo, index) => (
              <Box>
                <Todo
                  index={index}
                  todo={todo}
                  completeTodo={completeTodo}
                  removeTodo={removeTodo}
                />
              </Box>
            ))}
            <TodoForm addTodo={addTodo} />
          </Content>
        </Box>
      </Container>
    </Section>
  );
}
TodoList.propTypes = {
  listId: PropTypes.number.isRequired
};

export default TodoList;
