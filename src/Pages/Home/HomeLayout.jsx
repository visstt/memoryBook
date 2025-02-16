import React from "react";
import styles from "./HomeLayout.module.css";
import CountBox from "./HomeComponents/CountBox/CountBox";
import { figuresAndFacts, historyInfo } from "./constants/constants";
import HistoryCard from "./HomeComponents/HistoryCard/HistoryCard";
import { motion } from "motion/react";
import {
  buttonAnimation,
  sliderImages,
} from "../../global/constants/constants";
import Slider from "../../global/Slider/Slider";
import { delay } from "motion";

export default function HomeLayout() {
  return (
    <>
      <motion.section
        className={styles.hero}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="container">
          <div className={styles.hero__wrapper}>
            <div className={styles.hero__wrapper_text}>
              <motion.h1
                className={styles.hero__title}
                variants={heroAnimation}
                custom={1}
              >
                Книга Памяти <br /> Оренбургской области
              </motion.h1>
              <motion.p
                className={styles.hero__subtitle}
                variants={heroAnimation}
                custom={2}
              >
                Сохрани памяти о героях, отдавших жизнь за <br /> Родину и Мир
              </motion.p>
            </div>
            <motion.button
              className="button button__default"
              whileTap={buttonAnimation.whileTap}
              variants={heroAnimation}
              custom={3}
            >
              Найти героя
            </motion.button>
          </div>
        </div>
      </motion.section>
      <motion.section
        className={styles.about}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount:.7 }}
      >
        <div className="container">
          <div className={styles.about__wrapper}>
            <Slider images={sliderImages} />
            <motion.div
              className={styles.about__info}
              variants={aboutAnimation}
            >
              <h2 className={styles.about__title}>О проекте</h2>
              <p className={styles.about__subtitle}>
                Тысячи солдат Оренбургской области не вернулись с войны. Их
                подвиги живут в наших сердцах. Эта книга создана, чтобы память о
                них осталась навсегда
              </p>
              <motion.button
                className="button button__default"
                whileTap={buttonAnimation.whileTap}
              >
                Подробнее
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.section>
      <section className={styles.figures}>
        <div className="container">
          <div className={styles.figures__wrapper}>
            <h2 className={styles.figures__title}>Цифры и факты</h2>
            <div className={styles.count_box__wrapper}>
              {figuresAndFacts.map(
                ({ count, underText, overText, imagePath }, index) => (
                  <CountBox
                    key={index}
                    count={count}
                    underText={underText}
                    overText={overText}
                    imagePath={imagePath}
                  />
                )
              )}
            </div>
          </div>
        </div>
      </section>
      <section className={styles.history}>
        <div className="container">
          <div className={styles.history__wrapper}>
            <span className={styles.span}>
              <h2 className={styles.history__title}>Истории героев</h2>{" "}
              <a href="#" className={`link link__default ${styles.iconly}`}>
                Подробнее
              </a>
            </span>
            <div className={styles.history__table}>
              {historyInfo.map(
                ({ imagePath, fullName, description }, index) => (
                  <HistoryCard
                    key={index}
                    imagePath={imagePath}
                    full_name={fullName}
                    description={description}
                  />
                )
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

const heroAnimation = {
  hidden: {
    opacity: 0,
    x: -15,
  },
  visible: (custom) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, delay: custom * 0.3 },
  }),
};

const aboutAnimation = {
  hidden: {
    opacity: 0,
    x: 15,
  },

  visible: (custom) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, delay: custom * 0.3 },
  }),
};
