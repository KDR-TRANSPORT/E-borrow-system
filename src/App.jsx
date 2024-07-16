import { Navigate, Route, Routes } from "react-router-dom";
import LaptopInfo from "./components/Laptop/Main/LaptopInfo";
import Equipments from "./components/Equipments/main/Equipments";
import Layout from "./shared/Layout";
import AddLaptop from "./components/Laptop/AddLaptop/AddLaptop";
import EditLaptop from "./components/Laptop/EditLaptop/EditLaptop";
import AddEquipment from "./components/Equipments/AddEquipment/AddEquipment";
import EditEquipment from "./components/Equipments/EditEquipment/EditEquipment";
import Login from "./components/Login/Login";
import ProtectedRoute from "./auth/ProtectedRoute.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PageNotFound from "./PageNotFound.jsx";

function App() {
  return (
    <>
      <ToastContainer position="top-center" closeOnClick autoClose={5000} />

      <Routes>
        {" "}
        <Route exact path="/login" element={<Login />}></Route>
        <Route path="*" element={<PageNotFound />} />
        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          {" "}
          <Route index path="/" element={<LaptopInfo />}></Route>
          <Route path="/addlaptop" element={<AddLaptop />}></Route>
          <Route path="/editlaptop/:id" element={<EditLaptop />}></Route>
          <Route path="/equipments" element={<Equipments />}></Route>
          <Route path="/addequipment" element={<AddEquipment />}></Route>
          <Route path="/editequipment/:id" element={<EditEquipment />}></Route>
          <Route path="/markedequipment" element={<EditEquipment />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
