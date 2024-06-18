import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
function PageNotFound() {
  const user = useSelector((state) => state.user); // ตัวอย่างเช็คสถานะการล็อกอินี

  console.log("isLoggedIn", user?.loggedIn);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <div className="bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Page Not Found
        </h2>
        <p className="text-gray-600 text-center mb-4">
          The page you are looking for does not exist.
        </p>
        <div className="flex justify-center">
          <Link
            to="/"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PageNotFound;
