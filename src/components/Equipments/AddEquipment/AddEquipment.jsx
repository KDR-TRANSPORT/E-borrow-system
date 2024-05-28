import React, { useState } from "react";

import LoadingButton from "@mui/lab/LoadingButton";

import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import SaveIcon from "@mui/icons-material/Save";
import { addEquipmentsData } from "../functions/data";
import Date from "./AddComponents/Date";
import EmployeeId from "./AddComponents/EmployeeId";
import EmployeeName from "./AddComponents/EmployeeName";
import EmployeePhone from "./AddComponents/EmployeePhone";
import EmployeeRank from "./AddComponents/EmployeeRank";
import EmployeeDept from "./AddComponents/EmployeeDept";
import EmployeeBranchId from "./AddComponents/EmployeeBranchId";

function AddEquipment() {
  const navigate = useNavigate();
  const [isLoading, setIsloading] = useState(false);

  const [formData, setFormData] = useState({
    date: "",
    employee_id: "",
    employee_name: "",
    employee_phone: "",
    employee_rank: "",
    employee_dept: "",
    branch_id: null,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsloading(true);
    try {
      addEquipmentsData(formData).then((res) => {
        console.log(res);
        if (res.status === 200) {
          Swal.fire({
            position: "top",
            icon: "success",
            title: "Your information has been saved",
            showConfirmButton: true,
          });
        }

        navigate("/equipments");
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
    if (name === "branch_id") {
      setFormData({
        ...formData,
        [name]: Number(value),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  console.log(formData);
  const handleDateChange = (formattedDate) => {
    setFormData({ ...formData, date: formattedDate });
  };


  return (
    <div className="mx-16">
      <h1 className="text-2xl font-bold my-6">Add an equipment.</h1>
      <hr></hr>
      <form onSubmit={handleSubmit}>
        <div className="mt-20 mb-10   space-y-10 flex flex-col">
          <div className="flex">
            {" "}
            <Date value={formData.date} onDateChange={handleDateChange} />
          </div>
          <div className="flex space-x-24">
            {" "}
            <EmployeeId value={formData.employee_id} onChange={handleChange} />
            <EmployeeName
              value={formData.employee_name}
              onChange={handleChange}
            />
          </div>
          <div className="flex space-x-24">
            {" "}
            <EmployeePhone value={formData.phone} onChange={handleChange} />
            <EmployeeRank
              value={formData.employee_dept}
              onChange={handleChange}
            />
          </div>
          <div className="flex space-x-24">
            {" "}
            <EmployeeDept
              value={formData.employee_rank}
              onChange={handleChange}
            />
            <EmployeeBranchId
              value={formData.branch_id}
              onChange={handleChange}
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
          <Link to="/equipments">
            <Button variant="outlined">Cancel</Button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default AddEquipment;
