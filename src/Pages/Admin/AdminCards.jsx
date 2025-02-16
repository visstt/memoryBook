import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Typography,
  Grid2,
} from "@mui/material";
import React, { useEffect } from "react";
import useHeroStore from "../../store/heroStore";

export default function AdminCards() {
  const { hero, getHero } = useHeroStore();

  useEffect(() => {
    getHero();
  }, [getHero]);

  // Функция для удаления записи
  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `https://geois2.orb.ru/api/resource/8860/feature/${id}`,
        {
          method: "DELETE",
          headers: {
            Accept: "*/*",
            Authorization: "Basic " + btoa("hackathon_36:hackathon_36_25"), // Кодируем логин и пароль в Base64
          },
        }
      );

      if (response.ok) {
        alert("Удалено успешно!");
        getHero(); // Обновляем список после удаления
      } else {
        alert("Ошибка при удалении");
      }
    } catch (error) {
      console.error("Ошибка при удалении:", error);
      alert("Ошибка при выполнении запроса");
    }
  };

  return (
    <Container>
      <Box sx={{ mt: 1, mb: 5 }}>
        <Box sx={{ mb: 5 }}></Box>
        <Box>
          <Box
            sx={{
              //   display: "grid",
              //   gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              //   gap: 20,
              display: "flex",
              flexDirection: "collumn",
              gap: "30px",
            }}
          >
            <Grid2
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 4, md: 4 }}
            >
              {hero && hero.length > 0 ? (
                hero.map((item) => (
                  <Grid2 item key={item.id} xs={6} sm={4} md={3}>
                    <Card
                      key={item.id}
                      sx={{
                        width: "100%",
                        background: "#F5FCFF",
                        borderRadius: "0px",
                        border: "none",
                        display: "flex",
                        p: 1,
                        flexDirection: "column",
                      }}
                    >
                      <CardContent
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <CardMedia
                          component="img"
                          image={`/image.png`}
                          sx={{
                            width: "200px",
                            height: "200px",
                            objectFit: "cover",
                          }}
                          loading="lazy"
                        />
                        <Typography
                          sx={{
                            fontSize: { xs: "2rem", md: "3rem" },
                            fontWeight: "bold",
                            mt: 2,
                            textAlign: "center",
                          }}
                        >
                          {item.fields.fio}
                        </Typography>
                        <Typography
                          color="black"
                          sx={{
                            fontSize: { xs: "1rem", md: "1.25rem" },
                            mt: 1,
                          }}
                        >
                          {item.fields.years}
                        </Typography>
                        <Typography
                          sx={{
                            color: "#737373",
                            fontSize: { xs: "1.2rem", md: "1.5rem" },
                            mt: 2,
                            textAlign: "center",
                          }}
                        >
                          {item.fields.info}
                        </Typography>
                        <Button
                          sx={{
                            width: "100%",
                            borderRadius: "0px",
                            backgroundColor: "#E01D04",
                            mt: 4,
                            fontSize: "20px",
                          }}
                          variant="contained"
                          onClick={() => handleDelete(item.id)}
                        >
                          Удалить
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid2>
                ))
              ) : (
                <Typography>Нет данных для отображения</Typography>
              )}
            </Grid2>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
