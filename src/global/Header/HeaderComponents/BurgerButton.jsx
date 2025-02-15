import React from "react";
import styles from "./BurgerButton.module.css";
import { motion } from "motion/react";
import { spanVariants, renderElementAnimation } from "../constants/constants";

export default function BurgerButton({ isOpen, toggleMenu }) {
  return (
    <button className={styles.burger_btn} onClick={toggleMenu}>
      {spanVariants.map((variant, index) => (
        <motion.span
          key={index}
          animate={isOpen ? "open" : "closed"}
          variants={variant}
        />
      ))}
    </button>
  );
}
