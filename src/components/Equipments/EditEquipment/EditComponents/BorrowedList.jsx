import React, { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import axios from "axios";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CloseIcon from "@mui/icons-material/Close";
export default function BorrowedList({
  markedData,
  getMarkedData,
  id,
  getSingleData,
  setIsloading,
  isLoading,
}) {
  const [newItems, setNewItems] = useState([]);
  const [deviceName, setDeviceName] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [inputs, setInputs] = useState([
    // {
    //   device_name: "",
    //   serial_number: "",
    //   return_status: false,
    //   borrow_id: Number(id),
    // },
  ]);
  const [returnedDate, setReturnedDate] = useState("");
  const [editId, setEditID] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentDate, setCurrentDate] = useState("");
  const [returnStatus, setReturnStatus] = useState(null);

  useEffect(() => {
    const getCurrentDate = () => {
      const date = new Date();
      const yy = String(date.getFullYear()).slice(0); // Last two digits of year
      const mm = String(date.getMonth() + 1).padStart(2, "0"); // Month is zero-based
      const dd = String(date.getDate()).padStart(2, "0");
      return `${yy}-${mm}-${dd}`;
    };
    setReturnedDate(getCurrentDate());
    setCurrentDate(getCurrentDate());
  }, []);

  const handleAddInput = () => {
    setInputs([
      ...inputs,
      {
        device_name: "",
        serial_number: "",
        return_status: false,
        borrow_id: Number(id),
      },
    ]);
  };

  const handleRemoveInput = (index) => {
    const updatedInputs = inputs.filter((_, idx) => idx !== index);
    setInputs(updatedInputs);
  };

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;

    let updatedInputs;
    if (name === "device_name" && value === "") {
      // ถ้าเลือก "อื่นๆ" ให้สร้างฟิลด์ใหม่ที่ให้กรอกข้อความ
      updatedInputs = inputs.map((input, idx) =>
        idx === index ? { ...input, [name]: value } : input
      );
    } else {
      updatedInputs = inputs.map((input, idx) =>
        idx === index ? { ...input, [name]: value } : input
      );
    }
    setInputs(updatedInputs);
  };

  const validatedInputs = inputs.map((input) => {
    return {
      ...input,
      serial_number:
        input.serial_number.trim() === "" ? "???" : input.serial_number,
      device_name: input.device_name.trim() === "" ? "???" : input.device_name,
    };
  });

  // เพิ่มช่องใหม่ 1 ช่อง
  const handleSubmit = async () => {
    setIsloading(true);
    try {
      const response = await axios.post(
        "http://192.168.0.145:8080/api/borrowdevicearrays",
        validatedInputs
      );
      console.log(response.data);
      setNewItems([...newItems, ...inputs]);
      // Clear inputs after submitting
      setInputs([
        {
          device_name: "",
          serial_number: "",
          return_status: false,
          borrow_id: id,
        },
      ]);
      setInputs([]);
      getMarkedData();
      getSingleData();
      setIsloading(false);
    } catch (error) {
      console.error("Error submitting data:", error);
      setIsloading(false);
    }
  };

  // เพิ่มช่องใหม่ 4 ช่อง default
  const getDefaultMarkedData = async () => {
    const defaultData = [
      {
        borrow_id: id,
        device_name: "Laptop",
        serial_number: "",
        return_status: 0,
        return_date: "",
      },
      {
        borrow_id: id,
        device_name: "Adaptor",
        serial_number: "",
        return_status: 0,
        return_date: "",
      },
      {
        borrow_id: id,
        device_name: "Mouse",
        serial_number: "",
        return_status: 0,
        return_date: "",
      },
      {
        borrow_id: id,
        device_name: "Bag",
        serial_number: "",
        return_status: 0,
        return_date: "",
      },
    ];

    try {
      const response = await axios.post(
        "http://192.168.0.145:8080/api/borrowdevicearrays",
        defaultData
      );
      setNewItems([...newItems, ...defaultData]);
      getMarkedData();
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const returnedSubmit = async (e, item) => {
    const { device_name, serial_number, return_date, id } = item;

    let submissionData = {};
    // กรณีต้องการเปลี่ยนเป็นคืนแล้ว
    if (item.return_status === 0) {
      submissionData = {
        device_name,
        serial_number,
        return_status: 1,
        return_date: currentDate,
        id,
      };
    } else if (item.return_status === 1) {
      // กรณีต้องการเปลี่ยนเป็นยังไม่คืน
      submissionData = {
        device_name,
        serial_number,
        return_status: 0,
        return_date: "1993-12-05",
        id,
      };
    }

    try {
      Swal.fire({
        title: `ต้องการแก้ไขการคืนของ (${device_name}, SN-${serial_number})
          ใช่หรือไม่ ?`,
        icon: "question",
        showCancelButton: true,
      })
        .then(async (res) => {
          if (res.isConfirmed) {
            const response = await axios.put(
              `http://192.168.0.145:8080/api/borrowdevices/${id}`,
              submissionData
            );
            console.log(response.data);
            await getMarkedData();
          }
        })
        .catch((error) => {
          Swal.fire({
            title: "Fail",
            icon: "error",
          });
          console.error("Error:", error);
        });
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const editBorrowedDevices = async (e, item) => {
    const { id, device_name, return_status, serial_number } = item;
    // Prepare the submit data
    const submitData = {
      id: id,
      serial_number: serialNumber || serial_number,
      device_name: deviceName || device_name,
      return_status: return_status,
      return_date: returnedDate,
    };

    console.log("submitData", submitData);

    try {
      const response = await axios.put(
        `http://192.168.0.145:8080/api/borrowdevicearrays`,
        [submitData]
      );
      console.log(response.data);
      await getSingleData();
      await getMarkedData();

      setIsEditing(false);
      // Clear inputs after submitting
      setInputs([]);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const handleEditClick = async (e, itemId, serialNumber) => {
    e.preventDefault();
    setIsEditing((prevIsEditing) => !prevIsEditing);
    setEditID(itemId);
  };

  // จัดการ datePickter
  const handleChange = (value) => {
    const year = value.$y;
    const month = String(value.$M + 1).padStart(2, "0");
    const day = String(value.$D).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    setReturnedDate(formattedDate);
  };

  return (
    <div>
      {markedData.length === 0 && (
        <Button
          onClick={getDefaultMarkedData}
          variant="contained"
          startIcon={<AddIcon />}
        >
          เพิ่มอุปกรณ์(4)
        </Button>
      )}
      <div className="flex items-center space-x-4 mt-10">
        {" "}
        <h1 className="font-bold">รายการที่ยืม</h1>
        <IconButton aria-label="delete" size="small">
          <AddCircleIcon
            fontSize="small"
            onClick={handleAddInput}
            color="primary"
          />
        </IconButton>
      </div>

      {markedData.map((item, idx) => {
        return (
          <>
            <div
              key={idx}
              className="grid grid-cols-[25%_25%_40%]  space-x-10 "
            >
              <div className="flex items-center ">
                {editId === item.id && isEditing ? (
                  <div className="flex mt-4">
                    <span className="mt-2 mr-2">{idx + 1}.</span>
                    <TextField
                      id="standard-basic"
                      variant="outlined"
                      size="small"
                      name="device_name"
                      label="Device name"
                      // value={serialNumber}
                      defaultValue={item.device_name}
                      onChange={(e) => setDeviceName(e.target.value)}
                    />
                  </div>
                ) : (
                  <div className="flex space-x-2 items-start mt-6    ">
                    <span>{idx + 1}. </span>{" "}
                    <p className="	text-wrap max-w-[300px] break-all">
                      {" "}
                      {item.device_name}
                    </p>
                  </div>
                )}
              </div>
              <div className="">
                {editId === item.id && isEditing ? (
                  <TextField
                    id="standard-basic"
                    variant="outlined"
                    size="small"
                    sx={{ marginTop: "16px" }}
                    name="serial_number"
                    label="Serial number"
                    defaultValue={item.serial_number}
                    onChange={(e) => setSerialNumber(e.target.value)}
                  />
                ) : (
                  <div className="flex space-x-2 mt-6 ">
                    <span className="font-semibold">S/N: </span>{" "}
                    <p className="text-wrap max-w-[300px] break-all">
                      {item.serial_number}
                    </p>
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-4 mt-3">
                {item.return_status === 0 ? (
                  <Button
                    onClick={(e) => returnedSubmit(e, item)}
                    disabled={editId === item.id && isEditing}
                    sx={{ backgroundColor: "#f36c60" }}
                    size="small"
                  >
                    {" "}
                    <p className="">คืน</p>
                  </Button>
                ) : (
                  <Button
                    onClick={(e) => returnedSubmit(e, item)}
                    disabled={editId === item.id && isEditing}
                    sx={{
                      backgroundColor: "#87EA1D",
                    }}
                    size="small"
                  >
                    {" "}
                    <p className="">คืน</p>
                  </Button>
                )}
                <p className="underline underline-offset-8">
                  {item.return_date ? (
                    <p className="">{item.return_date}</p>
                  ) : (
                    <p className="mr-[5.2rem]"></p>
                  )}
                </p>
                {editId === item.id && isEditing ? (
                  <div className="flex space-x-2 ml-6">
                    <Button
                      onClick={(e) => editBorrowedDevices(e, item)}
                      startIcon={<SaveAsIcon />}
                      variant="contained"
                      color="primary"
                      sx={{ marginLeft: 10 }}
                    >
                      บันทึก
                    </Button>
                    <Button
                      onClick={() => setIsEditing(false)}
                      variant="outlined"
                    >
                      ยกเลิก
                    </Button>
                  </div>
                ) : (
                  <div className="">
                    <Button
                      onClick={(e) => {
                        handleEditClick(e, item.id, item.serial_number);
                      }}
                      startIcon={<EditIcon />}
                      sx={{
                        padding: 1,
                        marginLeft: 10,
                      }}
                      color="primary"
                    >
                      แก้ไข
                    </Button>
                  </div>
                )}
              </div>
            </div>
            <hr className="w-[65%] my-2" />
          </>
        );
      })}
      <div className="my-4">
        {/* <h2 className="font-bold">เพิ่มใหม่</h2> */}
        {inputs.map((input, idx) => {
          // console.log("input device_name", input.device_name);

          return (
            <div key={idx} className="flex items-center space-x-8 my-2">
              <FormControl sx={{ width: 180 }}>
                <InputLabel id="demo-simple-select-label">
                  เลือกอื่นๆ
                </InputLabel>

                <Select
                  labelId="demo-simple-select-label"
                  label="เลือกอื่นๆ..."
                  name="device_name"
                  id={`device_name-${idx}`}
                  onChange={(e) => handleInputChange(idx, e)}
                  size="small"
                  defaultValue="" // ตั้งค่า value เป็น "เปลี่ยน Laptop" เป็นค่าเริ่มต้น
                >
                  {" "}
                  <MenuItem value="เปลี่ยน Laptop">เปลี่ยน Laptop</MenuItem>
                  <MenuItem value="เปลี่ยน Adaptor">เปลี่ยน Adaptor</MenuItem>
                  <MenuItem value="เปลี่ยน Mouse">เปลี่ยน Mouse</MenuItem>
                  <MenuItem value="เปลี่ยน Bag">เปลี่ยน Bag</MenuItem>
                  <MenuItem value="">อื่นๆ</MenuItem>
                </Select>
              </FormControl>

              {input.device_name !== "เปลี่ยน Laptop" &&
                input.device_name !== "เปลี่ยน Adaptor" &&
                input.device_name !== "เปลี่ยน Mouse" &&
                input.device_name !== "เปลี่ยน Bag" && (
                  <TextField
                    id={`other_device-${idx}`}
                    variant="outlined"
                    size="small"
                    name="device_name"
                    label="ชื่ออุปกรณ์"
                    onChange={(e) => handleInputChange(idx, e)}
                  />
                )}
              {input.device_name !== "" && (
                <>
                  <TextField
                    id={`serial_number-${idx}`}
                    variant="outlined"
                    size="small"
                    name="serial_number"
                    label="หมายเลขเครื่อง"
                    value={input.serial_number}
                    onChange={(e) => handleInputChange(idx, e)}
                  />

                  <div className="p-1 bg-red-400 cursor-pointer rounded-md">
                    <CloseIcon
                      fontSize="small"
                      onClick={() => handleRemoveInput(idx)}
                      sx={{ color: "white" }}
                    />
                  </div>
                </>
              )}
            </div>
          );
        })}
        {inputs.length !== 0 &&
          inputs.every((item) => item.device_name !== "") && (
            <Button
              onClick={handleSubmit}
              variant="contained"
              sx={{ marginTop: 2 }}
            >
              เพิ่ม
            </Button>
          )}
      </div>
    </div>
  );
}
