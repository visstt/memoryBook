import React from "react";
import styles from "./HomeLayout.module.css";
import CountBox from "./HomeComponents/CountBox";
import { figuresAndFacts, historyInfo } from "./constants/constants";
import HistoryCard from "./HomeComponents/HistoryCard/HistoryCard";
import { motion } from "motion/react";
import { buttonAnimation } from "../../global/constants/constants";

export default function HomeLayout() {
  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.hero__wrapper}>
            <div className={styles.hero__wrapper_text}>
              <h1 className={styles.hero__title}>
                Книга Памяти <br /> Оренбургской области
              </h1>
              <p className={styles.hero__subtitle}>
                Сохрани памяти о героях, отдавших жизнь за <br /> Родину и Мир
              </p>
            </div>
            <motion.button
              className="button button__default"
              whileTap={buttonAnimation.whileTap}
            >
              Найти героя
            </motion.button>
          </div>
        </div>
      </section>
      <section className={styles.about}>
        <div className="container">
          <div className={styles.about__wrapper}>
            <img src="/Group 53.png" alt="" className={styles.about__image} />
            <div className={styles.about__info}>
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
            </div>
          </div>
        </div>
      </section>
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
