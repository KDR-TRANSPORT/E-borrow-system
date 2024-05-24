import { TextField } from "@mui/material";
import React from "react";

function CurrentBatteryCapacity({ value, onChange }) {
  const handleChange = (e) => {
    onChange(e);
  };
  return (
    <div className="relative">
      <h1 className="font-semibold text-sm  absolute -top-6 left-1">
        Current Battery Capacity
      </h1>
      <TextField
        id="standard-basic"
        variant="outlined"
        size="small"
        value={value}
        name="currentbatterycapacity"
        onChange={handleChange}
      />
    </div>
  );
}

export default CurrentBatteryCapacity;
