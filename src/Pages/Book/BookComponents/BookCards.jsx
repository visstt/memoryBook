import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid2,
  Pagination,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import LeftbarFilter from "./LeftbarFilter";
import useHeroStore from "../../../store/heroStore";

export default function BookCards() {
  const { hero, getHero } = useHeroStore();

  useEffect(() => {
    getHero();
  }, [getHero]);

  return (
    <Box sx={{ mt: 1, mb: 5 }}>
      <Box sx={{ mb: 5 }}>
        <LeftbarFilter />
      </Box>
      <Box>
        <Grid2
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 4, md: 4 }}
        >
          {hero && hero.length > 0 ? (
            hero.map((item) => (
              <Grid2 item key={item.id} xs={6} sm={4} md={3}>
                <Card
                  sx={{
                    maxWidth: "100%",
                    background: "#F5FCFF",
                    borderRadius: "0px",
                    border: "none",
                    display: "flex",
                    p: 1,
                  }}
                >
                  <CardContent
                    sx={{
                      display: "flex",
                      gridGap: 20,
                      flexDirection: { xs: "column", md: "unset" },
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: { xs: "100%", md: "25%" },
                      }}
                    >
                      <CardMedia
                        component="img"
                        image={`/image.png`}
                        sx={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                        loading="lazy"
                      />
                    </Box>
                    <Box sx={{ width: { xs: "100%", md: "75%" } }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          flexDirection: { xs: "column", md: "unset" },
                          mb: 1,
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: { xs: "2rem", md: "3rem" },
                            fontWeight: "bold",
                            mb: 1,
                            width: { xs: "100%", md: "60%" },
                            lineHeight: "1.2",
                          }}
                        >
                          {item.fields.fio}
                        </Typography>
                        <Typography
                          color="black"
                          sx={{
                            mb: 1,
                            width: { xs: "100%", md: "40%" },
                            textAlign: { xs: "left", md: "right" },
                            fontSize: { xs: "1rem", md: "1.25rem" },
                          }}
                        >
                          {item.fields.years}
                        </Typography>
                      </Box>
                      <Box
                        sx={{ display: "flex", mt: 1, flexDirection: "column" }}
                      >
                        <Typography
                          sx={{
                            color: "#737373",
                            fontSize: { xs: "1.2rem", md: "1.5rem" },
                          }}
                        >
                          {item.fields.info}
                        </Typography>
                        <Button
                          sx={{
                            width: { xs: "100%", md: "30%" },
                            borderRadius: "0px",
                            backgroundColor: "#E01D04",
                            mt: 4,
                            fontSize: "20px",
                          }}
                          variant="contained"
                        >
                          Подробнее
                        </Button>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid2>
            ))
          ) : (
            <Typography>Нет данных для отображения</Typography>
          )}
        </Grid2>
      </Box>
      <Pagination
        sx={{ mt: 4, mb: 4, display: "flex", justifyContent: "center" }}
      />
    </Box>
  );
}
