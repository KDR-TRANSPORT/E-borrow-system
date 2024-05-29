import React, { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import axios from "axios";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import Swal from "sweetalert2";

export default function BorrowedList({
  markedData,
  setMarkedData,
  getMarkedData,
  id,
  getSingleData,
}) {
  const [newItems, setNewItems] = useState([]);
  const [serialNumber, setSerialNumber] = useState("");
  const [inputs, setInputs] = useState([
    {
      device_name: "",
      serial_number: "",
      return_status: false,
      borrow_id: Number(id),
    },
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
    const updatedInputs = inputs.map((input, idx) =>
      idx === index ? { ...input, [name]: value } : input
    );
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

  const handleSubmit = async () => {
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
      getMarkedData();
      getSingleData();
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const returnedSubmit = async (e, item) => {
    const { device_name, serial_number, return_date, id } = item;
    const submissionData = {
      device_name,
      serial_number,
      return_status: 1,
      return_date: currentDate,
      id,
    };
    console.log("submissionData", submissionData);

    try {
      Swal.fire({
        title: `ยืนยันการคืนของ (${device_name}, SN-${serial_number})
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
            title: "Unable to delete",
            icon: "error",
          });
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
      device_name: device_name,
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
      setInputs([
        {
          device_name: "",
          serial_number: "",
          return_status: false,
          borrow_id: null,
        },
      ]);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const handleEditClick = async (e, itemId, serialNumber) => {
    e.preventDefault();
    console.log("itemId:", itemId); // Log ค่า itemId
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
  console.log(";dsad", returnStatus);

  return (
    <div>
      <h1 className="font-bold">รายงานที่ยืม</h1>
      {markedData.map((item, idx) => {
        return (
          <div key={idx} className="flex items-center space-x-8">
            <div>
              <span>{idx + 1}.</span> {item.device_name}:
            </div>
            <div className="">
              {editId === item.id && isEditing ? (
                <TextField
                  id="standard-basic"
                  variant="outlined"
                  size="small"
                  name="serial_number"
                  // value={serialNumber}
                  defaultValue={item.serial_number}
                  onChange={(e) => setSerialNumber(e.target.value)}
                />
              ) : (
                <span>{item.serial_number}</span>
              )}
            </div>
            <div className="flex items-center">
              <Button
                onClick={(e) => returnedSubmit(e, item)}
                disabled={
                  item.return_status === 1 || (editId === item.id && isEditing)
                }
              >
                {item.return_status === 0 ? (
                  <p className="text-red-500">ยังไม่คืน</p>
                ) : (
                  <p className="text-green-500">คืนแล้ว</p>
                )}
              </Button>

              <p>{item.return_date}</p>

              {editId === item.id && isEditing ? (
                <>
                  <Button onClick={(e) => editBorrowedDevices(e, item)}>
                    บันทึก
                  </Button>
                  <Button onClick={() => setIsEditing(false)}>ยกเลิก</Button>
                </>
              ) : (
                <Button
                  onClick={(e) => {
                    handleEditClick(e, item.id, item.serial_number);
                  }}
                >
                  แก้ไข
                </Button>
              )}
            </div>
          </div>
        );
      })}
      <div className="my-4">
        <h2 className="font-bold">เพิ่มใหม่</h2>
        {inputs.map((input, idx) => (
          <div key={idx} className="flex items-center space-x-8 my-2">
            <TextField
              id={`device_name-${idx}`}
              variant="outlined"
              size="small"
              name="device_name"
              label="Device Name"
              value={input.device_name}
              onChange={(e) => handleInputChange(idx, e)}
            />
            <TextField
              id={`serial_number-${idx}`}
              variant="outlined"
              size="small"
              name="serial_number"
              label="Serial Number"
              value={input.serial_number}
              onChange={(e) => handleInputChange(idx, e)}
            />
            <Button onClick={() => handleRemoveInput(idx)}>ลบ</Button>
          </div>
        ))}
        <Button onClick={handleAddInput}>เพิ่ม</Button>
        <Button onClick={handleSubmit}>ส่ง</Button>
      </div>
    </div>
  );
}
