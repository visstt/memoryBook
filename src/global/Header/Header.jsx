import React, { useEffect, useState } from "react";
import styles from "./Header.module.css";
import BurgerButton from "./HeaderComponents/BurgerButton";
import { duration, Link } from "@mui/material";
import { renderElementAnimation } from "./constants/constants";
import { directLinkStyle, links } from "../constants/constants";
import { motion } from "motion/react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = window.innerWidth <= 1024;

  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <motion.header
      className={styles.header}
      whileInView="visible"
      initial="hidden"
      viewport={{ once: true }}
    >
      <div className="container">
        <div className={styles.header__wrapper}>
          <nav className={styles.nav}>
            {links.map((link, index) => (
              <MLink
                key={index}
                href={link.href}
                sx={directLinkStyle}
                custom={index + 1}
                variants={renderElementAnimation}
              >
                {link.label}
              </MLink>
            ))}
          </nav>

          <div className={styles.tablet_group}>
            <motion.form
              onSubmit={() => {}}
              className={styles.search_form}
              custom={5}
              variants={renderElementAnimation}
            >
              <button
                type="submit"
                className={styles.search_form__button}
              ></button>
              <input
                type="text"
                placeholder="Поиск"
                className={styles.search_form__input}
              />
            </motion.form>
            <MLink
              href="/"
              sx={{
                width: "40px",
                height: "40px",
                backgroundImage: "url(/icons/userIcon.svg)",
              }}
              custom={6}
              variants={renderElementAnimation}
            ></MLink>
          </div>

          {isMobile && (
            <>
              <BurgerButton isOpen={isOpen} toggleMenu={toggleMenu} />
              <motion.div
                className={styles.burger}
                initial={{ clipPath: "circle(0% at 100% 0%)" }}
                animate={
                  isOpen
                    ? { clipPath: "circle(150% at 100% 0%)" }
                    : { clipPath: "circle(0% at 100% 0%)" }
                }
                transition={{
                  duration: 0.35,
                  ease: "easeInOut",
                }}
                onClick={toggleMenu}
              >
                <motion.div className={styles.burger__menu}>
                  {links.map((link, index) => (
                    <Link key={index} href={link.href}>
                      {link.label}
                    </Link>
                  ))}
                </motion.div>
              </motion.div>
            </>
          )}
        </div>
      </div>
    </motion.header>
  );
}

const MLink = motion.create(Link);
