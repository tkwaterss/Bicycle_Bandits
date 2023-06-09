import React, { useContext, useEffect, useState, useRef } from "react";
import axios from "axios";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import Container from "../../../components/UI/Container";
import SearchBar from "../../../components/UI/SearchBar";
import AuthContext from "../../../store/authContext";
import classes from "./TicketDetails.module.css";
import Card from "../../../components/UI/Card";
import DeleteBtn from "../../../components/UI/DeleteBtn";
import SmallBtn from "../../../components/UI/SmallBtn";
import { priceFormat, toTitleCase } from "../../../utils/formatting";
import RiseLoader from "react-spinners/RiseLoader";
import CheckoutBtn from "../../../components/CheckoutBtn";

const TicketItems = (props) => {
  const { token } = useContext(AuthContext);
  const { employee, ticketId, loading, setLoading, ticket } = props;
  const [laborItems, setLaborItems] = useState([]);
  const [productItems, setProductItems] = useState([]);
  const [laborResults, setLaborResults] = useState([]);
  const [productResults, setProductResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [total, setTotal] = useState([]);
  const initial = useRef(true);

  const formik = useFormik({
    initialValues: {
      search: "",
    },
    onSubmit: (values, helpers) => {
      setLoading(true);
      axios
        .get(`/search/ticketItems?input=${values.search}`, {
          headers: {
            authorization: token,
          },
        })
        .then((res) => {
          setSearching(true);
          setLaborResults(res.data.labor);
          setProductResults(res.data.products);
          helpers.resetForm();
          setLoading(false);
        })
        .catch((err) => console.log(err));
    },
  });

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/ticketItems/${ticketId}`, {
        headers: {
          authorization: token,
        },
      })
      .then((res) => {
        setLaborItems(res.data.labor);
        setProductItems(res.data.products);
        setTotal(priceFormat(res.data.ticketTotal));
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [ticketId, token, searching, setLoading]);

  useEffect(() => {
    setLoading(true);
    if (initial.current) {
      initial.current = false;
    } else {
      let newLaborTotal = laborItems.reduce((acc, curr) => {
        return acc + +curr.labor.laborPrice * +curr.quantity;
      }, 0);
      let newProductTotal = productItems.reduce((acc, curr) => {
        return acc + +curr.product.productPrice * +curr.quantity;
      }, 0);
      let newTotal = newLaborTotal + newProductTotal;
      setTotal(priceFormat(newTotal));
      axios
        .put(
          `/tickets/total/${ticketId}`,
          { total },
          {
            headers: {
              authorization: token,
            },
          }
        )
        .then((res) => {
          setLoading(false);
        })
        .catch((err) => console.log(err));
    }
  }, [laborItems, productItems, ticketId, token, total, setLoading]);

  const addTicketLabor = (laborId) => {
    setLoading(true);
    console.log(laborId);
    console.log(laborItems);
    let filtered = laborItems.filter((item) => item.laborId === laborId);
    if (filtered.length > 0) {
      Swal.fire({
        title: "Item Already Added!",
        text: `${filtered[0].labor.laborTitle} has already been added to the ticket.`,
        icon: "warning",
        confirmButtonText: "Okay!",
      });
      setSearching(false);
      return;
    }
    let body = {
      quantity: 1,
      ticketId: ticketId,
      laborId: laborId,
    };
    axios
      .post(`/ticketLabor`, body, {
        headers: {
          authorization: token,
        },
      })
      .then((res) => {
        console.log(res.data);
        setSearching(false);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const addTicketProduct = (productId) => {
    setLoading(true);
    let filtered = productItems.filter((item) => item.productId === productId);
    if (filtered.length > 0) {
      Swal.fire({
        title: "Item Already Added!",
        text: `${filtered[0].product.productTitle} has already been added to the ticket.`,
        icon: "warning",
        confirmButtonText: "Okay!",
      });
      setSearching(false);
      return;
    }
    let body = {
      quantity: 1,
      ticketId: ticketId,
      productId: productId,
    };
    axios
      .post(`/ticketProducts`, body, {
        headers: {
          authorization: token,
        },
      })
      .then((res) => {
        console.log(res.data);
        setSearching(false);
        setLoading(false);
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
        `/ticketLabor/${id}`,
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
        `/ticketProducts/${id}`,
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

  const deleteTicketLabor = (id) => {
    setLoading(true);
    axios
      .delete(`/ticketLabor/${id}`, {
        headers: {
          authorization: token,
        },
      })
      .then((res) => {
        setLaborItems(laborItems.filter((item) => item.id !== id));
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const deleteTicketProduct = (id) => {
    setLoading(true);
    axios
      .delete(`/ticketProducts/${id}`, {
        headers: {
          authorization: token,
        },
      })
      .then((res) => {
        setProductItems(productItems.filter((item) => item.id !== id));
        setLoading(false);
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
              <li id={classes.itemTitle}>
                {item.labor.laborTitle.toUpperCase()}
              </li>
              <li id={classes.itemTime}>
                {+item.labor.laborTime * item.quantity} minutes
              </li>
              <div className={classes.quantitySet}>
                {employee ? (
                  <SmallBtn
                    id="decrement"
                    className={classes.adjustQuantityBtn}
                    onClick={(e) =>
                      updateTicketLabor(e, item.id, item.quantity, index)
                    }
                  >
                    -
                  </SmallBtn>
                ) : (
                  <div className={classes.adjustQuantityBtn}></div>
                )}
                <li>{item.quantity}</li>
                {employee ? (
                  <SmallBtn
                    id={"increment"}
                    className={classes.adjustQuantityBtn}
                    onClick={(e) =>
                      updateTicketLabor(e, item.id, item.quantity, index)
                    }
                  >
                    +
                  </SmallBtn>
                ) : (
                  <div className={classes.adjustQuantityBtn}></div>
                )}
              </div>
              <li id={classes.itemPrice}>
                $ {priceFormat(item.labor.laborPrice * item.quantity)}
              </li>
            </ul>
            {employee ? (
              <DeleteBtn
                onClick={() => deleteTicketLabor(item.id)}
                className={classes.adjustQuantityBtn}
              >
                X
              </DeleteBtn>
            ) : (
              <div className={classes.adjustQuantityBtn}></div>
            )}
          </div>
        </Card>
      );
    });

  if (searching) {
    laborDisplay =
      laborResults &&
      laborResults.map((item, index) => {
        return (
          <Card key={item.id} className={classes.ticketItemsCard}>
            <div className={classes.listItemContainer}>
              <ul className={classes.itemsList}>
                <li id={classes.itemTitle}>{item.laborTitle}</li>
                <li id={classes.itemTime}>{item.laborTime} minutes</li>
                <li className={classes.searchQuantity}>1</li>
                <li id={classes.itemPrice}>$ {priceFormat(item.laborPrice)}</li>
              </ul>
              <SmallBtn
                onClick={() => addTicketLabor(item.id)}
                className={classes.cancelSearch}
              >
                ADD
              </SmallBtn>
            </div>
          </Card>
        );
      });
  }

  let productDisplay =
    productItems &&
    productItems.map((item, index) => {
      return (
        <Card key={item.id} className={classes.ticketItemsCard}>
          <div className={classes.listItemContainer}>
            <ul className={classes.itemsList}>
              <li id={classes.itemTitle}>
                {toTitleCase(item.product.productTitle)}
              </li>
              <li id={classes.itemTime}></li>
              <div className={classes.quantitySet}>
                {employee ? (
                  <SmallBtn
                    id="decrement"
                    className={classes.adjustQuantityBtn}
                    onClick={(e) =>
                      updateTicketProduct(e, item.id, item.quantity, index)
                    }
                  >
                    -
                  </SmallBtn>
                ) : (
                  <div className={classes.adjustQuantityBtn}></div>
                )}
                <li>{item.quantity}</li>
                {employee ? (
                  <SmallBtn
                    id={"increment"}
                    className={classes.adjustQuantityBtn}
                    onClick={(e) =>
                      updateTicketProduct(e, item.id, item.quantity, index)
                    }
                  >
                    +
                  </SmallBtn>
                ) : (
                  <div className={classes.adjustQuantityBtn}></div>
                )}
              </div>
              <li id={classes.itemPrice}>
                $ {priceFormat(item.product.productPrice * item.quantity)}
              </li>
            </ul>
            {employee ? (
              <DeleteBtn
                onClick={() => deleteTicketProduct(item.id)}
                className={classes.adjustQuantityBtn}
              />
            ) : (
              <div className={classes.adjustQuantityBtn}></div>
            )}
          </div>
        </Card>
      );
    });

  if (searching) {
    productDisplay =
      productResults &&
      productResults.map((item) => {
        return (
          <Card key={item.id} className={classes.ticketItemsCard}>
            <div className={classes.listItemContainer}>
              <ul className={classes.itemsList}>
                <li id={classes.itemTitle}>{item.productTitle}</li>
                <li id={classes.itemTime}>N/A</li>
                <li className={classes.searchQuantity}>1</li>
                <li id={classes.itemPrice}>
                  $ {priceFormat(item.productPrice)}
                </li>
              </ul>
              <SmallBtn
                onClick={() => addTicketProduct(item.id)}
                className={classes.cancelSearch}
              >
                ADD
              </SmallBtn>
            </div>
          </Card>
        );
      });
  }

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
                placeholder="Search Products and Labor"
              />
            </div>
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
        <div className={classes.totalBarFooterContainer}>
          {!loading ? (
            <div>
              <h3>Ticket Total: $ {total}</h3>
              <CheckoutBtn cartItems={{productItems, laborItems}} customerId={ticket.userId} ticketId={ticket.id}/>
            </div>
          ) : (
            <RiseLoader size={18} color="#FFFBDB"></RiseLoader>
          )}
          {!searching ? (
            ""
          ) : (
            <SmallBtn
              type="button"
              className={classes.checkoutBtn}
              onClick={() => setSearching(false)}
            >
              Cancel
            </SmallBtn>
          )}
        </div>
      </div>
    </Container>
  );
};

export default TicketItems;
