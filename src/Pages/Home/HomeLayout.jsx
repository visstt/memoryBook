import React from "react";
import styles from "./HomeLayout.module.css";
import CountBox from "./HomeComponents/CountBox";
import { figuresAndFacts } from "./constants/constants";

export default function HomeLayout() {
  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.hero__wrapper}>
            <h1 className={styles.hero__title}>
              Книга Памяти <br /> Оренбургской области
            </h1>
            <p className={styles.hero__subtitle}>
              Сохрани памяти о героях, отдавших жизнь за <br /> Родину и Мир
            </p>
            <button className="button button__default">Найти героя</button>
          </div>
        </div>
      </section>
      <section className={styles.about}>
        <div className="container">
          <div className={styles.about__wrapper}>
            <img src="/Group 53.png" alt="" />
            <div className={styles.about__info}>
              <h2 className={styles.about__title}>О проекте</h2>
              <p className={styles.about__subtitle}>
                Тысячи солдат Оренбургской области не вернулись с войны. Их
                подвиги живут в наших сердцах. Эта книга создана, чтобы память о
                них осталась навсегда
              </p>
              <button className="button button__default">Подробнее</button>
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
              <a href="#" className="link link__default">
                Подробнее
              </a>
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
