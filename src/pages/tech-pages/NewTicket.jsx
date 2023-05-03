import React, { useContext, useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import AuthContext from "../../store/authContext";
import Container from "../../components/UI/Container";
import Input from "../../components/UI/Input";
import LargeBtn from "../../components/UI/LargeBtn";
import Card from "../../components/UI/Card";

const NewTicket = () => {
  const { token } = useContext(AuthContext);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState([]);
  const [bikes, setBikes] = useState([]);
  const [bike, setBike] = useState({});
  const [existingBike, setExistingBike] = useState(false);

  //! const validationSchema = yup.object().shape({});

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
  }, [firstname, lastname]);

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
    // validationSchema: validationSchema,
    onSubmit: (values, helpers) => {
      if (existingBike) {
        values.bikeId = bike.id;
        // values.brand = bike.brand;
        // values.model = bike.model;
        // values.color = bike.color;
        // values.size = bike.size;
        // values.type = bike.type;
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
        },
      };
      console.log(values);

      const createUserBikeTicket = () =>
        axios
          .post(`http://localhost:4040/newUser`, body, {
            headers: {
              authorization: token,
            },
          })
          .then((res) => {
            console.log(res.data)
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
            console.log(res.data);
          })
          .catch((err) => console.log(err));
      
      // const createUser = () =>
      //   axios
      //     .post(`http://localhost:4040/users`, newUserBody, {
      //       headers: {
      //         authorization: token,
      //       },
      //     })
      //     .then((res) => {
      //       newBikeBody.userId = res.data.id;
      //       console.log("new User", res.data);
      //       setUser(res.data);
      //       createBike();
      //     })
      //     .catch((err) => console.log(err));

      // const createBike = () =>
      //   axios
      //     .post(`http://localhost:4040/users/bike`, newBikeBody, {
      //       headers: {
      //         authorization: token,
      //       },
      //     })
      //     .then((res) => {
      //       newTicketBody.bikeId = res.data.id;
      //       console.log("new bike", res.data);
      //       setBike(res.data);
      //       console.log(bike);
      //       createTicket();
      //     })
      //     .catch((err) => console.log(err));

      const createTicket = () =>
        axios
          .post(`http://localhost:4040/tickets`, body.newTicketBody, {
            headers: {
              authorization: token,
            },
          })
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => console.log(err));

          
      if (!values.userId && !values.bikeId) {
        console.log("new everything");
        createUserBikeTicket();
      } else if (values.userId && !values.bikeId) {
        console.log("existing user but new bike");
        createBikeTicket();
      } else if (values.userId && values.bikeId) {
        console.log("existing user and bike");
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
      >
        Brand
      </Input>
      <Input
        id="model"
        name="model"
        type="text"
        value={formik.values.model}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        placeholder="Model"
      >
        Model
      </Input>
      <Input
        id="color"
        name="color"
        type="text"
        value={formik.values.color}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        placeholder="Color"
      >
        Color
      </Input>
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
        >
          Due Date
        </Input>
        <Input
          id="location"
          name="location"
          type="text"
          value={formik.values.location}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Location"
        >
          Location
        </Input>
        <h4>Customer Details</h4>
        <Input
          id="firstname"
          name="firstname"
          type="text"
          value={formik.values.firstname}
          onChange={handleFirstName}
          onBlur={formik.handleBlur}
          placeholder="First Name"
        >
          First Name
        </Input>
        <Input
          id="lastname"
          name="lastname"
          type="text"
          value={formik.values.lastname}
          onChange={handleLastName}
          onBlur={formik.handleBlur}
          placeholder="Last Name"
        >
          Last Name
        </Input>
        <Input
          id="email"
          name="email"
          type="text"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Email"
        >
          Email
        </Input>
        <Input
          id="phone"
          name="phone"
          type="text"
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Phone"
        >
          Phone
        </Input>
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
