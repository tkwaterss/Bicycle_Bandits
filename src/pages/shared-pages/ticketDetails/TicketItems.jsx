import React, { useContext, useEffect, useState } from "react";
import Container from "../../../components/UI/Container";
import SearchBar from "../../../components/SearchBar";
import AuthContext from "../../../store/authContext";
import axios from "axios";
import classes from "./TicketDetails.module.css";
import Card from "../../../components/UI/Card";
import DeleteBtn from "../../../components/UI/DeleteBtn";
import LargeBtn from "../../../components/UI/LargeBtn";
import SmallBtn from "../../../components/UI/SmallBtn";
import { useFormik } from "formik";

const TicketItems = (props) => {
  const { token } = useContext(AuthContext);
  const { ticket, id } = props;
  const [laborItems, setLaborItems] = useState([]);
  const [productItems, setProductItems] = useState([]);
  const [total, setTotal] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:4040/ticketItems/${id}`, {
        headers: {
          authorization: token,
        },
      })
      .then((res) => {
        setLaborItems(res.data.labor);
        setProductItems(res.data.products);
        setTotal(res.data.ticketTotal);
      })
      .catch((err) => console.log(err));
  }, [id, token]);

  const formik = useFormik({
    initialValues: {
      search: "",
    },
    onSubmit: (values, helpers) => {
      console.log(values);
    },
  });

  const deleteTicketLabor = (event) => {
    let id = event.target.id;
    axios
      .delete(`http://localhost:4040/ticketLabor/${id}`, {
        headers: {
          authorization: token,
        },
      })
      .then((res) => {
        setLaborItems(laborItems.filter((item) => item.id !== id));
      })
      .catch((err) => console.log(err));
  };

  //!NEED TO WRITE UPDATE TICKET ITEMS FUNCTIONS
  const updateTicketLabor = () => {};

  const deleteTicketProduct = (event) => {
    let id = event.target.id;
    axios
      .delete(`http://localhost:4040/ticketProducts/${id}`, {
        headers: {
          authorization: token,
        },
      })
      .then((res) => {
        setProductItems(productItems.filter((item) => item.id !== id));
      })
      .catch((err) => console.log(err));
  };

  const updateTicketProduct = () => {};

  let laborDisplay =
    laborItems &&
    laborItems.map((item) => {
      return (
        <Card key={item.id} className={classes.ticketItemsCard}>
          <div className={classes.listItemContainer}>
            <ul className={classes.itemsList}>
              <li id={classes.itemTitle}>{item.labor.laborTitle}</li>
              <li id={classes.itemTime}>{item.labor.laborTime} minutes</li>
              <div className={classes.quantitySet}>
                <SmallBtn className={classes.adjustQuantityBtn}>-</SmallBtn>
                <li>{item.quantity}</li>
                <SmallBtn className={classes.adjustQuantityBtn}>+</SmallBtn>
              </div>
              <li id={classes.itemPrice}>$ {item.labor.laborPrice}</li>
            </ul>
            <DeleteBtn id={item.id} onClick={deleteTicketLabor}>
              X
            </DeleteBtn>
          </div>
        </Card>
      );
    });

  let productDisplay =
    productItems &&
    productItems.map((item) => {
      return (
        <Card key={item.id} className={classes.ticketItemsCard}>
          <div className={classes.listItemContainer}>
            <ul className={classes.itemsList}>
              <li id={classes.itemTitle}>{item.product.productTitle}</li>
              <li id={classes.itemTime}></li>
              <div className={classes.quantitySet}>
                <SmallBtn className={classes.adjustQuantityBtn}>-</SmallBtn>
                <li>{item.quantity}</li>
                <SmallBtn className={classes.adjustQuantityBtn}>+</SmallBtn>
              </div>
              <li id={classes.itemPrice}>$ {item.product.productPrice}</li>
            </ul>
            <DeleteBtn id={item.id} onClick={deleteTicketProduct} />
          </div>
        </Card>
      );
    });

  return (
    <Container className={classes.ticketItemsContainer}>
      <div className={classes.titleContainer}>
        <form onSubmit={formik.handleSubmit} className={classes.searchForm}>
          <div className={classes.searchBar}>
            <SearchBar
              id="search"
              name="search"
              value={formik.values.search}
              onChange={formik.handleChange}
              placeholder="Search Tickets"
              
            />
          </div>
          <LargeBtn className={classes.checkoutBtn}>Checkout</LargeBtn>
        </form>
        <ul className={classes.titleBar}>
          <li id={classes.titleTitle}>Title</li>
          <li id={classes.titleTime}>Time</li>
          <li id={classes.titleQuantity}>Quantity</li>
          <li id={classes.titlePrice}>Price</li>
        </ul>
      </div>
      <div className={classes.ticketItemsDisplayContainer}>
        {laborDisplay}
        {productDisplay}
      </div>
      <div className={classes.ticketTotalBar}>
        <h3>Ticket Total: $ {total}</h3>
      </div>
    </Container>
  );
};

export default TicketItems;
