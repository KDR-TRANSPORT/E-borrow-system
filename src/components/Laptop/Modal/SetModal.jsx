import React from "react";
import Image from "./Image";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "full",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
};
export default function SetModal({ selectedImage, setSelectedImage }) {
  return (
    <Modal open={Boolean(selectedImage)} onClose={() => setSelectedImage(null)}>
      <Box sx={style}>
        {" "}
        <Image selectedImage={selectedImage}/>
      </Box>
    </Modal>
  );
}
