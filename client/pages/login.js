import React, { useEffect, useState } from "react";
import { TextField, Button } from "@material-ui/core";
import { navigate } from "@reach/router";
import client from "../hooks";
import gql from "graphql-tag";
const mutation = gql`
  mutation Signin($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
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
const Login = ({ user, setuser }) => {
  const [email, setemail] = useState("");
  const [password, setpass] = useState("");

  const SubmitHandler = () => {
    client
      .mutate({ mutation, variables: { email, password } })
      .then(({ data, errors }) => {
        if (errors) {
          alert("error");
        } else {
          console.log(data);
          setuser(data.signin);
          window.localStorage.setItem("token", data.token);
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
        <h2> Login</h2>
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
            type="password"
            label="password"
            value={password}
            variant="outlined"
            onChange={(e) => {
              setpass(e.target.value);
            }}
          />
          <Button
            variant="contained"
            onClick={() => {
              SubmitHandler();
            }}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};
export default Login;
