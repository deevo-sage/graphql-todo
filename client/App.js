import React, { useEffect, useState } from "react";
import { Router } from "@reach/router";
import Login from "./pages/login";
import Signup from "./pages/Signup";
import Todo from "./pages/Todo";
import client from "./hooks";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import TopBar from "./components/topbar";
const query = gql`
  {
    user {
      id
      email
      tasks {
        id
        aim
        status
      }
      name
      password
      token
    }
  }
`;
function App() {
  const { data, loading, error } = useQuery(query, { client });
  const [user, setuser] = useState();
  useEffect(() => {
    if (data) {
      setuser(data.user);
    } else {
      setuser(undefined);
    }
  }, [data]);
  useEffect(() => {
    if (user) window.localStorage.setItem("token", user.token);
  }, [user]);
  return (
    <div className="App">
      {user && <TopBar user={user} setuser={setuser} />}
      <Router>
        <Login path="/login" user={user} setuser={setuser} />
        <Signup path="/signup" user={user} setuser={setuser} />
        <Todo path="/" user={user} setuser={setuser} />
      </Router>
    </div>
  );
}

export default App;
