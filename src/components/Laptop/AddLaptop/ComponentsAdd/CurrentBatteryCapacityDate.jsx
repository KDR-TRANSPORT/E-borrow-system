import { TextField } from "@mui/material";
import React from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

function CurrentBatteryCapacityDate() {
  return (
    <div className="relative">
      <h1 className="font-semibold text-sm absolute -top-6 left-1">
        Current Battery Capacity Date{" "}
      </h1>{" "}
      <DatePicker />{" "}
    </div>
  );
}

export default CurrentBatteryCapacityDate;
