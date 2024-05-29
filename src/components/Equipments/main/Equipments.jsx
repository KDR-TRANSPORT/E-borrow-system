import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import clsx from "clsx";
import { DataGrid } from "@mui/x-data-grid";
import Swal from "sweetalert2";
import { getEquipmentsData } from "../functions/data";
import { RiDeleteBin6Line, RiEdit2Line } from "react-icons/ri";
import Button from "@mui/material/Button";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

function Equipments() {
  const [allDataAll, setAlldataAll] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  async function getDataAll() {
    try {
      getEquipmentsData().then((response) => {
        setAlldataAll(response.data.data);
      });
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    setIsLoading(true);
    getDataAll();
  }, []);

  const handleEdit = (e, id) => {
    e.preventDefault();
    navigate(`/editequipment/${id}`);
  };

  async function Delete(e, id, borrow_number_id) {
    e.preventDefault();
    console.log("id", id);
    Swal.fire({
      title: `Cofirm to delete this item (S/N:${borrow_number_id} ) ?`,
      icon: "question",
      showCancelButton: true,
    }).then((res) => {
      if (res.isConfirmed) {
        axios
          .delete(`http://192.168.0.145:8080/api/laptops/${id}`)
          .then((res) => {
            console.log(res);
            Swal.fire({
              title: "Deleted Successfully",
              icon: "success",
            });
            getDataAll();
          })
          
      }
    });
  }

  const columns = [
    { field: "id", headerName: "ID", width: 50 },
    {
      field: "borrow_number_id",
      headerName: "No.",
      width: 100,
      editable: false,
    },
    {
      field: "employee_id",
      headerName: "Employee ID",
      width: 110,
      editable: false,
    },

    {
      field: "employee_name",
      headerName: "Name",
      width: 150,
      editable: false,
    },
    {
      field: "employee_phone",
      headerName: "Phone",
      width: 150,
      editable: false,
    },
    {
      field: "employee_rank",
      headerName: "Rank",
      width: 150,
      editable: false,
    },

    {
      field: "employee_dept",
      headerName: "Dept",
      width: 150,
      editable: false,
    },
    {
      field: "branch_id",
      headerName: "Branch ID",
      width: 100,
      editable: false,
    },

    {
      field: "branch_name",
      headerName: "Branch",
      width: 120,
      editable: false,
    },

    {
      field: "created_at",
      headerName: "Created Date",
      width: 140,
      editable: false,
      valueGetter: (params) => {
        // ใช้ `substring` กับค่าจากแถว (`row`) ของคอลัมน์ `date`
        const dateValue = params;
        return dateValue ? dateValue.substring(0, 10) : ""; // ใช้ substring และตรวจสอบว่าค่าของ date ไม่ใช่ undefined หรือ null
      },
    },

    {
      field: "",
      headerName: "",
      width: 80,
      filterable: false,
      renderCell: (params) => {
        return (
          <div className="flex space-x-2 my-4">
            <Link href="#">
              <RiEdit2Line
                size={18}
                className="text-sky-400"
                onClick={(e) => handleEdit(e, params.id)}
              />
            </Link>
            <Link href="#">
              <RiDeleteBin6Line
                className="text-red-400"
                size={18}
                onClick={(e) => Delete(e, params.id, params.row.borrow_number_id)}
              />
            </Link>
          </div>
        );
      },
    },
  ];
  return (
    <div>
      <h1 className="text-2xl font-bold mt-6 mb-12">
        Borrowing Return Equipments
      </h1>
      <div className="my-6">
        <Link to="/addequipment">
          {" "}
          <Button variant="contained" startIcon={<AddIcon />}>
            Add equipment
          </Button>
        </Link>
      </div>
      <Box
        sx={{
          height: 550,
        }}
      >
        <DataGrid
          rows={allDataAll}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 100,
              },
            },
          }}
          rowHeight={50}
          pageSizeOptions={[5]}
          disableRowSelectionOnClick
          getRowId={(row) => row.id}
          localeText={{ noRowsLabel: "No Information..." }}
        />
      </Box>
    </div>
  );
}

export default Equipments;
