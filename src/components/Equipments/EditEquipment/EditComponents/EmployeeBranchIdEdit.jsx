import { TextField } from "@mui/material";
import React, { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

function EmployeeBranchIdEdit({ value, onChange }) {

  const handleChange = (e) => {
    const newValue = e.target.value;
    onChange(e);
  };

  return (
    <div className="relative mt-2">
      <h1 className="font-semibold text-sm  absolute -top-6 left-1">
        สถานที่ใช้งาน
      </h1>
      <FormGroup sx={{ display: "flex", flexDirection: "row" }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={value === 1}
              onChange={handleChange}
              value={1}
              name="branch_id"
            />
          }
          label="สาขา1"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={value === 2}
              onChange={handleChange}
              value={2}
              name="branch_id"
            />
          }
          label="สาขา2"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={value === 3}
              onChange={handleChange}
              value={3}
              name="branch_id"
            />
          }
          label="สาขา3"
        />
      </FormGroup>
    </div>
  );
}

export default EmployeeBranchIdEdit;

// <TextField
// id="standard-basic"
// variant="outlined"
// size="small"
// name="branch_id"
// onChange={handleChange}
// type="number"
// value={value}
