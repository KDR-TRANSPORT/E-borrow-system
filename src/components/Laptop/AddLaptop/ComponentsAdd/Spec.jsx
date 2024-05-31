import { TextField } from "@mui/material";
import React from "react";

function Spec({ value, onChange }) {
  const handleChange = (e) => {
    onChange(e);
  };
  return (
    <div className="relative">
      <h1 className="font-semibold  absolute -top-6 left-1 text-sm ">
        สเปคเครื่อง
      </h1>
      <TextField
        id="outlined-multiline-static"
        multiline
        rows={4}
        value={value}
        sx={{ width: 230 }}
        size="small"
        name="spec"
        onChange={handleChange}
      />{" "}
    </div>
  );
}

export default Spec;
