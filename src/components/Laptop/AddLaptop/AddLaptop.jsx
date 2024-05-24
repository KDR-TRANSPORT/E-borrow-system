import React, { useState } from "react";
import SerialNumber from "./ComponentsAdd/SerialNumber";
import Brand from "./ComponentsAdd/Brand";
import WarantyExpDate from "./ComponentsAdd/WarantyExpDate";
import FullBatteryCapacity from "./ComponentsAdd/FullBatteryCapacity";
import CurrentBatteryCapacity from "./ComponentsAdd/CurrentBatteryCapacity";
import DiskPerformance from "./ComponentsAdd/DiskPerformance";
import LoadingButton from "@mui/lab/LoadingButton";

import Spec from "./ComponentsAdd/Spec";
import Status from "./ComponentsAdd/Status";
import Image from "./ComponentsAdd/Image";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import SaveIcon from "@mui/icons-material/Save";

function AddLaptop() {
  const navigate = useNavigate();
  const [isLoading, setIsloading] = useState(false);

  const [formData, setFormData] = useState({
    serial_number: "",
    brand: "",
    warrantyexpirationdate: "",
    fullbatterycapacity: "",
    currentbatterycapacity: "",
    diskperformance: "",
    fullbatterycapacitydate: "2023-04-12",
    currentbatterycapacitydate: "2023-04-12",
    diskperformancedate: "2023-04-12",
    status: "",
    spec: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    for (const key in formData) {
      if (!formData[key]) {
        Swal.fire({
          title: "Warning",
          text: "กรุณากรอกค่าให้ครบ",
          icon: "warning",
          confirmButtonText: "OK",
        });
        return;
      }
    }
    if (!formData["picture[]"]) {
      Swal.fire({
        title: "Warning",
        text: "กรอกกรุณา Upload รูปภาพ",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return;
    }

    setIsloading(true);
    axios
      .post(`http://192.168.0.145:8080/api/laptops`, {
        formData,
      })
      .then((response) => {
        console.log("response", response);
        if (response.statusText === "OK") {
          Swal.fire({
            position: "top",
            icon: "success",
            title: "Your infomation has been saved",
            showConfirmButton: true,
          });
          navigate("/");
        }
      })
      .catch((err) => {
        Swal.fire({
          title: "Error!",
          text: "Fail to submit data.",
          icon: "error",
          confirmButtonText: "OK",
        });
      });

    setIsloading(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e, fileName) => {
    setFormData((prevData) => ({
      ...prevData,
      "picture[]": fileName,
    }));
  };

  const handleDateChange = (formattedDate) => {
    setFormData({ ...formData, warrantyexpirationdate: formattedDate });
  };


  console.log("formData", formData);

  return (
    <div className="mx-16">
      <h1 className="text-2xl font-bold my-6">Add a laptop.</h1>
      <hr></hr>
      <form onSubmit={handleSubmit}>
        <div className="mt-20  space-y-10 flex flex-col">
          <div className="flex space-x-36">
            <SerialNumber
              value={formData.serial_number}
              onChange={handleChange}
            />
            <Brand value={formData.brand} onChange={handleChange} />
          </div>
          <div className="flex space-x-36">
            <FullBatteryCapacity
              value={formData.fullbatterycapacity}
              onChange={handleChange}
            />
            <CurrentBatteryCapacity
              value={formData.currentbatterycapacity}
              onChange={handleChange}
            />
          </div>
          <div className="flex space-x-36">
            <DiskPerformance
              value={formData.diskperformance}
              onChange={handleChange}
            />
            <Status value={formData.status} onChange={handleChange} />
          </div>
          <div className="flex space-x-[136px]">
            {" "}
            <Spec value={formData.spec} onChange={handleChange} />
            <WarantyExpDate
              value={formData.warrantyexpirationdate}
              onDateChange={handleDateChange}
            />
          </div>
          <div className="flex space-x-32"></div>
          <div className="translate-y-[-2rem]">
            {" "}
            <Image value={formData["picture[]"]} onChange={handleFileChange} />
          </div>
        </div>
        <hr className="mb-6" />
        <div className="space-x-6">
          <LoadingButton
            color="primary"
            loading={isLoading}
            loadingPosition="start"
            startIcon={<SaveIcon />}
            variant="contained"
            type="submit"
          >
            <span>Save</span>
          </LoadingButton>

          <Link to="/">
            <Button variant="outlined">Cancel</Button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default AddLaptop;
