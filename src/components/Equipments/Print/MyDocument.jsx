import React from "react";
import fontAng from "./upceb.ttf";
import moment from "moment/min/moment-with-locales";
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

Font.register({ family: "fontAng", src: fontAng });

const styles = StyleSheet.create({
  page: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#E4E4E4",
    fontFamily: "fontAng",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  imageContainer: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  image: {
    width: 100,
    height: 100,
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
    marginTop: "25px",
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
    marginLeft: "8px",
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
    height: 25, // ปรับความสูงตามที่ต้องการ
    textAlign: "center", // จัดตำแหน่งข้อความให้อยู่กึ่งกลาง
    paddingTop: "10px",
  },
  tableBodyCell: {
    height: 20, // ปรับความสูงตามที่ต้องการ
    paddingTop: "5px",    
    textAlign: "center",

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
          <Text style={styles.date}>วันที่............................</Text>
          <Text style={styles.name}>
            ชื่อ-นามสกุล..............................................................................
            เบอร์โทรศัพท์.....................
          </Text>
          <Text style={styles.position}>
            ตำแหน่ง...............................................................
            แผนก..................................................................
          </Text>
          <Text style={styles.purpose}>
            มีความประสงค์จะขอยืมพัสดุเพื่อ.....................................................................................................
          </Text>
          <View style={styles.place}>
            <Text>สถานที่ใช้งาน </Text>
            <Text style={styles.box}></Text>
            <Text>สำนักงานใหญ่่</Text>
            <Text style={styles.box}></Text>
            <Text>สำนักงานลาซาลล</Text>
            <Text style={styles.box}></Text>
            <Text>
              อื่นๆ.....................................................
            </Text>
          </View>
          <View style={styles.tableContainer}>
            <View style={styles.table}>
              <Text style={styles.tableTitle}>ยืมอุปกรณ์</Text>
              <Table data={paddedBorrowedDevices}>
                <TableHeader>
                  <TableCell style={styles.tableHeaderCell}>ลำดับบ</TableCell>
                  <TableCell style={styles.tableHeaderCell}>รายการ</TableCell>
                  <TableCell style={styles.tableHeaderCell}>
                    เลขครุภัณฑ์
                  </TableCell>
                  <TableCell style={styles.tableHeaderCell}>สถานะ</TableCell>
                </TableHeader>
                <TableBody>
                  <DataTableCell
                    style={styles.tableBodyCell}
                    getContent={(r) => r.index}
                  />
                  <DataTableCell
                    style={styles.tableBodyCell}
                    getContent={(r) => r.device_name}
                  />
                  <DataTableCell
                    style={styles.tableBodyCell}
                    getContent={(r) => r.serial_number}
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
                  <TableCell style={styles.tableHeaderCell}>ลำดับบ</TableCell>
                  <TableCell style={styles.tableHeaderCell}>รายการ</TableCell>
                  <TableCell style={styles.tableHeaderCell}>
                    เลขครุภัณฑ์
                  </TableCell>
                  <TableCell style={styles.tableHeaderCell}>สถานะ</TableCell>
                </TableHeader>
                <TableBody>
                  <DataTableCell
                    style={styles.tableBodyCell}
                    getContent={(r) => r.index}
                  />
                  <DataTableCell
                    style={styles.tableBodyCell}
                    getContent={(r) => r.device_name}
                  />
                  <DataTableCell
                    style={styles.tableBodyCell}
                    getContent={(r) => r.serial_number}
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
        fileName="somename.pdf"
      >
        PDF
      </PDFDownloadLink>
    </Button>
  );
}
