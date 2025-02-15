import React, { useState } from "react";
import styles from "./Header.module.css";
import BurgerButton from "./HeaderComponents/BurgerButton";
import { Link } from "@mui/material";
import { renderElementAnimation } from "./constants/constants";
import { directLinkStyle, links } from "../constants/constants";
import { motion } from "motion/react";

const animate = {
  hidden: {
    x: "100%",
  },
  visible: {
    x: 0,
  },
};

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = window.innerWidth === 1024;

  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.header__wrapper}>
          <nav className={styles.nav}>
            {links.map((link, index) => (
              <Link key={index} href={link.href} sx={directLinkStyle}>
                {link.label}
              </Link>
            ))}
          </nav>

          <div className={styles.tablet_group}>
            <form onSubmit={() => {}} className={styles.search_form}>
              <button
                type="submit"
                className={styles.search_form__button}
              ></button>
              <input
                type="text"
                placeholder="Поиск"
                className={styles.search_form__input}
              />
            </form>
            <Link
              href="/"
              sx={{
                width: "40px",
                height: "40px",
                backgroundImage: "url(/icons/userIcon.svg)",
              }}
            ></Link>
          </div>

          <BurgerButton isOpen={isOpen} toggleMenu={toggleMenu} />

          <div className={styles.burger_menu} animate={isOpen ? " " : ""}></div>
        </div>
      </div>
    </header>
  );
}
