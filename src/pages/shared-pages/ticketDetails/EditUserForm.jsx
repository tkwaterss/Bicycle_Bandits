import React, { useContext } from "react";
import { useFormik } from "formik";
import axios from "axios";
import AuthContext from "../../../store/authContext";
import classes from "./TicketDetails.module.css";
import SmallBtn from "../../../components/UI/SmallBtn";

const EditUserForm = (props) => {
  const { ticket, setEditing, setTicket } = props;
  const { token } = useContext(AuthContext);

  console.log(ticket);

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
      setTicket({ ...ticket, user: body.user, bike: body.bike });
      axios
        .put(
          `/users/update?userId=${ticket.userId}&bikeId=${ticket.bikeId}`,
          body,
          {
            headers: {
              authorization: token,
            },
          }
        )
        .then((res) => console.log(res))
        .catch((err) => console.log(err));

      setEditing(false);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className={classes.userInfoContainer}>
      <div className={classes.userdetailsContainer}>
        <h4>Customer Details</h4>
        <div className={classes.detailsListContainer}>
          <div className={classes.detailsDiv}>
            <h5 className={classes.detailLabel}>First:</h5>
            <input
              id="firstname"
              name="firstname"
              type="text"
              value={formik.values.firstname}
              onChange={formik.handleChange}
              placeholder="First Name"
            />
          </div>
          <div className={classes.detailsDiv}>
            <h5 className={classes.detailLabel}>Last:</h5>
            <input
              id="lastname"
              name="lastname"
              type="text"
              value={formik.values.lastname}
              onChange={formik.handleChange}
              placeholder="Last Name"
            />
          </div>
          <div className={classes.detailsDiv}>
            <h5 className={classes.detailLabel}>Email:</h5>
            <input
              id="email"
              name="email"
              type="text"
              value={formik.values.email}
              onChange={formik.handleChange}
              placeholder="Email"
            />
          </div>
          <div className={classes.detailsDiv}>
            <h5 className={classes.detailLabel}>Phone</h5>
            <input
              id="phone"
              name="phone"
              type="text"
              value={formik.values.phone}
              onChange={formik.handleChange}
              placeholder="Phone"
            />
          </div>
          <div className={classes.detailsDiv}>
            <h5 className={classes.detailLabel}>Address</h5>
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
      </div>
      <div className={classes.ticketdetailsContainer}>
        <h4>Bicycle Details</h4>
        <div className={classes.detailsListContainer}>
          <div className={classes.detailsDiv}>
            <h5 className={classes.detailLabel}>Brand:</h5>
            <input
              id="brand"
              name="brand"
              type="text"
              value={formik.values.brand}
              onChange={formik.handleChange}
              placeholder="Brand"
            />
          </div>
          <div className={classes.detailsDiv}>
            <h5 className={classes.detailLabel}>Model:</h5>
            <input
              id="model"
              name="model"
              type="text"
              value={formik.values.model}
              onChange={formik.handleChange}
              placeholder="Model"
            />
          </div>
          <div className={classes.detailsDiv}>
            <h5 className={classes.detailLabel}>Color:</h5>
            <input
              id="color"
              name="color"
              type="text"
              value={formik.values.color}
              onChange={formik.handleChange}
              placeholder="Color"
            />
          </div>
          <div className={classes.detailsDiv}>
            <h5 className={classes.detailLabel}>Size:</h5>
            <input
              id="size"
              name="size"
              type="text"
              value={formik.values.size}
              onChange={formik.handleChange}
              placeholder="Size"
            />
          </div>
        <SmallBtn type="submit" className={classes.stopEditingBtn}>Stop Editing</SmallBtn>
        </div>
      </div>
    </form>
  );
};

export default EditUserForm;
