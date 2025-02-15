import React from "react";
import styles from "./CountBox.module.css";

export default function CountBox({ count, underText, overText, imagePath }) {
  return (
    <div
      className={styles.box}
      style={{ backgroundImage: `url( ${imagePath})` }}
    >
      <p className={styles.descript}>{overText}</p>
      <span className={styles.count}>{count}</span>
      <p className={styles.descript}>{underText}</p>
    </div>
  );
}
