import React, { useState } from "react";
import LoginWithGoogle from "./LoginWithGoogle";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen  bg-gradient-to-r from-white to-[#fba819]">
      <div className="flex flex-col items-center w-full max-w-md bg-white p-8 shadow-md rounded-lg">
        <Avatar sx={{ bgcolor: "#fba819" }}>
          <LockOutlinedIcon />
        </Avatar>{" "}
        <h2 className="text-2xl font-semibold mb-4 text-center mt-6">Login</h2>
        <LoginWithGoogle />
      </div>
    </div>
  );
}

export default Login;
