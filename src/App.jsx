import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import LaptopInfo from "./components/Laptop/Main/LaptopInfo";
import Equipments from "./components/Equipments/Equipments";
import Layout from "./shared/Layout";
import AddLaptop from "./components/Laptop/AddLaptop/AddLaptop";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>

          <Route index path="/" element={<LaptopInfo />}></Route>
          <Route index path="/addlaptop" element={<AddLaptop />}></Route>

          <Route path="/equipments" element={<Equipments />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
