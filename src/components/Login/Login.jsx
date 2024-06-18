import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../../context/UserAuthContext";
import LoginWithGoogle from "./LoginWithGoogle";
import { toast } from "react-toastify";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { logIn } = useUserAuth();

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await logIn(email, password);
      toast.success("Signed in successfully");
      navigate("/");
    } catch (err) {
      handleAuthError(err);
    }
  };

  const handleAuthError = (err) => {
    let errorMessage = "Login failed";
    
    if (err.code === "auth/wrong-password") {
      errorMessage = "กรอกรหัสผ่านไม่ถูกต้อง";
    } else if (err.code === "auth/user-not-found") {
      errorMessage = "อีเมลนี้ไม่ได้ลงทะเบียน";
    } else {
      errorMessage = "เกิดข้อผิดพลาดในการล็อกอิน";
    }
    setError(errorMessage);
    toast.error(errorMessage, {
      position: "top-center",
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#fba819]">
      <div className="w-full max-w-md bg-white p-8 shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">
              Email address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Email address"
              className="w-full px-3 py-2 border border-gray-300 rounded"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              className="w-full px-3 py-2 border border-gray-300 rounded"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Sign In
            </button>
          </div>
        </form>
        <div className="mt-4 text-center">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </div>
        <LoginWithGoogle />
      </div>
    </div>
  );
}

export default Login;
