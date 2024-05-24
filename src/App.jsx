import { Route, Routes } from "react-router-dom";
import LaptopInfo from "./components/Laptop/Main/LaptopInfo";
import Equipments from "./components/Equipments/Equipments";
import Layout from "./shared/Layout";
import AddLaptop from "./components/Laptop/AddLaptop/AddLaptop";
import EditLaptop from "./components/Laptop/EditLaptop/EditLaptop";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route index path="/" element={<LaptopInfo />}></Route>
          <Route  path="/addlaptop" element={<AddLaptop />}></Route>
          <Route  path="/editlaptop/:id" element={<EditLaptop />}></Route>

          <Route path="/equipments" element={<Equipments />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
