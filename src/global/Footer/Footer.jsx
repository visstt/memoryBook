import React, { Fragment } from "react";
import styles from "./Footer.module.css";
import { duration, Link } from "@mui/material";
import {
  links,
  networks,
  buttonAnimation,
  directLinkStyle,
} from "../constants/constants";
import { motion } from "motion/react";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footer__wrapper}>
          <div className={styles.network}>
            {networks.map(({ href, icon }, index) => (
              <a href={href} key={index}>
                <img
                  src={icon}
                  alt="image"
                  className={styles.network__icon}
                ></img>
              </a>
            ))}
          </div>
          <nav className={styles.nav}>
            {links.map(({ href, label }, index) => (
              <Fragment key={index}>
                <Link href={href} sx={directLinkStyle}>
                  {label}
                </Link>
                {index < links.length - 1 && (
                  <span className={styles.nav__divider}></span>
                )}
              </Fragment>
            ))}
          </nav>
          <motion.button
            className="button button__default"
            whileTap={buttonAnimation.whileTap}
          >
            Найти героя
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
