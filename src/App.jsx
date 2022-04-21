import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function App() {
  const [data, setData] = useState([]);
  const [latestData, setLatestData] = useState({});

  const createData = (name, value) => {
    return { name, value };
  };

  const createLatestRow = () => {
    let currentData;
    let fetched = false;
    for (let i = 0; i < latestData.length; i++) {
      currentData = latestData[i];
      fetched = true;
    }
    if (fetched) {
      let date = new Intl.DateTimeFormat("id-ID", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }).format(currentData.time.$date);
      return [
        createData("Time", date),
        createData("Light Data (Environment)", currentData.ldrLingkungan),
        createData("Light Data (Lamp)", currentData.ldrLampu),
        createData("Temperature", currentData.suhu),
        createData("Weather", currentData.cuaca),
      ];
    } else return [];
  };

  const countAverage = (data) => {
    let sumLdrLingkungan = 0;
    let sumLdrLampu = 0;
    let sumSuhu = 0;
    let count = 0;
    for (let i = 0; i < data.length; i++) {
      sumLdrLingkungan += data[i].ldrLingkungan;
      sumLdrLampu += data[i].ldrLampu;
      sumSuhu += data[i].suhu;
      count++;
    }
    return {
      ldrLingkungan: sumLdrLingkungan / count,
      ldrLampu: sumLdrLampu / count,
      suhu: (sumSuhu / count).toFixed(2),
    };
  };

  const createAverageRow = () => {
    const rows = countAverage(data);
    return [
      createData("Light Data (Environment)", rows.ldrLingkungan),
      createData("Light Data (Lamp)", rows.ldrLampu),
      createData("Temperature", rows.suhu),
    ];
  };

  useEffect(() => {
    axios
      .get("https://reksti-smart-streetlight.herokuapp.com/10-data")
      .then((res) => {
        setData(res.data);
        // console.log(res.data);
      });
    axios
      .get("https://reksti-smart-streetlight.herokuapp.com/latest-data")
      .then((res) => {
        setLatestData(res.data);
        // console.log(res.data);
      });
  }, []);

  return (
    <div>
      <h1>Smart Street Light</h1>
      <TableContainer
        component={Paper}
        sx={{ width: "50%", alignItems: "center", justifyContent: "center" }}
      >
        <Table sx={{ minWidth: 500 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Metrics</TableCell>
              <TableCell align="right">Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {createLatestRow().map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br />
      <TableContainer
        component={Paper}
        sx={{ width: "50%", alignItems: "center", justifyContent: "center" }}
      >
        <Table sx={{ minWidth: 500 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Metrics</TableCell>
              <TableCell align="right">Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {createAverageRow().map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default App;
