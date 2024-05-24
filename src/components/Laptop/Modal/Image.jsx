import React from "react";

function Image({ selectedImage }) {
  return (
    <img
      src={selectedImage}
      className="max-h-[700px] bject-cover"
      alt="Selected Image"
    />
  );
}

export default Image;
