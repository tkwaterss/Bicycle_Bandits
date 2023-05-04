import React, { useContext } from "react";
import { useFormik } from "formik";
import axios from "axios";
import AuthContext from "../../../store/authContext";
import classes from "./TicketDetails.module.css";

const EditUserForm = (props) => {
  const { ticket, setEditing } = props;
  const { token } = useContext(AuthContext);

  const formik = useFormik({
    initialValues: {
      firstname: ticket.user.firstname,
      lastname: ticket.user.lastname,
      email: ticket.user.email,
      phone: ticket.user.phone,
      address: ticket.user.address,
      brand: ticket.bike.brand,
      model: ticket.bike.model,
      color: ticket.bike.color,
      size: ticket.bike.size,
    },
    onSubmit: (values) => {
      console.log(values);
      let body = {
        user: {
          firstname: values.firstname,
          lastname: values.lastname,
          email: values.email,
          phone: values.phone,
          address: values.address,
        },
        bike: {
          brand: values.brand,
          model: values.model,
          color: values.color,
          size: values.size,
        },
      };

      axios
        .put(
          `http://localhost:4040/users/update?userId=${ticket.userId}&bikeId=${ticket.bikeId}`,
          body,
          {
            headers: {
              authorization: token,
            },
          }
        )
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));

      setEditing(false);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <div>
          <h5>First Name:</h5>
          <h5>Last Name:</h5>
          <h5>Email:</h5>
          <h5>Phone:</h5>
          <h5>Address:</h5>
        </div>
        <h4>Customer Details</h4>
        <div>
          <input
            id="firstname"
            name="firstname"
            type="text"
            value={formik.values.firstname}
            onChange={formik.handleChange}
            placeholder="First Name"
          />
          <input
            id="lastname"
            name="lastname"
            type="text"
            value={formik.values.lastname}
            onChange={formik.handleChange}
            placeholder="Last Name"
          />
          <input
            id="email"
            name="email"
            type="text"
            value={formik.values.email}
            onChange={formik.handleChange}
            placeholder="Email"
          />
          <input
            id="phone"
            name="phone"
            type="text"
            value={formik.values.phone}
            onChange={formik.handleChange}
            placeholder="Phone"
          />
          <input
            id="address"
            name="address"
            type="text"
            value={formik.values.address}
            onChange={formik.handleChange}
            placeholder="Address"
          />
        </div>
      </div>
      <div>
        <div>
          <h5>Brand:</h5>
          <h5>Model:</h5>
          <h5>Color:</h5>
          <h5>Size:</h5>
        </div>
        <h4>Bicycle Details</h4>
        <div>
          <input
            id="brand"
            name="brand"
            type="text"
            value={formik.values.brand}
            onChange={formik.handleChange}
            placeholder="Brand"
          />
          <input
            id="model"
            name="model"
            type="text"
            value={formik.values.model}
            onChange={formik.handleChange}
            placeholder="Model"
          />
          <input
            id="color"
            name="color"
            type="text"
            value={formik.values.color}
            onChange={formik.handleChange}
            placeholder="Color"
          />
          <input
            id="size"
            name="size"
            type="text"
            value={formik.values.size}
            onChange={formik.handleChange}
            placeholder="Size"
          />
        </div>
      </div>
      <button type="submit">Stop Editing</button>
    </form>
  );
};

export default EditUserForm;
