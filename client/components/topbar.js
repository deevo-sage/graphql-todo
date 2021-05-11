import { Button } from "@material-ui/core";
import React, { useState } from "react";

const Topbar = ({ user, setuser }) => {
  return (
    <div className="topbar">
      <Button
        onClick={() => {
          window.localStorage.setItem("token", "");
          setuser();
        }}
        variant="contained"
        style={{ marginRight: "20px", marginTop: "20px" }}
      >
        Logout
      </Button>
    </div>
  );
};
export default Topbar;
