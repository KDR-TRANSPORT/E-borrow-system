import { TextField } from "@mui/material";
import React from "react";

function SerialNumber({ value, onChange }) {
  const handleChange = (e) => {
    onChange(e);
  };

  return (
    <div className="relative">
      <h1 className="font-semibold text-sm  absolute -top-6 left-1">
        Serial no.
      </h1>
      <TextField
        id="standard-basic"
        variant="outlined"
        size="small"
        value={value}
        onChange={handleChange}
        name="serial_number"
      />
    </div>
  );
}

export default SerialNumber;
