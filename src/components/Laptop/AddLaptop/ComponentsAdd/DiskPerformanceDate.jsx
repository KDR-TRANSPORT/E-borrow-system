import React from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

function DiskPerformanceDate() {
  return (
    <div className="relative">
      <h1 className="font-semibold  absolute -top-6 left-1 text-sm ">
        Disk Performance Date
      </h1>
      <DatePicker />{" "}
    </div>
  );
}

export default DiskPerformanceDate;
