import React from "react";
// import fontAng from "./upceb.ttf";

import fontKanit from "./Kanit-Regular.ttf";
import logoKdr from "./logoKdr.png";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
  Font,
  Image,
} from "@react-pdf/renderer";

import {
  Table,
  TableCell,
  TableHeader,
  TableBody,
  DataTableCell,
} from "@propra/react-pdf-table";
import { Button } from "@mui/material";

Font.register({ family: "fontKanit", src: fontKanit });

const styles = StyleSheet.create({
  page: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#E4E4E4",
    fontFamily: "fontKanit",
    fontSize: "10px"

  },
  section: {
    marginHorizontal: 10,
    padding: 10,
    flexGrow: 1,

  },
  imageContainer: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  image: {
    width: 80,
    height: 80,
  },
  title: {
    textAlign: "center",
    padding: "5px",
    border: "2px",
    width: "300px",
    marginHorizontal: "auto",
  },
  date: {
    textAlign: "right",
    marginTop: "15px",
    marginRight: "50px",
  },
  name: {
    textAlign: "right",
    marginRight: "50px",
    marginTop: "15px",

  },
  position: {
    textAlign: "right",
    marginRight: "50px",
    marginTop: "15px",
  },
  purpose: {
    textAlign: "right",
    marginRight: "50px",
    marginTop: "15px",
  },
  place: {
    flexDirection: "row",
    marginTop: "15px",
    marginLeft: "55px",
  },
  box: {
    padding: "5px",
    border: "2px",
    marginRight: "2px",
    marginLeft: "8px",
  },
  tableContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "stretch", // Stretch to equal height
    marginTop: "20px",
  },
  table: {
    flex: 1, // Expand equally
    marginLeft: "8px",
  },
  tableTitle: {
    textAlign: "center",
    marginBottom: "10px",
  },
  tableHeaderCell: {
    minHeight: "20px",
    textAlign: "center", // จัดตำแหน่งข้อความให้อยู่กึ่งกลาง
    paddingTop: "5px",
    wordBreak: "break-all", // เพิ่ม line นี้เข้าไป
  },
  tableBodyCell: {
    minHeight: "20px",
    paddingTop: "5px",
    textAlign: "center",
    fontSize: "11px",
    wordBreak: "break-all", // เพิ่ม line นี้เข้าไป
  },

  condition: {
    marginTop: "25px",
    marginLeft: "70px",
  },
  conditionOne: {
    marginLeft: "105px",
    marginTop: "15px",
  },
  conditionTwo: {
    marginLeft: "105px",
    marginTop: "15px",
  },
  responsibility: {
    fontWeight: "bold",
    textDecoration: "underline",
  },
  awareness: {
    flexDirection: "row",
    marginLeft: "150px",
    marginTop: "15px",
    alignItems: "center",
  },
  signBorrowerOne: { marginLeft: "340px", marginTop: "10px" },
  signBorrowerTwo: {
    marginLeft: "375px",
    marginTop: "20px",
  },
  signBoxes: {
    flexDirection: "row",
    border: "2px",
    marginTop: "20px",
  },
  firstSignBox: {
    border: "1px",
    width: "50%",
  },

  firstSignBoxOne: {
    textAlign: "center",
    marginTop: "5px",
    marginBottom: "15px",
  },
  firstSignBoxTwo: {
    textAlign: "center",
    marginTop: "15px",
  },
  firstSignBoxThree: {
    textAlign: "center",
    marginTop: "15px",
  },
  firstSignBoxFour: {
    textAlign: "center",
    marginTop: "15px",
    marginBottom: "15px",
  },
  secondSignBox: {
    border: "1px",
    width: "50%",
  },
  secondSignBoxOne: {
    textAlign: "center",
    marginTop: "5px",
    marginBottom: "10px",
  },
  checkCorrection: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkerName: {
    textAlign: "center",
    marginTop: "15px",
  },
});

