import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
  FormControl,
} from "@mui/material";
import useHeroStore from "../../../store/heroStore";

export default function AddSoldier() {
  const { addHero } = useHeroStore();
  // Состояния для хранения данных формы
  const [formData, setFormData] = useState({
    extensions: {
      attachment: null,
      description: null,
    },
    fields: {
      num: "",
      n_raion: "",
      fio: "",
      years: "",
      info: "",
      kontrakt: "",
      nagrads: "",
    },
    geom: "",
  });

  // Обработчик изменения значений полей формы
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("fields.")) {
      const fieldName = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        fields: {
          ...prev.fields,
          [fieldName]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Обработчик отправки формы
  const handleSubmit = async (e) => {
    e.preventDefault();
    await addHero(formData);
    console.log(JSON.stringify(formData, null, 2)); // Вывод данных в консоль
    // Здесь можно добавить логику отправки данных на сервер
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Добавить данные о солдате
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        {/* Поле для номера */}
        <FormControl fullWidth margin="normal">
          <TextField
            label="Номер"
            name="fields.num"
            value={formData.fields.num}
            onChange={handleChange}
            required
          />
        </FormControl>

        {/* Поле для района */}
        <FormControl fullWidth margin="normal">
          <TextField
            label="Район"
            name="fields.n_raion"
            value={formData.fields.n_raion}
            onChange={handleChange}
            required
          />
        </FormControl>

        {/* Поле для ФИО */}
        <FormControl fullWidth margin="normal">
          <TextField
            label="ФИО"
            name="fields.fio"
            value={formData.fields.fio}
            onChange={handleChange}
            required
          />
        </FormControl>

        {/* Поле для годов жизни */}
        <FormControl fullWidth margin="normal">
          <TextField
            label="Годы жизни"
            name="fields.years"
            value={formData.fields.years}
            onChange={handleChange}
            required
          />
        </FormControl>

        {/* Поле для информации */}
        <FormControl fullWidth margin="normal">
          <TextField
            label="Информация"
            name="fields.info"
            value={formData.fields.info}
            onChange={handleChange}
            multiline
            rows={4}
            required
          />
        </FormControl>

        {/* Поле для контракта */}
        <FormControl fullWidth margin="normal">
          <TextField
            label="Контракт"
            name="fields.kontrakt"
            value={formData.fields.kontrakt}
            onChange={handleChange}
            required
          />
        </FormControl>

        {/* Поле для наград */}
        <FormControl fullWidth margin="normal">
          <TextField
            label="Награды"
            name="fields.nagrads"
            value={formData.fields.nagrads}
            onChange={handleChange}
            required
          />
        </FormControl>

        {/* Поле для геометрии */}
        <FormControl fullWidth margin="normal">
          <TextField
            label="Геометрия (POINT)"
            name="geom"
            value={formData.geom}
            onChange={handleChange}
            required
          />
        </FormControl>

        {/* Кнопка отправки */}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Отправить
        </Button>
      </Box>
    </Container>
  );
}
