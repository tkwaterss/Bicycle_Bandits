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
  const { employee, id } = props;
  const [laborItems, setLaborItems] = useState([]);
  const [productItems, setProductItems] = useState([]);
  const [total, setTotal] = useState([]);

  const formik = useFormik({
    initialValues: {
      search: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

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

  useEffect(() => {
    let newLaborTotal = laborItems.reduce((acc, curr) => {
      return acc + +curr.labor.laborPrice * +curr.quantity;
    }, 0);
    let newProductTotal = productItems.reduce((acc, curr) => {
      return acc + +curr.product.productPrice * +curr.quantity;
    }, 0);
    let newTotal = newLaborTotal + newProductTotal;
    setTotal(newTotal);
    axios
      .put(
        `http://localhost:4040/tickets/total/${id}`,
        { total },
        {
          headers: {
            authorization: token,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, [laborItems, productItems, id, token, total]);

  const deleteTicketLabor = (id) => {
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

  const updateTicketLabor = (event, id, quantity, index) => {
    let task = event.target.id;
    if (quantity === 1 && task === "decrement") {
      deleteTicketLabor(id);
      return;
    } else if (task === "decrement") {
      quantity--;
    } else if (task === "increment") {
      quantity++;
    }
    axios
      .put(
        `http://localhost:4040/ticketLabor/${id}`,
        { quantity },
        {
          headers: {
            authorization: token,
          },
        }
      )
      .then((res) => {
        let updatedItem = { ...laborItems[index], quantity: res.data.quantity };
        let newList = [...laborItems];
        newList[index] = updatedItem;
        setLaborItems([...newList]);
      })
      .catch((err) => console.log(err));
  };

  const deleteTicketProduct = (id) => {
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

  const updateTicketProduct = (event, id, quantity, index) => {
    let task = event.target.id;
    if (quantity === 1 && task === "decrement") {
      deleteTicketLabor(id);
    } else if (task === "decrement") {
      quantity--;
    } else if (task === "increment") {
      quantity++;
    }
    axios
      .put(
        `http://localhost:4040/ticketProducts/${id}`,
        { quantity },
        {
          headers: {
            authorization: token,
          },
        }
      )
      .then((res) => {
        let updatedItem = {
          ...productItems[index],
          quantity: res.data.quantity,
        };
        let newList = [...productItems];
        newList[index] = updatedItem;
        setProductItems([...newList]);
      })
      .catch((err) => console.log(err));
  };

  let laborDisplay =
    laborItems &&
    laborItems.map((item, index) => {
      return (
        <Card key={item.id} className={classes.ticketItemsCard}>
          <div className={classes.listItemContainer}>
            <ul className={classes.itemsList}>
              <li id={classes.itemTitle}>{item.labor.laborTitle}</li>
              <li id={classes.itemTime}>
                {+item.labor.laborTime * item.quantity} minutes
              </li>
              <div className={classes.quantitySet}>
                <SmallBtn
                  id="decrement"
                  className={classes.adjustQuantityBtn}
                  onClick={(e) =>
                    updateTicketLabor(e, item.id, item.quantity, index)
                  }
                >
                  -
                </SmallBtn>
                <li>{item.quantity}</li>
                <SmallBtn
                  id={"increment"}
                  className={classes.adjustQuantityBtn}
                  onClick={(e) =>
                    updateTicketLabor(e, item.id, item.quantity, index)
                  }
                >
                  +
                </SmallBtn>
              </div>
              <li id={classes.itemPrice}>
                $ {item.labor.laborPrice * item.quantity}
              </li>
            </ul>
            <DeleteBtn onClick={() => deleteTicketLabor(item.id)}>X</DeleteBtn>
          </div>
        </Card>
      );
    });

  let productDisplay =
    productItems &&
    productItems.map((item, index) => {
      return (
        <Card key={item.id} className={classes.ticketItemsCard}>
          <div className={classes.listItemContainer}>
            <ul className={classes.itemsList}>
              <li id={classes.itemTitle}>{item.product.productTitle}</li>
              <li id={classes.itemTime}></li>
              <div className={classes.quantitySet}>
                <SmallBtn
                  id="decrement"
                  className={classes.adjustQuantityBtn}
                  onClick={(e) =>
                    updateTicketProduct(e, item.id, item.quantity, index)
                  }
                >
                  -
                </SmallBtn>
                <li>{item.quantity}</li>
                <SmallBtn
                  id={"increment"}
                  className={classes.adjustQuantityBtn}
                  onClick={(e) =>
                    updateTicketProduct(e, item.id, item.quantity, index)
                  }
                >
                  +
                </SmallBtn>
              </div>
              <li id={classes.itemPrice}>
                $ {item.product.productPrice * item.quantity}
              </li>
            </ul>
            <DeleteBtn onClick={() => deleteTicketProduct(item.id)} />
          </div>
        </Card>
      );
    });

  return (
    <Container className={classes.ticketItemsContainer}>
      <div className={classes.titleContainer}>
        {employee && (
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
        )}
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
