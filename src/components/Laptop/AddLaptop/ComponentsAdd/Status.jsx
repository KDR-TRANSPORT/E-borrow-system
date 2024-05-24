import { TextField } from "@mui/material";
import React from "react";

function Status({ value, onChange }) {
  const handleChange = (e) => {
    onChange(e);
  };

  return (
    <div className="relative">
      <h1 className="font-semibold text-sm  absolute -top-6 left-1">Status</h1>
      <TextField
        id="standard-basic"
        variant="outlined"
        size="small"
        onChange={handleChange}
        name="status"
        value={value}
      />
    </div>
  );
}

export default Status;
