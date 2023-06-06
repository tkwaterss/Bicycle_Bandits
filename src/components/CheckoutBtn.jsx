import React, { useContext } from "react";
import axios from "axios";
import AuthContext from "../store/authContext";

//This button starts the Strip Payment Process

const CheckoutBtn = (props) => {
  const { userId, employee } = useContext(AuthContext);
  //recieving cart items data through props from where button is clicked
  let { cartItems, customerId } = props;
  cartItems = [
    {
      name: "Shimano Chain",
      quantity: 1,
      id: 2,
      price: 25.99,
    },
    {
      name: "Pro Saddle",
      quantity: 2,
      id: 1,
      price: 53.99,
    },
  ];

  const handleCheckout = () => {
    axios
      .post("/create-checkout-session", {
        cartItems,
        id: userId,
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
