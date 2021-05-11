import React, { useEffect, useState } from "react";
import { Paper, Typography, Checkbox } from "@material-ui/core";
import client from "../hooks";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
const mutation = gql`
  mutation UpdateTask($id: String!, $status: Boolean!) {
    updatetask(id: $id, status: $status) {
      id
      aim
      status
      created_at
    }
  }
`;
const Listitem = ({ id, aim, status, show }) => {
  const [checked, setchecked] = useState(status);
  const [update] = useMutation(mutation, {
    client,
    variables: { id, status: !checked },
  });
  function Submithandler() {
    update().then(({ data }) => {
      if (data) {
        console.log(data);
        setchecked(!checked);
      } else {
        setchecked(!checked);
        alert("error updating");
      }
    });
  }

  if (show) {
    return (
      <Paper
        style={{
          maxWidth: "400px",
          width: "90%",
          marginBottom: "10px",
          display: "flex",
          alignItems: "center",
          minHeight: "3rem",
        }}
      >
        <Checkbox checked={checked} onClick={Submithandler} />
        <Typography>{aim}</Typography>
      </Paper>
    );
  } else if (!show && !checked) {
    return (
      <Paper
        style={{
          maxWidth: "400px",
          width: "90%",
          marginBottom: "10px",
          display: "flex",
          alignItems: "center",
          minHeight: "3rem",
        }}
      >
        <Checkbox checked={checked} onClick={Submithandler} />
        <Typography>{aim}</Typography>
      </Paper>
    );
  } else {
    return <></>;
  }
};

export default Listitem;
