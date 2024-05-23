import React from "react";
import SerialNumber from "./ComponentsAdd/SerialNumber";
import Brand from "./ComponentsAdd/Brand";
import WarantyExpDate from "./ComponentsAdd/WarantyExpDate";
import FullBatteryCapacity from "./ComponentsAdd/FullBatteryCapacity";
import CurrentBatteryCapacity from "./ComponentsAdd/CurrentBatteryCapacity";
import DiskPerformance from "./ComponentsAdd/DiskPerformance";
import FullBatteryCapacityDate from "./ComponentsAdd/FullBatteryCapacityDate";
import CurrentBatteryCapacityDate from "./ComponentsAdd/CurrentBatteryCapacityDate";
import DiskPerformanceDate from "./ComponentsAdd/DiskPerformanceDate";
import Spec from "./ComponentsAdd/Spec";
import Status from "./ComponentsAdd/Status";
import Image from "./ComponentsAdd/Image";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { Link } from "react-router-dom";

function AddLaptop() {
  const handleSubmit = (event) => {
    event.preventDefault();

    if (driverStatus && section) {
      axios
        .post(import.meta.env.VITE_API_USER_PORT + `/postdriver`, {
          name: name,
          surName: surName,
          phone: phone,
          status: driverStatus,
          projectId: section,
          idCard: idCard,
        })
        .then((response) => {
          console.log("response", response);
          if (response.statusText === "OK") {
            toast.success("เพิ่มข้อมูลสำเร็จ");
            navigate("/driverdetails");
          }
        })
        .catch((err) => {
          toast.error("เพิ่มข้อมูลไม่สำเร็จ");
        });
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold my-6">Add a laptop.</h1>
      <div className="my-20 space-y-10 flex flex-col">
        <div className="flex space-x-36">
          <SerialNumber />
          <Brand />
        </div>
        <div className="flex space-x-36">
          <WarantyExpDate />
          <FullBatteryCapacity />
        </div>
        <div className="flex space-x-36">
          <CurrentBatteryCapacity />
          <DiskPerformance />
        </div>
        <div className="flex space-x-36">
          <FullBatteryCapacityDate />
          <CurrentBatteryCapacityDate />
        </div>
        <div className="flex space-x-36">
          <DiskPerformanceDate />
          <Spec />
        </div>
        <div className="flex ">
          <Status />
        </div>
        <div>
          {" "}
          <Image />
        </div>
      </div>
      <hr className="my-6" />
      <div className="space-x-8">
        <Button variant="contained" startIcon={<SendIcon />}>
          Submit
        </Button>
        <Link to="/">
          <Button variant="outlined">Cancel</Button>
        </Link>
      </div>
    </div>
  );
}

export default AddLaptop;
