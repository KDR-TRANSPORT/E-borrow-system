import React, { useEffect, useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import SaveIcon from "@mui/icons-material/Save";
import {
  editEquipmentsData,
  getSingleEquipmentData,
  getMarkedEquipmentData,
} from "../functions/data";

import DateEdit from "./EditComponents/DateEdit";
import EmployeeBranchIdEdit from "./EditComponents/EmployeeBranchIdEdit";
import EmployeeDeptEdit from "./EditComponents/EmployeeDeptEdit";
import EmployeeIdEdit from "./EditComponents/EmployeeIdEdit";
import EmployeeNameEdit from "./EditComponents/EmployeeNameEdit";
import EmployeePhoneEdit from "./EditComponents/EmployeePhoneEdit";
import EmployeeRankEdit from "./EditComponents/EmployeeRankEdit";
import BorrowedList from "./EditComponents/BorrowedList";

function EditEquipment() {
  const navigate = useNavigate();
  const [isLoading, setIsloading] = useState(false);
  const { id } = useParams();
  const [formData, setFormData] = useState({
    date: "",
    employee_id: "",
    employee_name: "",
    employee_phone: "",
    employee_rank: "",
    employee_dept: "",
    branch_id: null,
  });
  const [markedData, setMarkedData] = useState([]);

  const getSingleData = () => {
    getSingleEquipmentData(id).then((res) => {
      setFormData((prevData) => ({
        ...prevData,
        date: res.data.data.date,
        employee_id: res.data.data.employee_id,
        employee_name: res.data.data.employee_name,
        employee_phone: res.data.data.employee_phone,
        employee_rank: res.data.data.employee_rank,
        employee_dept: res.data.data.employee_dept,
        branch_id: res.data.data.branch_id,
      }));
    });
  };
  const getMarkedData = () => {
    getMarkedEquipmentData(id)
      .then((res) => {
        console.log("MarkedData", res.data.data);
        setMarkedData(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getSingleData();
    getMarkedData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsloading(true);
    try {
      editEquipmentsData(formData, id).then((res) => {
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
    console.log("xxxxxxx", typeof formData.branch_id);

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

  const handleDateChange = (formattedDate) => {
    setFormData({ ...formData, date: formattedDate });
  };

  console.log("fromData", formData);

  return (
    <div className="mx-16">
      <h1 className="text-2xl font-bold my-6">Edit an equipment.</h1>
      <hr></hr>
      <form onSubmit={handleSubmit}>
        <div className="mt-20 mb-10   space-y-10 flex flex-col">
          <div className="flex">
            {" "}
            <DateEdit value={formData.date} onDateChange={handleDateChange} />
          </div>
          <div className="flex space-x-24">
            {" "}
            <EmployeeIdEdit
              value={formData.employee_id}
              onChange={handleChange}
            />
            <EmployeeNameEdit
              value={formData.employee_name}
              onChange={handleChange}
            />
          </div>
          <div className="flex space-x-24">
            {" "}
            <EmployeePhoneEdit
              value={formData.employee_phone}
              onChange={handleChange}
            />
            <EmployeeRankEdit
              value={formData.employee_rank}
              onChange={handleChange}
            />
          </div>
          <div className="flex space-x-24">
            {" "}
            <EmployeeDeptEdit
              value={formData.employee_dept}
              onChange={handleChange}
            />
            <EmployeeBranchIdEdit
              value={formData.branch_id}
              onChange={handleChange}
            />
          </div>
          <div>
            <BorrowedList
              markedData={markedData}
              setMarkedData={setMarkedData}
              getMarkedData={getMarkedData}
              id={id}
              getSingleData={getSingleData}
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

export default EditEquipment;
