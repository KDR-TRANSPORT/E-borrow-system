import { TextField } from "@mui/material";
import React from "react";

function Brand() {
  return (
    <div className="relative">
      <h1 className="font-semibold  absolute -top-6 left-1 text-sm ">Brand</h1>
      <TextField id="standard-basic" variant="outlined" sx={{ width: 260 }} />
    </div>
  );
}

export default Brand;
