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
import { Grid, Typography } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";

function App() {
  const [data, setData] = useState([]);
  const [latestData, setLatestData] = useState({});

  const createData = (name, value, desc) => {
    return { name, value, desc };
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
        createData("Time", date, "Time of the latest sensor reading"),
        createData(
          "Light Data (Environment)",
          currentData.ldrLingkungan,
          "LDR Data of the environment, lower values means more light"
        ),
        createData(
          "Light Data (Lamp)",
          currentData.ldrLampu,
          "LDR Data of the lamp, should be low when the environment high value/dark"
        ),
        createData(
          "Temperature",
          currentData.suhu,
          "Temperature of the environment in Celcius"
        ),
        createData(
          "Weather",
          currentData.cuaca,
          "Weather condition of the environment"
        ),
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
    if (data.length == 0) return [];
    const rows = countAverage(data);
    return [
      createData(
        "Light Data (Environment)",
        rows.ldrLingkungan,
        "LDR Data of the environment, lower values means more light"
      ),
      createData(
        "Light Data (Lamp)",
        rows.ldrLampu,
        "LDR Data of the lamp, should be low when the environment high value/dark"
      ),
      createData(
        "Temperature",
        rows.suhu,
        "Temperature of the environment in Celcius"
      ),
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
      <div
        style={{ marginBottom: "20px", marginTop: "20px", textAlign: "center" }}
      >
        <Typography variant="h4">Smart Streetlight Monitoring</Typography>
        <Typography variant="h5">
          Tugas Besar Rekayasa Sistem dan Teknologi Informasi
        </Typography>
        <Typography variant="h5">K2 Kelompok 7</Typography>
      </div>
      <div
        style={{
          padding: "20px",
          margin: "auto",
          width: "50%",
          textAlign: "center",
        }}
      >
        <Grid marginLeft={100} container gridRow={1} spacing={3}>
          <Typography onClick={() => window.location.reload()}>
            Refresh Data
          </Typography>
          <RefreshIcon onClick={() => window.location.reload()} />
        </Grid>
      </div>
      <div
        style={{
          padding: "20px",
          margin: "auto",
          width: "50%",
          textAlign: "center",
        }}
      >
        <Typography marginY={2} variant="h6">
          Latest Data
        </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 500 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Metrics</strong>
                </TableCell>
                <TableCell align="left">
                  <strong>Value</strong>
                </TableCell>
                <TableCell align="left">
                  <strong>Description</strong>
                </TableCell>
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
                  <TableCell align="left">{row.value}</TableCell>
                  <TableCell align="left">{row.desc}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <br />
        <Typography marginY={2} variant="h6">
          Average Last 10 Minutes
        </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 500 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Metrics</strong>
                </TableCell>
                <TableCell align="left">
                  <strong>Value</strong>
                </TableCell>
                <TableCell align="left">
                  <strong>Description</strong>
                </TableCell>
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
                  <TableCell align="left">{row.value}</TableCell>
                  <TableCell align="left">{row.desc}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default App;
