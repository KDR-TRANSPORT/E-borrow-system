import { TextField } from "@mui/material";
import React from "react";

function BrandEdit({ value, onChange }) {
  const handleChange = (e) => {
    onChange(e);
  };

  return (
    <div className="relative">
      <h1 className="font-semibold  absolute -top-6 left-1 text-sm ">ยี่ห้อ</h1>
      <TextField
        id="standard-basic"
        variant="outlined"
        size="small"
        name="brand"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}

export default BrandEdit;
