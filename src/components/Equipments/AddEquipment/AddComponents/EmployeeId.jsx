import { TextField } from "@mui/material";
import React from "react";

function EmployeeId({ value, onChange }) {
  const handleChange = (e) => {
    onChange(e);
  };
  return (
    <div className="relative">
      <h1 className="font-semibold text-sm  absolute -top-6 left-1">
        Employee ID
      </h1>
      <TextField
        id="standard-basic"
        variant="outlined"
        size="small"
        name="employee_id"
        onChange={handleChange}
        type="number"
      />
    </div>
  );
}

export default EmployeeId;
