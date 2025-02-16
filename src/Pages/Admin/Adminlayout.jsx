import { Box } from "@mui/material";
import React from "react";
import AddSoldier from "../Admin/AddsSoldier/AddSoldier";
import AdminCards from "./AdminCards";

export default function Adminlayout() {
  return (
    <Box>
      <AddSoldier />

      <h1 style={{ textAlign: "center", margin: "30px", fontSize: "40px" }}>
        Герои:
      </h1>
      <AdminCards />
    </Box>
  );
}
