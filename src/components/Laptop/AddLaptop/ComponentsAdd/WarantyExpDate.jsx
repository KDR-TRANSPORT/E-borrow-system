import React from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

function WarantyExpDate({ value, onDateChange }) {
  const handleChange = (value) => {
    const year = value.$y;
    const month = String(value.$M + 1).padStart(2, "0");
    const day = String(value.$D).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    onDateChange(formattedDate);
  };
  return (
    <div className="relative">
      <h1 className="font-semibold text-sm  absolute -top-6 left-1">
        วันหมดประกัน
      </h1>
      <DatePicker name="warrantyexpirationdate" onChange={handleChange} sx={{width:220}} />
    </div>
  );
}

export default WarantyExpDate;
