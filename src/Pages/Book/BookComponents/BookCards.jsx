import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  CircularProgress,
  Alert,
  Pagination,
} from "@mui/material";
import axios from "axios";
import LeftbarFilter from "./LeftbarFilter";

export default function BookCards() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://geois2.orb.ru/api/resource/8860/feature/",
          {
            headers: {
              Authorization: "Basic " + btoa("hackathon_36:hackathon_36_25"),
              Accept: "*/*",
            },
            withCredentials: true,
          }
        );
        setData(response.data);
      } catch (err) {
        setError("Ошибка при загрузке данных: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Box sx={{ mt: 1, mb: 5 }}>
      <Box sx={{ mb: 5 }}>
        <LeftbarFilter />
      </Box>

      {/* Блок загрузки */}
      {loading && (
        <Box display="flex" justifyContent="center" mt={3}>
          <CircularProgress />
        </Box>
      )}

      {/* Ошибка загрузки */}
      {error && (
        <Box display="flex" justifyContent="center" mt={3}>
          <Alert severity="error">{error}</Alert>
        </Box>
      )}

      {/* Карточки только если есть данные */}
      {!loading && !error && data.length > 0 && (
        <Grid container spacing={{ xs: 2, md: 3 }}>
          {data.map((item) => (
            <Grid item key={item.id} xs={12} sm={6} md={4}>
              <Card sx={{ maxWidth: "100%", background: "#F5FCFF", p: 1 }}>
                <CardContent sx={{ display: "flex", flexDirection: "column" }}>
                  <Typography
                    sx={{ fontSize: "1.5rem", fontWeight: "bold", mb: 1 }}
                  >
                    {item.fields.fio}
                  </Typography>
                  <Typography sx={{ color: "black", mb: 1 }}>
                    {item.fields.years}
                  </Typography>
                  <Typography sx={{ color: "#737373", fontSize: "1rem" }}>
                    {item.fields.info}
                  </Typography>
                  <Typography
                    sx={{ color: "#737373", fontSize: "1rem", mt: 1 }}
                  >
                    {item.fields.kontrakt}
                  </Typography>
                  <Typography
                    sx={{ color: "#737373", fontSize: "1rem", mt: 1 }}
                  >
                    {item.fields.nagrads}
                  </Typography>
                  <Button
                    sx={{
                      mt: 2,
                      backgroundColor: "#E01D04",
                      fontSize: "16px",
                    }}
                    variant="contained"
                  >
                    Подробнее
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Пагинация (если есть данные) */}
      {!loading && !error && data.length > 0 && (
        <Pagination sx={{ mt: 4, display: "flex", justifyContent: "center" }} />
      )}
    </Box>
  );
}
