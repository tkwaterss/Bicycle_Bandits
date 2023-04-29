import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Container from "../../../components/UI/Container";
import Card from "../../../components/UI/Card";
import classes from "./Dashboard.module.css";
import AuthContext from "../../../store/authContext";

const ToDoList = () => {
  const { token } = useContext(AuthContext);
  const [list, setList] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:4040/toDoList', {
        headers: {
          authorization: token,
        },
      })
      .then((res) => setList(res.data))
      .catch((err) => console.log(err))
  }, [token])

  console.log(list);

  let display = list.map(item => {
    return (<Card className={classes.ticketCard}>
      <ul className={classes.ticketList}>
        <li>{item.description}</li>
      </ul>
    </Card>)
  })

  return (
    <Container className={classes.toDoListContainer}>
      <h2>To Do List</h2>
      <div className={classes.cardContainer}>{display}</div>
    </Container>
  );
};

export default ToDoList;
