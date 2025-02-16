import React from "react";
import ProfileCard from "./ProfileComponents/ProfileCard";
import styles from "./ProfileLayout.module.css";
import { Container } from "@mui/material";
import useHeroStore from "../../store/heroStore";
import { useState } from "react";

export default function ProfileLayout() {
  const { addHeroMyApi } = useHeroStore();
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
    await addHeroMyApi(formData);
    console.log(JSON.stringify(formData, null, 2)); // Вывод данных в консоль
    // Здесь можно добавить логику отправки данных на сервер
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1 className={styles.title}>Профиль</h1>

      <div className={styles.wrapper}>
        <form className={styles.info_form}>
          <h2>Данные профиля</h2>
          <input
            type="text"
            className={styles.input_form}
            placeholder="Новиков Арсений Алексеевич"
          />
          <input
            type="text"
            className={styles.input_form}
            placeholder="novik_ars23@mail.ru"
          />
          <input
            type="text"
            className={styles.input_form}
            placeholder="79138451123"
          />
          <input
            type="text"
            className={styles.input_form}
            placeholder="**************"
          />

          <button type="submit" className={styles.submit_button}>
            Редактировать
          </button>
        </form>

        <div className={styles.profile_cards}>
          <form className={styles.info_form2} onSubmit={handleSubmit}>
            <h2>Добавить героя</h2>
            <input
              type="text"
              className={styles.input_form}
              name="fields.num"
              placeholder="Номер"
              value={formData.fields.num}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              className={styles.input_form}
              name="fields.n_raion"
              placeholder="Район"
              value={formData.fields.n_raion}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              className={styles.input_form}
              name="fields.fio"
              placeholder="ФИО"
              value={formData.fields.fio}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              className={styles.input_form}
              name="fields.years"
              placeholder="Годы жизни"
              value={formData.fields.years}
              onChange={handleChange}
              required
            />
            <textarea
              className={styles.input_form}
              name="fields.info"
              placeholder="Информация"
              value={formData.fields.info}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              className={styles.input_form}
              name="fields.kontrakt"
              placeholder="Контракт"
              value={formData.fields.kontrakt}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              className={styles.input_form}
              name="fields.nagrads"
              placeholder="Награды"
              value={formData.fields.nagrads}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              className={styles.input_form}
              name="geom"
              placeholder="Геометрия (POINT)"
              value={formData.geom}
              onChange={handleChange}
              required
            />
            <button type="submit" className={styles.submit_button}>
              Отправить
            </button>
          </form>
        </div>
      </div>
    </Container>
  );
}
