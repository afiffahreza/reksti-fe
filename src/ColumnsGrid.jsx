import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function ColumnsGrid() {
  return (
    <Box>
      <Grid
        container
        direction="column"
        textAlign= "center"
        width = "50%"
      >
        <Grid item>
          <h3>Last Update</h3>
          <Item>Light Data (Environment) = {1000}</Item>
          <Item>Light Data (Lamp) = {1000}</Item>
          <Item>Weather = {"Cloudy"}</Item>
          <Item>Temperature = {}</Item>
          <Item>Time = {20.45}</Item>
        </Grid>

        <h3>Average 10 Minutes</h3>
        <Grid item>
          <Item>Light Data (Environment) = {1000}</Item>
          <Item>Light Data (Lamp) = {1000}</Item>
          <Item>Weather = {"Cloudy"}</Item>
          <Item>Temperature = {}</Item>
        </Grid>
      </Grid>
    </Box>
  );
}
