import React, { useEffect, useState } from "react";
import styles from "./Header.module.css";
import BurgerButton from "./HeaderComponents/BurgerButton";
import { Link } from "@mui/material";
import { motion } from "framer-motion";
import useHeroStore from "../../store/heroStore";
import { directLinkStyle, links } from "../constants/constants";
import { renderElementAnimation } from "./constants/constants";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const isMobile = window.innerWidth <= 1024;
  const { getHeroSearch } = useHeroStore();

  const toggleMenu = () => setIsOpen((prev) => !prev);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const results = await getHeroSearch(searchQuery);
      setSearchResults(results);
    }
  };

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
            {links.map(({ href, label }, index) => (
              <MLink
                href={href}
                sx={directLinkStyle}
                custom={index + 1}
                variants={renderElementAnimation}
              >
                {label}
              </MLink>
            ))}
          </nav>

          <div className={styles.tablet_group}>
            <motion.form
              onSubmit={handleSearch}
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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </motion.form>
            <MLink
              href="/login"
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

      {/* Отображение результатов поиска */}
      {searchResults.length > 0 && (
        <div className={styles.search_results}>
          {searchResults.map((result) => (
            <div key={result.id} className={styles.search_result_item}>
              <h3>{result.fields.fio}</h3>
              <p>{result.fields.info}</p>
            </div>
          ))}
        </div>
      )}
    </motion.header>
  );
}

const MLink = motion(Link);
