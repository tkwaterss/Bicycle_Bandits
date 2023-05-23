import React, { useContext, useEffect, useState, useRef } from "react";
import axios from "axios";
import Container from "../../../components/UI/Container";
import Card from "../../../components/UI/Card";
import classes from "./Dashboard.module.css";
import AuthContext from "../../../store/authContext";
import DeleteBtn from "../../../components/UI/DeleteBtn";
import SmallBtn from "../../../components/UI/SmallBtn";
import RiseLoader from "react-spinners/RiseLoader";

const ToDoList = (props) => {
  const { token } = useContext(AuthContext);
  const [list, setList] = useState([]);
  const toDoRef = useRef();
  const { loading, setLoading } = props;

  useEffect(() => {
    setLoading(true);
    axios
      .get("/toDoList", {
        headers: {
          authorization: token,
        },
      })
      .then((res) => {
        setList(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [token, setLoading]);

  const submitHandler = (event) => {
    event.preventDefault();
    setLoading(true);
    axios
      .post(
        "/toDoList",
        { complete: false, description: toDoRef.current.value },
        {
          headers: {
            authorization: token,
          },
        }
      )
      .then((res) => {
        setList([...list, res.data]);
        setLoading(false);
      })
      .catch((err) => console.log(err));
    toDoRef.current.value = "";
    event.target.focus();
  };

  const deleteItem = (event) => {
    setLoading(true);
    let id = event.target.id;
    axios
      .delete(`/toDoList/${id}`, {
        headers: {
          authorization: token,
        },
      })
      .then((res) => {
        setList(list.filter((item) => item.id !== +id));
        setLoading(false);
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
      <div className={classes.cardContainer}>
        {display}
      {loading && <RiseLoader size={10} color="#FFFBDB"></RiseLoader>}
      </div>
      <h5>Add Another Item</h5>
      <form onSubmit={submitHandler}>
        <input
          id={classes.toDoInput}
          type="text"
          ref={toDoRef}
          placeholder="New To Do Item"
        />
        <SmallBtn type="submit">ADD</SmallBtn>
      </form>
    </Container>
  );
};

export default ToDoList;
