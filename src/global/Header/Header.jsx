import React, { useState } from "react";
import styles from "./Header.module.css";
import BurgerButton from "./HeaderComponents/BurgerButton";
import {
  Container,
  Link,
  Hidden,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { color, motion } from "motion/react";
import {
  links,
  headerLinkStyle,
  renderElementAnimation,
} from "./constants/constants";

const MLink = motion.create(Link);

export default function Header() {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const isTable = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <motion.header
      className={styles.header}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <Container
        sx={{
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
          gridGap: { xs: "15px", sm: "35px", md: "20px", lg: "40px" },
        }}
      >
        <Hidden smDown>
          <Hidden mdDown>
            <nav className={styles.header_nav}>
              {links.map((link, index) => (
                <MLink
                  key={link.label}
                  href={link.href}
                  sx={headerLinkStyle}
                  variants={renderElementAnimation}
                  custom={index + 1}
                >
                  {link.label}
                </MLink>
              ))}
            </nav>
          </Hidden>
          <motion.form
            onSubmit={() => {}}
            className={styles.search_form}
            variants={renderElementAnimation}
            custom={isTable ? 1 : 5}
          >
            <button
              type="submit"
              className={styles.search_form__button}
            ></button>
            <input
              type="text"
              className={styles.search_form__input}
              placeholder="Поиск"
            />
          </motion.form>

          <MLink
            href="/"
            variants={renderElementAnimation}
            custom={isTable ? 2 : 6}
            sx={{
              width: "40px",
              height: "40px",
              backgroundImage: "url(/icons/userIcon.svg)",
            }}
          ></MLink>
        </Hidden>

        <BurgerButton
          isOpen={isOpen}
          toggleMenu={toggleMenu}
          custom={() => {
            if (isMobile) {
              return 1;
            } else if (isTable) {
              return 3;
            } else {
              return 7;
            }
          }}
        />

        <Drawer
          anchor="right"
          open={isOpen}
          onClose={toggleMenu}
          sx={{ justifyContent: "center" }}
        >
          <motion.div
            className={styles.burger_menu}
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <List>
              {links.map((link, index) => (
                <motion.div key={link.label}>
                  <ListItem button onClick={toggleMenu}>
                    <ListItemText>
                      <Link href={link.href} sx={{ color: "black" }}>
                        {link.label}
                      </Link>
                    </ListItemText>
                  </ListItem>
                </motion.div>
              ))}
            </List>
          </motion.div>
        </Drawer>
      </Container>
    </motion.header>
  );
}
