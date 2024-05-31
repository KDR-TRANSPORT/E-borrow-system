import { TextField } from "@mui/material";
import React from "react";

function EmployeePhoneEdit({ value, onChange }) {
  const handleChange = (e) => {
    onChange(e);
  };
  return (
    <div className="relative">
      <h1 className="font-semibold text-sm  absolute -top-6 left-1">
        เบอร์โทรศัพท์
      </h1>
      <TextField
        id="standard-basic"
        variant="outlined"
        size="small"
        name="employee_phone"
        onChange={handleChange}
        type="number"
        value={value}
      />
    </div>
  );
}

export default EmployeePhoneEdit;