const MyDoc = ({ markedData }) => {
  const borrowedDevices = markedData.filter(
    (item) => !item.device_name.includes("เปลี่ยน")
  );
  const changedDevices = markedData.filter((item) =>
    item.device_name.includes("เปลี่ยน")
  );

  const borrowedDevicesWithIndex = borrowedDevices.map((item, idx) => ({
    ...item,
    index: idx + 1,
  }));
  const changedDevicesWithIndex = changedDevices.map((item, idx) => ({
    ...item,
    index: idx + 1,
  }));

  // Pad the tables with empty rows if needed
  const padTableWithEmptyRows = (tableData, numRows) => {
    const paddedTable = [...tableData];
    while (paddedTable.length < numRows) {
      paddedTable.push({
        index: paddedTable.length + 1,
        device_name: "",
        serial_number: "",
        return_status: null,
      });
    }
    return paddedTable;
  };

  // Determine the maximum number of rows between the two tables
  const maxRows = Math.max(borrowedDevicesWithIndex.length, 5);

  // Pad both tables with empty rows to match the maximum number of rows
  const paddedBorrowedDevices = padTableWithEmptyRows(
    borrowedDevicesWithIndex,
    maxRows
  );
  const paddedChangedDevices = padTableWithEmptyRows(
    changedDevicesWithIndex,
    5 // Ensure second table has 4 rows
  );
  // console.log("cdsad", paddedChangedDevices);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <View style={styles.imageContainer}>
            <Image src={logoKdr} style={styles.image} />
          </View>
          <Text style={styles.title}>แบบฟอร์มยืม-คนอุปกรณ์คอมพิวเตอร์</Text>
          <Text style={styles.date}>วันที่.................................................</Text>
          <Text style={styles.name}>
            ชื่อ-นามสกุล.......................................................................................................................
            เบอร์โทรศัพท์.......................................................................
          </Text>
          <Text style={styles.position}>
            ตำแหน่ง..........................................................................................................
            แผนก................................................................................................................
          </Text>
          <Text style={styles.purpose}>
            มีความประสงค์จะขอยืมพัสดุเพื่อ...................................................................................................................................................................................
          </Text>
          <View style={styles.place}>
            <Text>สถานที่ใช้งาน </Text>
            <Text style={styles.box}></Text>
            <Text>สำนักงานใหญ่่</Text>
            <Text style={styles.box}></Text>
            <Text>สำนักงานลาซาลล</Text>
            <Text style={styles.box}></Text>
            <Text>
              อื่นๆ.....................................................................................................
            </Text>
          </View>
          <View style={styles.tableContainer}>
            <View style={styles.table}>
              <Text style={styles.tableTitle}>ยืมอุปกรณ์</Text>
              <Table data={paddedBorrowedDevices}>
                <TableHeader>
                  {/* <TableCell style={styles.tableHeaderCell}>ลำดับบ</TableCell> */}
                  <TableCell style={styles.tableHeaderCell}>รายการ</TableCell>
                  <TableCell style={styles.tableHeaderCell}>
                    เลขครุภัณฑ์
                  </TableCell>
                  <TableCell style={styles.tableHeaderCell}>สถานะ</TableCell>
                </TableHeader>
                <TableBody>
                  {/* <DataTableCell
                    style={styles.tableBodyCell}
                    getContent={(r) => r.index}
                  /> */}
                  <DataTableCell
                    style={styles.tableBodyCell}
                    getContent={(r) => r.device_name}
                  />
                  <DataTableCell
                    style={styles.tableBodyCell}
                    getContent={(r) => (
                      <Text>
                        {r.serial_number}
                        {r.laptop_id ? ` (${r.laptop_id})` : ""}
                      </Text>
                    )}
                  />
                  <DataTableCell
                    style={styles.tableBodyCell}
                    getContent={(r) =>
                      r.return_status === 1
                        ? "คืนแล้ว"
                        : r.return_status === 0
                        ? "ยังไม่คืน"
                        : ""
                    }
                  />
                </TableBody>
              </Table>
            </View>
            <View style={styles.table}>
              <Text style={styles.tableTitle}>เปลี่ยนอุปกรณ์</Text>
              <Table data={paddedChangedDevices}>
                <TableHeader>
                  {/* <TableCell style={styles.tableHeaderCell}>ลำดับบ</TableCell> */}
                  <TableCell style={styles.tableHeaderCell}>รายการ</TableCell>
                  <TableCell style={styles.tableHeaderCell}>
                    เลขครุภัณฑ์
                  </TableCell>
                  <TableCell style={styles.tableHeaderCell}>สถานะ</TableCell>
                </TableHeader>
                <TableBody>
                  {/* <DataTableCell
                    style={styles.tableBodyCell}
                    getContent={(r) => r.index}
                  /> */}
                  <DataTableCell
                    style={styles.tableBodyCell}
                    getContent={(r) => r.device_name}
                  />
                  <DataTableCell
                    style={styles.tableBodyCell}
                    getContent={(r) => (
                      <Text>
                        {r.serial_number}
                        {r.laptop_id ? ` (${r.laptop_id})` : ""}
                      </Text>
                    )}
                  />
                  <DataTableCell
                    style={styles.tableBodyCell}
                    getContent={(r) =>
                      r.return_status === 1
                        ? "คืนแล้ว"
                        : r.return_status === 0
                        ? "ยังไม่คืน"
                        : ""
                    }
                  />
                </TableBody>
              </Table>
            </View>
          </View>
          <Text style={styles.condition}>
            ผู้ยืมควรอ่านทำความเข้าใจและโปรดตรวจสอบ ดังนี้้
          </Text>
          <Text style={styles.conditionOne}>
            1. ข้อมูลที่มีการบันทึกไว้ในอุปกรณ์ หากสูญหาย แผนกไอทีจะไม่รับผิดชอบ
          </Text>
          <Text style={styles.conditionOne}>
            2. หากอุปกรณ์ที่ยืมเกิดการชำรุดเสียหายหรือสูญหาย ผู้ยืมต้อง
            <Text style={styles.responsibility}>รับผิดชอบ</Text>ค่าเสียหาย
          </Text>
          <View style={styles.awareness}>
            {" "}
            <Text style={styles.box}></Text>
            <Text>รับทราบ</Text>
          </View>
          <Text style={styles.signBorrowerOne}>
            ลงชื่อ...............................................ผู้ยืม
          </Text>
          <Text style={styles.signBorrowerTwo}>
            (.........................................)
          </Text>
          <View style={styles.signBoxes}>
            <View style={styles.firstSignBox}>
              <Text style={styles.firstSignBoxOne}>ส่งคืนพัสดุ</Text>
              <Text style={styles.firstSignBoxTwo}>
                ลงชื่อ........................................ผู้ส่งคืน
              </Text>
              <Text style={styles.firstSignBoxThree}>
                (....................................................)
              </Text>
              <Text style={styles.firstSignBoxFour}>
                วันที่...................................
              </Text>
            </View>
            <View style={styles.secondSignBox}>
              {" "}
              <Text style={styles.secondSignBoxOne}>ตรวจสอบพัสดุ</Text>
              <View style={styles.checkCorrection}>
                {" "}
                <View style={styles.checkCorrection}>
                  {" "}
                  <Text style={styles.box}></Text>
                  <Text>ครบถ้วน</Text>
                </View>
                <View style={styles.checkCorrection}>
                  {" "}
                  <Text style={styles.box}></Text>
                  <Text>ไม่ครบถ้วน..........................</Text>
                </View>
              </View>
              <Text style={styles.checkerName}>
                ลงชื่อ.........................................ผู้ตรวจสอบ
              </Text>
              <Text style={styles.checkerName}>
                (.................................................)
              </Text>
              <Text style={styles.checkerName}>
                วันที่...............................................
              </Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default function MyDocument({ markedData }) {
  console.log("markedData", markedData);
  const markedDataWithIndex = markedData.map((item, idx) => ({
    ...item,
    index: idx + 1,
  }));
  return (
    <Button variant="contained" size="small" sx={{ marginLeft: "8px" }}>
      <PDFDownloadLink
        document={<MyDoc markedData={markedDataWithIndex} />}
        fileName="แบบฟอร์มยืม-คืนอุปกรณ์คอมพิวเตอร์.pdf"
      >
        PDF
      </PDFDownloadLink>
    </Button>
  );
}
