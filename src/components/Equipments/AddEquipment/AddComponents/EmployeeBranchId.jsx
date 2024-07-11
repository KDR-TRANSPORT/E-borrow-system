import { TextField } from "@mui/material";
import React, { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

function EmployeeBranchId({ value, onChange }) {
  const [selectedBranch, setSelectedBranch] = useState("");

  const handleChange = (e) => {
    const newValue = e.target.value;
    console.log("newValue", newValue);
    setSelectedBranch(newValue);
    onChange(e);
  };

  console.log("dasd", selectedBranch);
  return (
    <div className="relative mt-2">
      <h1 className="font-semibold text-sm  absolute -top-6 left-1">
        สถานที่ใช้งาน
      </h1>
      <FormGroup sx={{ display: "flex", flexDirection: "row" }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={selectedBranch === "สำนักงานใหญ่"}
              onChange={handleChange}
              value="สำนักงานใหญ่"
              name="branch_name"
            />
          }
          label="สำนักงานใหญ่"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={selectedBranch === "สำนักงานลาซาล"}
              onChange={handleChange}
              value="สำนักงานลาซาล"
              name="branch_name"
            />
          }
          label="สำนักงานลาซาล"
        />
        <FormControlLabel
          control={
            <Checkbox
              value="อื่นๆ"
              onChange={(e) => setSelectedBranch("อื่นๆ")}
              name="branch_name"
              checked={selectedBranch === "อื่นๆ"}
            />
          }
          label="อื่นๆ"
        />
        {selectedBranch === "อื่นๆ" && (
          <TextField
            id="outlined-basic"
            variant="standard"
            name="branch_name"
            onChange={(e) => onChange(e)}
            disabled={selectedBranch !== "อื่นๆ"}
          />
        )}
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
