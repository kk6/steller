import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "@reach/router";
import { Box, Container, Content, Section } from "bloomer";

function TodoList({ index, name }) {
  return (
    <li>
      <Link to={`lists/${index}`}>{name}</Link>
    </li>
  );
}
TodoList.propTypes = {
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired
};

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
ListForm.propTypes = {
  addList: PropTypes.func.isRequired
};

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
