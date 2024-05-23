import { TextField } from "@mui/material";
import React from "react";

function Spec() {
  return (
    <div className="relative">
      <h1 className="font-semibold  absolute -top-6 left-1 text-sm ">Specification</h1>
      <TextField
        id="outlined-multiline-static"
        multiline
        rows={4}
        defaultValue=""
      />{" "}
    </div>
  );
}

export default Spec;
