import React, { useState, useEffect } from "react";
import { Link } from "@reach/router";
import { Section, Content, Container, Box } from "bloomer";

function TodoList({ index, name }) {
  return (
    <li>
      <Link to={"lists/" + index}>{name}</Link>
    </li>
  );
}

function ListForm({ addList }) {
  const [value, setValue] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addList(value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        value={value}
        placeholder="リスト名を入力"
        onChange={e => setValue(e.target.value)}
      />
    </form>
  );
}

function TodoListList() {
  const initialLists = localStorage.getItem("steller-todolists") || "[]";
  const [lists, setLists] = useState(JSON.parse(initialLists));

  const addList = name => {
    const newLists = [...lists, { name }];
    setLists(newLists);
  };

  useEffect(() =>
    localStorage.setItem("steller-todolists", JSON.stringify(lists))
  );

  return (
    <Section>
      <Container>
        <Box>
          <Content>
            <ol>
              {lists.map((list, index) => (
                <TodoList index={index} name={list.name} />
              ))}
            </ol>
          </Content>
          <ListForm addList={addList} />
        </Box>
      </Container>
    </Section>
  );
}

export default TodoListList;
