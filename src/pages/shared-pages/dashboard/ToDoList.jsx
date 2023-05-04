import React, { useContext, useEffect, useState, useRef } from "react";
import axios from "axios";
import Container from "../../../components/UI/Container";
import Card from "../../../components/UI/Card";
import classes from "./Dashboard.module.css";
import AuthContext from "../../../store/authContext";
import DeleteBtn from "../../../components/UI/DeleteBtn";
import SmallBtn from "../../../components/UI/SmallBtn";

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
      <Card key={item.id} className={classes.toDoCard}>
        <ul className={classes.toDoList}>
          <li>{item.description}</li>
          <DeleteBtn id={item.id} onClick={deleteItem}></DeleteBtn>
        </ul>
      </Card>
    );
  });

  return (
    <Container className={classes.toDoListContainer}>
      <h3>To Do List</h3>
      <div className={classes.cardContainer}>{display}</div>
      <h5>Add Another Item</h5>
      <form onSubmit={submitHandler}>
        <input id={classes.toDoInput} type="text" ref={toDoRef} placeholder="New To Do Item" />
        <SmallBtn type="submit">ADD</SmallBtn>
      </form>
    </Container>
  );
};

export default ToDoList;
