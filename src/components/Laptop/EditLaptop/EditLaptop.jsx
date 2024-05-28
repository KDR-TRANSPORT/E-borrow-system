import React, { useEffect, useState } from "react";

import Button from "@mui/material/Button";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import SaveIcon from "@mui/icons-material/Save";
import LoadingButton from "@mui/lab/LoadingButton";
import CircularProgress from "@mui/material/CircularProgress";

import BrandEdit from "./ComponentsEdit/BrandEdit";
import {
  addSingleImageLabtopData,
  editLabtopData,
  getSingleLabtopsData,
} from "../functions/data";
import SerialNumberEdit from "./ComponentsEdit/SerialNumberEdit";
import FullBatteryCapacityEdit from "./ComponentsEdit/FullBatteryCapacityEdit";
import CurrentBatteryCapacityEdit from "./ComponentsEdit/CurrentBatteryCapacityEdit";
import DiskPerformanceEdit from "./ComponentsEdit/DiskPerformanceEdit";
import StatusEdit from "./ComponentsEdit/StatusEdit";
import SpecEdit from "./ComponentsEdit/SpecEdit";
import WarantyExpDateEdit from "./ComponentsEdit/WarantyExpDateEdit";
import ImageEdit from "./ComponentsEdit/ImageEdit";
import Alert from "@mui/material/Alert";

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
    "picture[]": "",
  });

  const [newImageFile, setNewImageFile] = useState(null);
  const [newImageSuccess, setNewImageSuccess] = useState("");

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

    setIsloading(true);

    const formDataNew = {};
    for (const key in formData) {
      if (key !== "picture[]" && key !== "picture") {
        formDataNew[key] = formData[key];
      }
    }

    console.log("formDataNew", formDataNew);

    try {
      await editLabtopData(id, formDataNew).then((res) => {
        console.log("res", res);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setNewImageFile(selectedFile);
    setFormData({
      ...formData,
      ["picture[]"]: selectedFile,
    });
  };

  const handleDateChange = (formattedDate) => {
    setFormData({ ...formData, warrantyexpirationdate: formattedDate });
  };

  const handleSubmitNewImage = (e) => {
    e.preventDefault();
    setIsloading(true);
    if (!newImageFile && formData["picture[]"]) {
      Swal.fire({
        title: "Warning",
        text: "คุณไม่ได้เลือกรูปภาพใหม่",
        icon: "warning",
        confirmButtonText: "OK",
      });
      setIsloading(false);

      return;
    }
    if (!newImageFile && !formData["picture[]"]) {
      Swal.fire({
        title: "Warning",
        text: "กรุณาเลือกรูปภาพ",
        icon: "warning",
        confirmButtonText: "OK",
      });
      setIsloading(false);

      return;
    }

    addSingleImageLabtopData(id, formData)
      .then((res) => {
        console.log("res image", res);
        setNewImageSuccess("Edited a new image sucessfully !");

        setTimeout(() => {
          setNewImageSuccess("");
        }, 5000);

        getSingleData();
      })
      .catch((err) => console.log("err", err));
    setIsloading(false);
  };

  console.log("newFileimage", newImageFile);
  console.log("formData", formData["picture[]"]);

  return (
    <div className="mx-16">
      <h1 className="text-2xl font-bold my-6">Edit the laptop.</h1>
      <hr></hr>
      <div className="flex items-center">
        <form onSubmit={handleSubmit}>
          <div className="mt-10  space-y-10 flex flex-col">
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
        <div className="flex flex-col items-center space-y-10 max-w-[3400px]  rounded-lg   ml-[14rem] translate-y-[1rem]">
          {isLoading ? (
            <CircularProgress />
          ) : (
            <img
              src={`http://192.168.0.145:8080/uploads/${formData["picture[]"]}`}
              alt={`${
                newImageFile
                  ? "New image has been prepared"
                  : formData["picture[]"]
              }`}
              className="h-[400px] object-cover border-2 border-black"
            />
          )}
          {newImageSuccess && (
            <div className="h-7 flex justify-center absolute top-[23.5rem] items-center rounded-lg">
              <Alert severity="success">{newImageSuccess}</Alert>
            </div>
          )}

          <div className=" flex items-center space-x-10  py-8">
            {" "}
            <ImageEdit
              onChange={handleFileChange}
              value={formData["picture[]"]}
              setNewImageFile={setNewImageFile}
              newImageFile={newImageFile}
            />
            <LoadingButton
              color="primary"
              onClick={(e) => handleSubmitNewImage(e)}
              loading={isLoading}
              loadingPosition="start"
              startIcon={<SaveIcon />}
              variant="contained"
              size="smal"
            >
              <span>Save</span>
            </LoadingButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditLaptop;
