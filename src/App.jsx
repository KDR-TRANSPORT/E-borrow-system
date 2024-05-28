import { Route, Routes } from "react-router-dom";
import LaptopInfo from "./components/Laptop/Main/LaptopInfo";
import Equipments from "./components/Equipments/main/Equipments";
import Layout from "./shared/Layout";
import AddLaptop from "./components/Laptop/AddLaptop/AddLaptop";
import EditLaptop from "./components/Laptop/EditLaptop/EditLaptop";
import AddEquipment from "./components/Equipments/AddEquipment/AddEquipment";
import EditEquipment from "./components/Equipments/EditEquipment/EditEquipment";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
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
