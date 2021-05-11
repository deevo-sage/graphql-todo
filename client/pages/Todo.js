import React, { useEffect, useState } from "react";
import { navigate } from "@reach/router";
import Listitem from "../components/list-item";
import gql from "graphql-tag";
import client from "../hooks";
import { Button, Switch, TextField } from "@material-ui/core";
const mutation = gql`
  mutation Task($aim: String!) {
    createtask(aim: $aim) {
      id
      aim
      status
    }
  }
`;

const Todo = ({ user, setuser }) => {
  const [aim, setaim] = useState("");
  const [show, setshow] = useState(true);
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);
  return (
    <div className="todo">
      <div>
        <h1> Welcome {user && user.name}</h1>
        <h2>
          Show done?{" "}
          <Switch
            checked={show}
            onChange={() => {
              setshow(!show);
            }}
          />
        </h2>
        {user &&
          user.tasks.map((item, key) => {
            return (
              <Listitem
                show={show}
                key={item.aim + key}
                id={item.id}
                aim={item.aim}
                status={item.status}
              />
            );
          })}
        <TextField
          label="aim"
          value={aim}
          onChange={(e) => {
            setaim(e.target.value);
          }}
        />
        <Button
          onClick={() => {
            client.mutate({ mutation, variables: { aim } }).then(({ data }) => {
              if (data)
                setuser({ ...user, tasks: [data.createtask, ...user.tasks] });
            });
          }}
        >
          Add Task
        </Button>
      </div>
    </div>
  );
};
export default Todo;
