import React from "react";

function Image({ selectedImage }) {
  return (
    <img src={selectedImage} alt="Selected Image" className="object-cover" />
  );
}

export default Image;
