import React from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

function FullBatteryCapacityDate() {
  return (
    <div className="relative">
      <h1 className="font-semibold text-sm  absolute -top-6 left-1">
        Full Battery Capacity Date{" "}
      </h1>
      <DatePicker />{" "}
    </div>
  );
}

export default FullBatteryCapacityDate;
