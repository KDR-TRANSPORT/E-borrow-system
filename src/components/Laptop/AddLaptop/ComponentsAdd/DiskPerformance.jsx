import { TextField } from "@mui/material";
import React from "react";

function DiskPerformance({ value, onChange }) {
  const handleChange = (e) => {
    onChange(e);
  };

  return (
    <div className="relative">
      <h1 className="font-semibold text-sm  absolute -top-6 left-1">
        ประสิทธิภาพดิสก์
      </h1>
      <TextField
        id="standard-basic"
        variant="outlined"
        value={value}
        size="small"
        onChange={handleChange}
        name="diskperformance"
      />
    </div>
  );
}

export default DiskPerformance;
