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

export default function ImageEdit({
  onChange,
  value,
  newImageFile,
  setNewImageFile,
}) {
  const handleChange = (e) => {
    onChange(e);
  };

  return (
    <>
      <div className="flex items-end justify-center space-x-2 ">
        <Button
          component="label"
          variant="contained"
          startIcon={<CloudUploadIcon />}
          color="success"
          size="small"
          sx={{ width: 150 }}
        >
          อัพโหลดรูปภาพ
          <VisuallyHiddenInput
            type="file"
            name="picture[]"
            accept="image/*"
            onChange={(e) => handleChange(e)}
          />
        </Button>
        <div className="w-[200px] break-words">
          <p className="text-xs">{newImageFile ? newImageFile.name : value}</p>
        </div>
      </div>
    </>
  );
}
