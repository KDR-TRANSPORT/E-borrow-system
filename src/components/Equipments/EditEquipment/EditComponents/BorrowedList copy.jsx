import React, { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import axios from "axios";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import { Edit } from "@mui/icons-material";

export default function BorrowedList({
  markedData,
  getMarkedData,
  id,
  getSingleData,
}) {
  const [markedInfo, setMarkedInfo] = useState(markedData);

  // เพิ่มช่องใหม่
  const [inputs, setInputs] = useState([
    {
      device_name: "",
      serial_number: "",
      return_status: false,
      borrow_id: Number(id),
    },
  ]);

  // ส่งไป post แบบหลายตัว
  const [editData, setEditData] = useState(
    Array(markedData.length).fill({
      id: "",
      serial_number: "",
      device_name: "",
      return_date: "",
      return_status: null,
    })
  );

  useEffect(() => {
    setMarkedInfo(markedData);

    setEditData(
      markedData.map((item) => ({
        id: item.id,
        serial_number: item.serial_number,
        device_name: item.device_name,
        return_date: item.return_date,
        return_status: item.return_status,
      }))
    );
  }, [markedData]);

  const [newItems, setNewItems] = useState([]);
  const [returnedDate, setReturnedDate] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentDate, setCurrentDate] = useState("");
  const [returnStatus, setReturnStatus] = useState(null);
  const [showAddButton, setShowAddButton] = useState(true);

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
  console.log("validatedInputs", validatedInputs);

  // เพิ่มช่องใหม่ 1 ช่อง
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
      console.log("ddefautl", response.data.data);
      setNewItems([...newItems, ...defaultData]);
      getMarkedData();
      setShowAddButton(false);
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
  const handleEditDataChange = (e, idx, item) => {
    e.preventDefault();
    const { name, value } = e.target;
    console.log("value", value, idx);
    console.log("device_name", item.device_name, idx);

    setEditData((prevEditData) => {
      const updatedEditData = [...prevEditData];
      updatedEditData[idx] = {
        ...updatedEditData[idx],
        id: item.id,
        serial_number: value || "",
        device_name: value || "",
        return_date: item.return_date || "",
        return_status: item.return_status,
      };
      return updatedEditData;
    });
  };

  console.log("editData", editData);
  const editBorrowedDevices = async (e) => {
    e.preventDefault();
    try {
      // ตรวจสอบและแก้ไข editData ก่อนที่จะส่งไปยังเซิร์ฟเวอร์
      const readyData = editData.map((item) => {
        // ถ้า return_date เป็น null ให้เปลี่ยนเป็นค่าว่าง
        if (item.return_date === null || item.return_date === "") {
          item.return_date = "1993-12-05";
        }
        // ถ้า serial_number เป็น null ให้เปลี่ยนเป็นค่าว่าง
        if (item.serial_number === null) {
          item.serial_number = "";
        }
        // if (item.return_status === 0) {
        //   item.return_status= 1;
        // }
        return item;
      });

      console.log("readyData", readyData);
      const response = await axios.put(
        `http://192.168.0.145:8080/api/borrowdevicearrays`,
        readyData
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
      setEditData([]);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const handleEditClick = async (e) => {
    e.preventDefault();
    setIsEditing((prevIsEditing) => !prevIsEditing);
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
      {showAddButton && <Button onClick={getDefaultMarkedData}>Add</Button>}
      <h1 className="font-bold">รายการที่ยืม</h1>
      {isEditing ? (
        <>
          <Button onClick={editBorrowedDevices}>บันทึก</Button>
          <Button onClick={() => setIsEditing(false)}>ยกเลิก</Button>
        </>
      ) : (
        <Button
          onClick={(e) => {
            handleEditClick(e);
          }}
        >
          แก้ไข
        </Button>
      )}
      {markedData.map((item, idx) => {
        return (
          <div key={idx} className="flex items-center space-x-8">
            <div>
              {isEditing ? (
                <>
                  <span>1.</span>
                  <TextField
                    id="standard-basic"
                    variant="outlined"
                    size="small"
                    name="device_name"
                    // value={serialNumber}
                    defaultValue={item.device_name}
                    onChange={(e) => handleEditDataChange(e, idx, item)}
                  />
                </>
              ) : (
                <span>
                  {idx + 1}. {item.device_name}
                </span>
              )}
            </div>
            <div className="">
              {isEditing ? (
                <TextField
                  id="standard-basic"
                  variant="outlined"
                  size="small"
                  name="serial_number"
                  // value={serialNumber}
                  defaultValue={item.serial_number}
                  onChange={(e) => handleEditDataChange(e, idx, item)}
                />
              ) : (
                <span>{item.serial_number}</span>
              )}
            </div>
            <div className="flex items-center">
              <Button
                onClick={(e) => returnedSubmit(e, item)}
                disabled={isEditing}
              >
                {item.return_status === 0 ? (
                  <p className="text-red-500">ยังไม่คืน</p>
                ) : (
                  <p className="text-green-500">คืนแล้ว</p>
                )}
              </Button>

              <p>{item.return_date}</p>
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

// const handleChange = (index, value) => {
//   setTextFields((prevState) => {
//     const updatedFields = [...prevState];
//     updatedFields[index] = { ...updatedFields[index], detail: value };
//     return updatedFields;
//   });
// };
