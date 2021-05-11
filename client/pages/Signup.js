import React, { useEffect, useState } from "react";
import { TextField, Button } from "@material-ui/core";
import { navigate } from "@reach/router";
import client from "../hooks";
import gql from "graphql-tag";
const mutation = gql`
  mutation Signup($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      id
      email
      password

      tasks {
        id
        aim
        status
      }
      name
      token
    }
  }
`;
const Signup = ({ user,setuser }) => {
  const [email, setemail] = useState("");
  const [password, setpass] = useState("");
  const [name, setname] = useState("");
  const SubmitHandler = () => {
    client
      .mutate({ mutation, variables: { email, password, name } })
      .then(({ data, errors }) => {
        if (errors) {
          alert("error");
        } else {
          console.log(data);
          window.localStorage.setItem("token", data.token);
          setuser(data.signup);
        }
      });
  };
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);
  return (
    <div className="formOuter">
      <div className="formCont">
        <h2> Signup </h2>
        <div className="form">
          <TextField
            type="email"
            label="email"
            value={email}
            variant="outlined"
            onChange={(e) => {
              setemail(e.target.value);
            }}
          />
          <TextField
            type="text"
            label="name"
            value={name}
            variant="outlined"
            onChange={(e) => {
              setname(e.target.value);
            }}
          />
          <TextField
            type="password"
            label="password"
            value={password}
            variant="outlined"
            onChange={(e) => {
              setpass(e.target.value);
            }}
          />
          <Button variant="contained" onClick={SubmitHandler}>
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};
export default Signup;
