import React, { useContext, useEffect, useState } from "react";
import Container from "../../../components/UI/Container";
import SearchBar from "../../../components/SearchBar";
import AuthContext from "../../../store/authContext";
import axios from "axios";

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

  console.log(laborItems);
  console.log(productItems);

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

  //!NEED TO WRITE UPDATE TICKET ITEMS FUNCTIONS
  const updateTicketLabor = () => {};

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

  const updateTicketProduct = () => {};

  let laborDisplay =
    laborItems &&
    laborItems.map((item) => {
      return (
        <div key={item.id}>
          <ul>
            <li>{item.labor.laborTitle}</li>
            <li>{item.labor.laborTime}</li>
            <li>{item.quantity}</li>
            <li>{item.labor.laborPrice}</li>
          </ul>
          <button onClick={() => deleteTicketLabor(item.id)}>X</button>
        </div>
      );
    });

  let productDisplay =
    productItems &&
    productItems.map((item) => {
      return (
        <div key={item.id}>
          <ul>
            <li>{item.product.productTitle}</li>
            <li>{item.quantity}</li>
            <li>{item.product.productPrice}</li>
          </ul>
          <button onClick={() => deleteTicketProduct(item.id)}>X</button>
        </div>
      );
    });

  return (
    <Container>
      <div>
        <SearchBar />
        <button>Checkout</button>
      </div>
      <ul>
        <li>Title</li>
        <li>Time Required</li>
        <li>Quantity</li>
        <li>Price</li>
      </ul>
      <div>
        {laborDisplay}
        {productDisplay}
      </div>
      <div>
        <h3>{total}</h3>
      </div>
    </Container>
  );
};

export default TicketItems;
