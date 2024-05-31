import { TextField } from "@mui/material";
import React, { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

function EmployeeBranchId({ value, onChange }) {
  const [selectedValue, setSelectedValue] = useState(null);

  const handleChange = (e) => {
    const newValue = e.target.value;
    console.log('newValue',newValue);
    setSelectedValue(newValue);
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
              checked={selectedValue === "1"}
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
              checked={selectedValue === "2"}
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
              checked={selectedValue === "3"}
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

export default EmployeeBranchId;

{
  /* <TextField
id="standard-basic"
variant="outlined"
size="small"
name="branch_id"
onChange={handleChange}
type="number"
/> */
}
