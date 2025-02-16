import { Box, CardMedia, Container, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import React, { useEffect } from "react";
import useHeroStore from "../../store/heroStore";

export default function Page() {
  const { id } = useParams();
  const { getHeroById, hero } = useHeroStore();

  useEffect(() => {
    getHeroById(id);
  }, [id]);

  // Проверка, загружены ли данные
  if (!hero || !hero.fields) {
    return (
      <Box sx={{ mt: 8, textAlign: "center" }}>
        <Typography variant="h6">Загрузка...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 8 }}>
      <Container>
        <Box
          sx={{
            display: "flex",
            gridGap: { xs: "3rem" },
            justifyContent: "space-between",
            flexDirection: { xs: "column-reverse", md: "unset" },
          }}
        >
          <Box sx={{ width: { xs: "100%", md: "45%" } }}>
            <Typography
              variant="body"
              color="#E01D04 "
              sx={{
                display: "flex",
                justifyContent: "center",
                fontSize: "1.7rem",
              }}
            >
              Герой
            </Typography>
            <Typography
              sx={{
                fontSize: "3rem",
                fontWeight: "bold",
                color: "#000",
                textAlign: "center",
              }}
            >
              {hero.fields.fio}
            </Typography>
            <Typography
              sx={{
                fontSize: "1.35rem",
                fontWeight: "bold",
                color: "#737373",
                textAlign: "center",
                lineHeight: 1.5,
                mt: 2,
              }}
            >
              {hero.fields.info}
            </Typography>
          </Box>
          <Box sx={{ width: { xs: "100%", md: "40%" } }}>
            <CardMedia
              component="img"
              image={`/image.png`}
              sx={{ width: "100%", height: "100%", objectFit: "cover" }}
              loading="lazy"
            />
          </Box>
        </Box>
        <Box sx={{ mt: 5, width: { xs: "100%", md: "50%" } }}>
          <Box
            sx={{
              borderTop: "2px solid #CFCFCF",
              borderBottom: "2px solid #CFCFCF",
              display: "flex",
              gridGap: 20,
              p: 3,
            }}
          >
            <Typography>Годы жизни и место рождения</Typography>
            <Typography>
              {hero.fields.years}гг {hero.fields.n_raion}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ width: { xs: "100%", md: "50%" }, mt: 3 }}>
          <Typography variant="h4" sx={{ mb: 2 }}>
            Биография
          </Typography>
          <Typography>{hero.fields.info}</Typography>
        </Box>
        <Box sx={{ width: { xs: "100%", md: "50%" }, mt: 3, mb: 5 }}>
          <Typography variant="h4" sx={{ mb: 2 }}>
            Награды
          </Typography>
          <Typography color="#E01D04">{hero.fields.nagrads}</Typography>
        </Box>
      </Container>
    </Box>
  );
}
