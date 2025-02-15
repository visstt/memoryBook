import React from "react";
import styles from "./HistoryCard.module.css";
import { motion } from "motion/react";
import { buttonAnimation } from "../../../../global/constants/constants";

export default function HistoryCard({ imagePath, full_name, description }) {
  return (
    <div className={styles.card_container}>
      <div className={styles.wrapper}>
        <img src={imagePath} alt="photo" className={styles.profile} />
        <div className={styles.wrapper__info}>
          <h3 className={styles.full_name}>{full_name}</h3>
          <p className={styles.description}>{description}</p>
        </div>
      </div>
      <motion.button
        className="button button__default"
        whileTap={buttonAnimation.whileTap}
      >
        Подробнее
      </motion.button>
    </div>
  );
}
