import React from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

function WarantyExpDate() {
  return (
    <div className="relative">
      <h1 className="font-semibold text-sm  absolute -top-6 left-1">
        Wanranty Exp Date
      </h1>
      <DatePicker />
    </div>
  );
}

export default WarantyExpDate;
