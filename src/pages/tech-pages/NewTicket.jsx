import React, { useContext, useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../store/authContext";
import Container from "../../components/UI/Container";
import Input from "../../components/UI/Input";
import LargeBtn from "../../components/UI/LargeBtn";
import Card from "../../components/UI/Card";
import classes from "./NewTicket.module.css";

const NewTicket = () => {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState([]);
  const [bikes, setBikes] = useState([]);
  const [bike, setBike] = useState({});
  const [existingBike, setExistingBike] = useState(false);

  const validationSchema = yup.object().shape({
    dueDate: yup.date().required("This field is required"),
    location: yup.string().required("This field is required"),
    firstname: yup.string().required("This field is required"),
    lastname: yup.string().required("This field is required"),
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("This field is required"),
    phone: yup
      .number()
      .min(1000000000, "Phone number must be at least 10 digits")
      .max(9999999999, "Phone number cannot be more than 10 digits")
      .typeError("Phone number must be a number")
      .required("A phone number is required"),
    brand: !existingBike ? yup.string().required("This field is required") : yup.string(),
    model: !existingBike ? yup.string().required("This field is required") : yup.string(),
    color: !existingBike ? yup.string().required("This field is required") : yup.string(),
    address: yup.string(),
    size: yup.string(),
  });

  const handleFirstName = (event) => {
    formik.handleChange(event);
    setFirstname(event.target.value);
  };
  const handleLastName = (event) => {
    formik.handleChange(event);
    setLastname(event.target.value);
  };
  const selectBike = (event) => {
    let selectedBike = bikes.filter((bike) => bike.id === +event.target.value);
    selectedBike && setBike(selectedBike[0]);
  };

  useEffect(() => {
    const getUserList = setTimeout(() => {
      (firstname || lastname) &&
        axios
          .get(
            `http://localhost:4040/users?${
              firstname ? `firstname=${firstname}` : ""
            }${firstname && lastname ? "&" : ""}${
              lastname ? `lastname=${lastname}` : ""
            }`,
            {
              headers: {
                authorization: token,
              },
            }
          )
          .then((res) => setUsers(res.data))
          .catch((err) => console.log(err));
    }, 300);

    return () => clearTimeout(getUserList);
  }, [firstname, lastname, token]);

  const selectUser = (userId) => {
    setUser(users.filter((user) => user.id === +userId));

    axios
      .get(`http://localhost:4040/users/bikes/${userId}`, {
        headers: {
          authorization: token,
        },
      })
      .then((res) => {
        setBikes(res.data);
        setExistingBike(true);
        setBike(res.data[0]);
      })
      .catch((err) => console.log(err));
  };

  const formik = useFormik({
    initialValues: {
      dueDate: "",
      location: "",
      userId: "",
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      address: "",
      bikeId: "",
      brand: "",
      model: "",
      color: "",
      size: "",
      type: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, helpers) => {
      if (existingBike) {
        values.bikeId = bike.id;
      }
      let body = {
        newUserBody: {
          firstname: values.firstname,
          lastname: values.lastname,
          email: values.email,
          phone: values.phone,
          address: values.address,
          employee: false,
        },
        newBikeBody: {
          brand: values.brand,
          model: values.model,
          color: values.color,
          size: values.size,
          type: values.type,
          userId: values.userId,
        },
        newTicketBody: {
          dueDate: values.dueDate,
          location: values.location,
          bikeId: values.bikeId,
          userId: values.userId,
          total: 0,
          status: "Checked In",
          internalNotes: "",
          externalNotes: "",
        },
      };

      const createUserBikeTicket = () =>
        axios
          .post(`http://localhost:4040/newUser`, body, {
            headers: {
              authorization: token,
            },
          })
          .then((res) => {
            navigate(`/ticket/${res.data.id}`)
          })
          .catch((err) => console.log(err));

      const createBikeTicket = () =>
        axios
          .post(`http://localhost:4040/newBike`, body, {
            headers: {
              authorization: token,
            },
          })
          .then((res) => {
            navigate(`/ticket/${res.data.id}`)
          })
          .catch((err) => console.log(err));

      const createTicket = () =>
        axios
          .post(`http://localhost:4040/tickets`, body.newTicketBody, {
            headers: {
              authorization: token,
            },
          })
          .then((res) => {
            navigate(`/ticket/${res.data.id}`)
          })
          .catch((err) => console.log(err));

      if (!values.userId && !values.bikeId) {
        createUserBikeTicket();
      } else if (values.userId && !values.bikeId) {
        createBikeTicket();
      } else if (values.userId && values.bikeId) {
        createTicket();
      }
    },
  });

  if (user[0]) {
    formik.values.userId = user[0].id;
    formik.values.firstname = user[0].firstname;
    formik.values.lastname = user[0].lastname;
    formik.values.email = user[0].email;
    formik.values.phone = user[0].phone;
    formik.values.address = user[0].address;
  }

  let displayUsers = users.map((user) => {
    return (
      <Card key={user.id}>
        <div style={{ color: "black" }} onClick={() => selectUser(user.id)}>
          <div>
            <h5>{`${user.firstname} ${user.lastname}`}</h5>
            <h5>{user.phone}</h5>
          </div>
          <h5>{user.email}</h5>
          <h5>{user.address}</h5>
        </div>
      </Card>
    );
  });

  let bikesList = bikes.map((bike) => {
    return (
      <option
        key={bike.id}
        value={bike.id}
      >{`${bike.brand}, ${bike.model}, ${bike.color}, ${bike.size}`}</option>
    );
  });

  let bikeForm = (
    <>
      {user[0] ? (
        <button onClick={() => setExistingBike(true)}>
          Choose Existing Bike
        </button>
      ) : (
        ""
      )}
      <Input
        id="brand"
        name="brand"
        type="text"
        value={formik.values.brand}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        placeholder="Brand"
        invalid={formik.touched.brand && formik.errors.brand ? true : false}
      >
        Brand
      </Input>
      {formik.touched.brand && formik.errors.brand ? (
        <div>{formik.errors.brand}</div>
      ) : (
        <div className={classes.placeholder}></div>
      )}
      <Input
        id="model"
        name="model"
        type="text"
        value={formik.values.model}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        placeholder="Model"
        invalid={formik.touched.model && formik.errors.model ? true : false}
      >
        Model
      </Input>
      {formik.touched.model && formik.errors.model ? (
        <div>{formik.errors.model}</div>
      ) : (
        <div className={classes.placeholder}></div>
      )}
      <Input
        id="color"
        name="color"
        type="text"
        value={formik.values.color}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        placeholder="Color"
        invalid={formik.touched.color && formik.errors.color ? true : false}
      >
        Color
      </Input>
      {formik.touched.color && formik.errors.color ? (
        <div>{formik.errors.color}</div>
      ) : (
        <div className={classes.placeholder}></div>
      )}
      <Input
        id="size"
        name="size"
        type="text"
        value={formik.values.size}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        placeholder="Size"
      >
        Size
      </Input>
      <select
        id="type"
        name="type"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        defaultValue=""
      >
        <option value="">-- Select a Type --</option>
        <option value="Full Suspension">Full Suspension</option>
        <option value="Hardtail">Hardtail</option>
        <option value="Gravel">Gravel</option>
        <option value="Commuter">Commuter</option>
        <option value="E-Bike">E-Bike</option>
        <option value="Road">Road</option>
      </select>
    </>
  );

  return (
    <Container>
      <form onSubmit={formik.handleSubmit}>
        <Input
          id="dueDate"
          name="dueDate"
          type="date"
          value={formik.values.dueDate}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Due Date"
          invalid={
            formik.touched.dueDate && formik.errors.dueDate ? true : false
          }
        >
          Due Date
        </Input>
        {formik.touched.dueDate && formik.errors.dueDate ? (
          <div>{formik.errors.dueDate}</div>
        ) : (
          <div className={classes.placeholder}></div>
        )}
        <Input
          id="location"
          name="location"
          type="text"
          value={formik.values.location}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Location"
          invalid={
            formik.touched.location && formik.errors.location ? true : false
          }
        >
          Location
        </Input>
        {formik.touched.location && formik.errors.location ? (
          <div>{formik.errors.location}</div>
        ) : (
          <div className={classes.placeholder}></div>
        )}
        <h4>Customer Details</h4>
        <Input
          id="firstname"
          name="firstname"
          type="text"
          value={formik.values.firstname}
          onChange={handleFirstName}
          onBlur={formik.handleBlur}
          placeholder="First Name"
          invalid={
            formik.touched.firstname && formik.errors.firstname ? true : false
          }
        >
          First Name
        </Input>
        {formik.touched.firstname && formik.errors.firstname ? (
          <div>{formik.errors.firstname}</div>
        ) : (
          <div className={classes.placeholder}></div>
        )}
        <Input
          id="lastname"
          name="lastname"
          type="text"
          value={formik.values.lastname}
          onChange={handleLastName}
          onBlur={formik.handleBlur}
          placeholder="Last Name"
          invalid={
            formik.touched.lastname && formik.errors.lastname ? true : false
          }
        >
          Last Name
        </Input>
        {formik.touched.lastname && formik.errors.lastname ? (
          <div>{formik.errors.lastname}</div>
        ) : (
          <div className={classes.placeholder}></div>
        )}
        <Input
          id="email"
          name="email"
          type="text"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Email"
          invalid={formik.touched.email && formik.errors.email ? true : false}
        >
          Email
        </Input>
        {formik.touched.email && formik.errors.email ? (
          <div>{formik.errors.email}</div>
        ) : (
          <div className={classes.placeholder}></div>
        )}
        <Input
          id="phone"
          name="phone"
          type="text"
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Phone"
          invalid={formik.touched.phone && formik.errors.phone ? true : false}
        >
          Phone
        </Input>
        {formik.touched.phone && formik.errors.phone ? (
          <div>{formik.errors.phone}</div>
        ) : (
          <div className={classes.placeholder}></div>
        )}
        <Input
          id="address"
          name="address"
          type="text"
          value={formik.values.address}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Address"
        >
          Address
        </Input>
        <h4>Bicycle Details</h4>

        {existingBike ? (
          <div>
            <h4>Choose an existing Bicycle:</h4>
            <select name="bikes" id="bikes" onChange={selectBike}>
              <option defaultValue="no bike">-- Choose A Bike --</option>
              {bikesList && bikesList}
            </select>
            <button onClick={() => setExistingBike(false)}>Add New Bike</button>
          </div>
        ) : (
          bikeForm
        )}
        <LargeBtn type="submit">Create Ticket</LargeBtn>
      </form>
      <div>
        <div>{displayUsers}</div>
      </div>
    </Container>
  );
};

export default NewTicket;
