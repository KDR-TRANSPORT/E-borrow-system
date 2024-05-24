import React, { useEffect, useState } from "react";

import Button from "@mui/material/Button";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import SaveIcon from "@mui/icons-material/Save";
import LoadingButton from "@mui/lab/LoadingButton";
import BrandEdit from "./ComponentsEdit/BrandEdit";
import { editLabtopData, getSingleLabtopsData } from "../functions/data";
import SerialNumberEdit from "./ComponentsEdit/SerialNumberEdit";
import FullBatteryCapacityEdit from "./ComponentsEdit/FullBatteryCapacityEdit";
import CurrentBatteryCapacityEdit from "./ComponentsEdit/CurrentBatteryCapacityEdit";
import DiskPerformanceEdit from "./ComponentsEdit/DiskPerformanceEdit";
import StatusEdit from "./ComponentsEdit/StatusEdit";
import SpecEdit from "./ComponentsEdit/SpecEdit";
import WarantyExpDateEdit from "./ComponentsEdit/WarantyExpDateEdit";
import ImageEdit from "./ComponentsEdit/ImageEdit";

function EditLaptop() {
  const { id } = useParams();
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
    "picture[]": null,
  });

  const getSingleData = () => {
    getSingleLabtopsData(id).then((res) => {
      setFormData((prevData) => ({
        ...prevData,
        serial_number: res.data.data.serial_number,
        brand: res.data.data.brand,
        warrantyexpirationdate: res.data.data.warrantyexpirationdate,
        fullbatterycapacity: res.data.data.fullbatterycapacity,
        currentbatterycapacity: res.data.data.currentbatterycapacity,
        diskperformance: res.data.data.diskperformance,
        status: res.data.data.status,
        spec: res.data.data.spec,
        "picture[]": res.data.data.picture,
      }));
    });
  };
  console.log("formData", formData);
  useEffect(() => {
    getSingleData();
  }, []);

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
      await editLabtopData(id, formDataNew).then((res) => {
        console.log("Response:", res.data);
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Your information has been saved",
          showConfirmButton: true,
        });
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

  console.log("formdata", formData);

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

  const handleDateChange = (formattedDate) => {
    setFormData({ ...formData, warrantyexpirationdate: formattedDate });
  };

  return (
    <div className="mx-16">
      <h1 className="text-2xl font-bold my-6">Edit the laptop.</h1>
      <hr></hr>
      <div className="flex items-center">
        <form onSubmit={handleSubmit}>
          <div className="mt-20  space-y-10 flex flex-col">
            <div className="flex space-x-36">
              <SerialNumberEdit
                value={formData.serial_number}
                onChange={handleChange}
              />
              <BrandEdit value={formData.brand} onChange={handleChange} />
            </div>
            <div className="flex space-x-36">
              <FullBatteryCapacityEdit
                value={formData.fullbatterycapacity}
                onChange={handleChange}
              />
              <CurrentBatteryCapacityEdit
                value={formData.currentbatterycapacity}
                onChange={handleChange}
              />
            </div>
            <div className="flex space-x-36">
              <DiskPerformanceEdit
                value={formData.diskperformance}
                onChange={handleChange}
              />
              <StatusEdit value={formData.status} onChange={handleChange} />
            </div>
            <div className="flex space-x-[136px]">
              {" "}
              <SpecEdit value={formData.spec} onChange={handleChange} />
              <WarantyExpDateEdit
                value={formData.warrantyexpirationdate}
                onDateChange={handleDateChange}
              />
            </div>
            <div className="translate-y-[-2rem]">
              {" "}
              <ImageEdit onChange={handleFileChange} value={formData.picture} />
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
        <div className="border-2 max-w-[400px] max-h-[400px] rounded-lg my-12 ml-[14rem]">
          <img
            src={`http://192.168.0.145:8080/uploads/${formData["picture[]"]}`}
            alt={formData["picture[]"]}
            className="max-h-[400px] object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default EditLaptop;
