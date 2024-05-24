import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RiDeleteBin6Line, RiEdit2Line } from "react-icons/ri";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import { InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import clsx from "clsx";
import { DataGrid } from "@mui/x-data-grid";
import { FaEye } from "react-icons/fa";
import SetModal from "../Modal/SetModal";
import { getLabtopsData } from "../functions/data";

export default function LaptopInfo() {
  const [allDataAll, setAlldataAll] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  async function getDataAll() {
    try {
      getLabtopsData().then((response) => {
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
  console.log("alldata", allDataAll);

  const handleImageClick = (imageURL) => {
    setSelectedImage(imageURL);
    // แสดง modal ที่นี่
  };

  async function Delete(e, id) {
    e.preventDefault();
    Swal.fire({
      title: `Cofirm to delete this driver ?`,
      icon: "question",
      showCancelButton: true,
    }).then((res) => {
      if (res.isConfirmed) {
        axios
          .delete(import.meta.env.VITE_API_USER_PORT + `/deletedriver/${id}`)
          .then((res) => {
            console.log(res);
            Swal.fire({
              title: "Deleted Successfully",
              icon: "success",
            });
            getDriverData();
          })
          .catch((res) => {
            console.log(res);
            Swal.fire({
              title: "Unable to delete",
              icon: "error",
            });
          });
      }
    });
  }

  const columns = [
    { field: "id", headerName: "ID", width: 50 },
    {
      field: "serial_number",
      headerName: "Serial No.",
      width: 140,
      editable: false,
    },
    {
      field: "created_at",
      headerName: "Created Date",
      width: 110,
      editable: false,
      valueGetter: (params) => {
        // ใช้ `substring` กับค่าจากแถว (`row`) ของคอลัมน์ `date`
        const dateValue = params;
        return dateValue ? dateValue.substring(0, 10) : ""; // ใช้ substring และตรวจสอบว่าค่าของ date ไม่ใช่ undefined หรือ null
      },
    },
    {
      field: "picture",
      headerName: "Image",
      width: 80,

      editable: false,
      renderCell: (params) => {
        console.log(params.value);

        return (
          <>
            <FaEye
              className="mt-4 text-yellow-400 cursor-pointer"
              onClick={() =>
                handleImageClick(
                  `http://192.168.0.145:8080/uploads/${params.value}`
                )
              }
            />
          </>
        );
      },
    },
    {
      field: "brand",
      headerName: "Brand",
      width: 140,
      editable: false,
    },
    {
      field: "warrantyexpirationdate",
      headerName: "Warranty Exp.",
      width: 140,
      editable: false,
    },
    {
      field: "fullbatterycapacity",
      headerName: "Full Bat. Cap.",
      width: 140,
      editable: false,
    },

    {
      field: "currentbatterycapacity",
      headerName: "Current Bat. Cap.",
      width: 140,
      editable: false,
    },
    {
      field: "diskperformance",
      headerName: "Disk Perf.",
      width: 140,
      editable: false,
    },

    {
      field: "fullbatterycapacitydate",
      headerName: "Full Bat. Cap. Date",
      width: 140,
      editable: false,
    },
    {
      field: "currentbatterycapacitydate",
      headerName: "Current Bat. Cap. Date",
      width: 170,
      editable: false,
    },
    {
      field: "diskperformancedate",
      headerName: "Disk Perf. Date",
      width: 140,
      editable: false,
    },
    {
      field: "spec",
      headerName: "Spec",
      width: 180,
      editable: false,
    },

    {
      field: "status",
      headerName: "Status",
      width: 140,
      editable: false,
    },

    {
      field: "action",
      headerName: "Action",
      width: 80,
      filterable: false,
      renderCell: (params) => {
        console.log(params);
        return (
          <div className="flex space-x-2 my-4">
            <Link href="#">
              <RiEdit2Line size={18} className="text-sky-400" />
            </Link>
            <Link href="#">
              <RiDeleteBin6Line
                className="text-red-400"
                size={18}
                // onClick={() => Delete(params)}
              />
            </Link>
          </div>
        );
      },
    },
  ];
  return (
    <div className="">
      <h1 className="text-2xl font-bold mt-6 mb-12">All Laptops</h1>
      <div className="my-6">
        <Link to="/addlaptop">
          {" "}
          <Button variant="contained" startIcon={<AddIcon />}>
            Add laptop
          </Button>
        </Link>
      </div>
      <Box
        sx={{
          height: 550,
          width: "100%",
          // "& .active": {
          //   backgroundColor: "#ffde59",
          //   color: "#1a3e72",
          //   fontWeight: "600",
          // },
          // "& .inactive": {
          //   backgroundColor: "rgb(239 68 68)",
          //   color: "black",
          //   fontWeight: "600",
          // },
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
      <SetModal
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
      />
    </div>
  );
}
