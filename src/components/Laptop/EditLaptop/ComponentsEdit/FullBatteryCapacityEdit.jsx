import { TextField } from "@mui/material";
import React from "react";

function FullBatteryCapacityEdit({ value, onChange }) {
  const handleChange = (e) => {
    onChange(e);
  };
  return (
    <div className="relative">
      <h1 className="font-semibold text-sm  absolute -top-6 left-1">
      ความจุแบตเต็ม
      </h1>
      <TextField
        id="standard-basic"
        variant="outlined"
        value={value}
        size="small"
        name="fullbatterycapacity"
        onChange={handleChange}
      />
    </div>
  );
}

export default FullBatteryCapacityEdit;
