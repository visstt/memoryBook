import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid2,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import bin from "../../../../public/icons/bin.svg";

export default function ProfileCard() {
  return (
    <Box sx={{ mt: 0.5, mb: 2.5 }}>
      <Box>
        <Grid2
          container
          spacing={{ xs: 1, md: 1.5 }}
          columns={{ xs: 2, sm: 2, md: 2 }}
        >
          <Grid2 item key={1} xs={3} sm={2} md={1.5}>
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
                <Box sx={{ width: "100%" }}>
                  <Box
                    sx={{
                      display: "flex",
                      gridGap: 30,
                      flexDirection: {
                        xs: "column",
                        md: "column",
                        lg: "unset",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                      }}
                      // onClick={() => {
                      //   window.location.href = `/product/${e.id}`;
                      // }}
                    >
                      <CardMedia
                        component="img"
                        image={`/image.png`}
                        //   alt={e.name}
                        sx={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                        loading="lazy"
                      />
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        mb: 1,
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: { xs: "1.8rem", md: "2rem" },
                          fontWeight: "bold",
                          mb: 1,
                          width: { xs: "100%", md: "100%" },
                        }}
                        //   onClick={() => {
                        //     window.location.href = `/product/${e.id}`;
                        //   }}
                      >
                        Абдршин Рамиль Хайруллаевич
                      </Typography>
                      <Typography
                        // variant="h6"
                        color="black"
                        sx={{
                          mb: 1,
                          width: { xs: "100%", md: "100%" },
                          textAlign: { xs: "left", md: "left" },
                          fontSize: { xs: "1rem", md: "1.2rem" },
                        }}
                        //   onClick={() => {
                        //     window.location.href = `/product/${e.id}`;
                        //   }}
                      >
                        Родился 01.11.1925 с. Новомусино Шарлыкского района
                        Оренбургской области
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      mt: 1,
                      flexDirection: "column",
                    }}
                  >
                    <Typography
                      // variant="h5"
                      sx={{
                        color: "#737373",
                        fontSize: { xs: "1.2rem", md: "1.5rem" },
                      }}
                      // onClick={() => {
                      //   window.location.href = `/product/${e.id}`;
                      // }}
                    >
                      При форсировании Днепра отделение под командованием
                      сержанта Абдршина первым заняло оборону и обеспечило
                      успешную переправу на другой берег всем остальным
                      подразделениям. Во время боя командир отделения Абдршин
                      был смертельно ранен.
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Button
                        sx={{
                          width: "30%",
                          borderRadius: "0px",
                          backgroundColor: "#E01D04",
                          mt: 2,
                          fontSize: { xs: "10px", md: "12px" },
                        }}
                        variant="contained"
                      >
                        Редактировать
                      </Button>
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: "#E01D04",
                          borderRadius: "0px",
                          mt: 2,
                        }}
                      >
                        <img src={bin} alt="bin" />
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid2>
        </Grid2>
      </Box>
    </Box>
  );
}
