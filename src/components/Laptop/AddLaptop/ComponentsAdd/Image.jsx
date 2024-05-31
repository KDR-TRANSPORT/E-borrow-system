import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

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

export default function Image({ onChange }) {
  const [fileName, setFileName] = React.useState("");

  const handleChange = (e) => {
    onChange(e);
    setFileName(e.target.files[0].name);
  };

  return (
    <div className="flex items-end space-x-2">
      <Button
        component="label"
        variant="contained"
        startIcon={<CloudUploadIcon />}
        color="success"
      >
        อัพโหลดรูปภาพ
        <VisuallyHiddenInput
          type="file"
          name="picture[]"
          onChange={(e) => handleChange(e)}
        />
      </Button>
      <p>{fileName}</p>
    </div>
  );
}
