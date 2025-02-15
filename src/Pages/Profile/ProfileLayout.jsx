import React from "react";
import ProfileCard from "./ProfileComponents/ProfileCard";
import styles from "./ProfileLayout.module.css";
import { Container } from "@mui/material";

export default function ProfileLayout() {
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
          <ProfileCard />
          <ProfileCard />
          <ProfileCard />
          <ProfileCard />
          <ProfileCard />
        </div>
      </div>
      <iframe
        src="https://geois2.orb.ru/resource/8860"
        width="100%"
        height="100%"
        style={{ border: "none" }}
        title="Map"
      />
    </Container>
  );
}
