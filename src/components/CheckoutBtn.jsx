import React, { useContext } from "react";
import axios from "axios";
import AuthContext from "../store/authContext";
import LargeBtn from "./UI/LargeBtn";

//This button starts the Strip Payment Process

const CheckoutBtn = (props) => {
  //recieving cart items data through props from where button is clicked
  let { cartItems, ticketId, customerId } = props;
  //need to covert ticketItems to cartItems format
  cartItems = [
    ...cartItems.laborItems.map((item) => {
      return {
        name: item.labor.laborTitle,
        quantity: item.quantity,
        id: item.laborId,
        price: item.labor.laborPrice,
      };
    }),
    ...cartItems.productItems.map((item) => {
      return {
        name: item.product.productTitle,
        quantity: item.quantity,
        id: item.laborId,
        price: item.product.productPrice,
      };
    }),
  ];

  const handleCheckout = () => {
    console.log(customerId, cartItems);
    axios
      .post("/create-checkout-session", {
        cartItems,
        customerId,
        ticketId,
      })
      .then((res) => {
        console.log(res.data.url);
        window.location.replace(res.data.url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <button onClick={() => handleCheckout()}>Checkout</button>
    </>
  );
};

export default CheckoutBtn;
