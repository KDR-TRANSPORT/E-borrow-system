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
import SaveIcon from "@mui/icons-material/Save";
import { addLabtopData } from "../functions/data";

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
    status: "",
    spec: "",
  });

  const handleSubmit = async (event) => {
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

    const formDataNew = new FormData();
    for (const key in formData) {
      formDataNew.append(key, formData[key]);
    }
    console.log("formData:", formData);

    try {
      addLabtopData(formDataNew).then((res) => {
        console.log(res);
        if (res.status === 200) {
          Swal.fire({
            position: "top",
            icon: "success",
            title: "Your information has been saved",
            showConfirmButton: true,
          });
        }

        navigate("/");
      });
    } catch (error) {
      console.error("Error:", error);

      Swal.fire({
        title: "Error!",
        text: "Fail to submit data.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }

    setIsloading(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      "picture[]": file,
    }));
  };

  console.log(formData);
  const handleDateChange = (formattedDate) => {
    setFormData({ ...formData, warrantyexpirationdate: formattedDate });
  };

  return (
    <div className="mx-16">
      <h1 className="text-2xl font-bold my-6">เพิ่มข้อมูลโน้ตบุ้ค</h1>
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
          <div className="translate-y-[-1rem]">
            {" "}
            <Image onChange={handleFileChange} />
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
            <span>บันทึก</span>
          </LoadingButton>
          <Link to="/">
            <Button variant="outlined">ยกเลิก</Button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default AddLaptop;
