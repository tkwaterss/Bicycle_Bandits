import React, { useContext, useEffect, useState, useRef } from "react";
import axios from "axios";
import Container from "../../../components/UI/Container";
import Card from "../../../components/UI/Card";
import classes from "./Dashboard.module.css";
import AuthContext from "../../../store/authContext";

const ToDoList = () => {
  const { token } = useContext(AuthContext);
  const [list, setList] = useState([]);
  const toDoRef = useRef();

  useEffect(() => {
    axios
      .get("http://localhost:4040/toDoList", {
        headers: {
          authorization: token,
        },
      })
      .then((res) => setList(res.data))
      .catch((err) => console.log(err));
  }, [token]);

  const submitHandler = (event) => {
    event.preventDefault();
    axios
      .post(
        "http://localhost:4040/toDoList",
        { complete: false, description: toDoRef.current.value },
        {
          headers: {
            authorization: token,
          },
        }
      )
      .then((res) => {
        setList([...list, res.data]);
      })
      .catch((err) => console.log(err));
    toDoRef.current.value = "";
    event.target.focus();
  };

  const deleteItem = (event) => {
    let id = event.target.id;
    axios
      .delete(`http://localhost:4040/toDoList/${id}`, {
        headers: {
          authorization: token,
        },
      })
      .then((res) => {
        setList(list.filter((item) => item.id !== +id));
      })
      .catch((err) => console.log(err));
  };

  let display = list.map((item) => {
    return (
      <Card key={item.id} className={classes.ticketCard}>
        <ul className={classes.ticketList}>
          <li>{item.description}</li>
        </ul>
        <button id={item.id} onClick={deleteItem}>
          X
        </button>
      </Card>
    );
  });

  return (
    <Container className={classes.toDoListContainer}>
      <h2>To Do List</h2>
      <div className={classes.cardContainer}>{display}</div>
      <form onSubmit={submitHandler}>
        <input type="text" ref={toDoRef} placeholder="New To Do Item" />
        <button>ADD</button>
      </form>
    </Container>
  );
};

export default ToDoList;
