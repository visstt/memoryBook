import React from "react";
import useAuthStore from "../../store/authStore";
import styles from "./Auth.module.css";
import { Container } from "@mui/material";
import { Link } from "react-router-dom";
import login from "../../../public/icons/login.svg";

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

      <Link to="https://lk.orb.ru/oauth/authorize?client_id=31&redirect_uri=http://hackathon-12.orb.ru/profile/login_from_rsaag&response_type=code&scope=email+auth_method&state=http://hackathon-12.orb.ru">
        <div className={styles.active_people}>
          <img src={login} alt="ActivePeople" />
        </div>
      </Link>
    </Container>
  );
}
