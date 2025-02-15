import { Box, Container, Typography } from "@mui/material";
import React from "react";
import BookCards from "./BookComponents/BookCards";

export default function BookLayout() {
  return (
    <Container>
      <Typography
        variant="h3"
        sx={{
          display: "flex",
          justifyContent: "center",
          fontWeight: "bold",
          color: "#000",
          mt: "20px",
        }}
      >
        Книга памяти
      </Typography>
      <BookCards />
    </Container>
  );
}
