import { signInWithPopup } from "firebase/auth";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth, googleProvider } from "../../firebase";
import { setUser, setError } from "../../store/userSlice";

export default function LoginWithGoogle() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state);
console.log('user', user);
  async function googleLogin() {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log(result);
      const userEmail = result.user.email;
      if (userEmail.endsWith("@kdr.co.th")) {
        dispatch(setUser(result.user));
        return result;
      } else {
        throw new Error("Invalid email domain");
      }
    } catch (error) {
      console.error("Error logging in with Google:", error);
      dispatch(setError(error.message)); // dispatch action setError เมื่อเกิดข้อผิดพลาด

      throw error;
    }
  }

  const handleGoogleLogin = async () => {
    try {
      const result = await googleLogin();
      if (result.user) {
        toast.success("User logged in successfully");
        navigate("/");
      }
    } catch (error) {
      if (error.message === "Invalid email domain") {
        toast.error("Login failed: You must use a @kdr.co.th email", {
          position: "top-center",
        });
      } else {
        // toast.error("Login failed: " + error.message, {
        //   position: "top-center",

        // });
        console.log('errt', error.message);
      }
    }
  };

  return (
    <div className="w flex justify-center mt-8 ">
      <div className="px-6 sm:px-0 max-w-sm">
        <button
          type="button"
          className="text-white w-full  bg-[#fba819] hover:bg-[#fba819]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between mr-2 mb-2"
          onClick={handleGoogleLogin}
        >
          <svg
            className="mr-2 -ml-1 w-4 h-4"
            aria-hidden="true"
            focusable="false"
            data-prefix="fab"
            data-icon="google"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 488 512"
          >
            <path
              fill="currentColor"
              d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
            ></path>
          </svg>
          Sign in with Google <div></div>
        </button>
      </div>
    </div>
  );
}
