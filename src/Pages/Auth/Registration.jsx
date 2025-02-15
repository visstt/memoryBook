import React from "react";
import useAuthStore from "../../store/authStore";
import styles from "./Auth.module.css";
import { Container } from "@mui/material";
import { Link } from "react-router-dom";
import ActivePeople from "../../../public/icons/logoActivePeople.svg";

export default function Registration() {
  const {
    fullName,
    setfullName,
    phoneNumber,
    setphoneNumber,
    email,
    setEmail,
    password,
    setPassword,
    repassword,
    setRepassword,
    registration,
  } = useAuthStore();

  const handleSubmit = async (event) => {
    event.preventDefault();
    await registration();
  };
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      <form onSubmit={handleSubmit} className={styles.reg_form}>
        <h1>Зарегистрироваться</h1>

        <input
          className={styles.reg_input}
          type="text"
          placeholder="ФИО"
          onChange={(e) => {
            setfullName(e.target.value);
          }}
        />
        <input
          className={styles.reg_input}
          type="text"
          placeholder="Номер"
          onChange={(e) => {
            setphoneNumber(e.target.value);
          }}
        />
        <input
          className={styles.reg_input}
          type="email"
          placeholder="Почта"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          className={styles.reg_input}
          type="password"
          placeholder="Пароль"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />

        <input
          className={styles.reg_input}
          type="password"
          placeholder="Подтверждение пароля"
          onChange={(e) => {
            setRepassword(e.target.value);
          }}
        />

        <button type="submit" className={styles.submit_button}>
          Зарегистрироваться
        </button>
      </form>
      <p className={styles.reg_description}>
        У вас есть аккаунт? <Link to="/login">Войти</Link>
      </p>
      {/* <b className={styles.chose}>Или</b> */}

      <div className={styles.active_people}>
        <img src={ActivePeople} alt="ActivePeople" />
        <div className={styles.text_container}>
          <h3>Активный гражданин</h3>
          <h3 className={styles.thin}>Оренбургской области</h3>
        </div>
      </div>
    </Container>
  );
}
