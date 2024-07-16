import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

function EmployeeBranchNameEdit({
  onChange,
  formData,
  setFormData,
  selectedBranch,
  setSelectedBranch,
}) {
 
  const handleChange = (e) => {
    const newValue = e.target.value;
    setSelectedBranch(newValue);
    onChange(e);
  };

  return (
    <div className="relative mt-2">
      <h1 className="font-semibold text-sm absolute -top-6 left-1">
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
              checked={selectedBranch === "อื่นๆ"}
              onChange={() => {
                setSelectedBranch("อื่นๆ");
                setFormData({
                  ...formData,
                  branch_name: "",
                });
              }}
              value="อื่นๆ"
              name="branch_name"
            />
          }
          label="อื่นๆ"
        />
        {selectedBranch === "อื่นๆ" && (
          <TextField
            id="outlined-basic"
            variant="standard"
            name="branch_name"
            value={formData.branch_name}
            onChange={(e) => onChange(e)}
            disabled={selectedBranch !== "อื่นๆ"}
          />
        )}
      </FormGroup>
    </div>
  );
}

export default EmployeeBranchNameEdit;
