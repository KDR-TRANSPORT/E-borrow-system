import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Login } from "@mui/icons-material";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function Image({ value, onChange }) {
  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onChange(e, file.name);
    }
  };

  console.log("value", value);
  return (
    <div className="flex items-end ">
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
        color="success"
        name="picture[]"
        onChange={handleChange}
      >
        Upload file
        <VisuallyHiddenInput type="file" />
      </Button>
      <p className="mx-4 ">{value}</p>
    </div>
  );
}
