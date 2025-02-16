import React from "react";
import styles from "./AboutLayout.module.css";
import { motion } from "motion/react";
import { buttonAnimation } from "../../global/constants/constants";
import { img } from "motion/react-client";

const sources = [
  {
    info: "Архивы Министерства обороны РФ, региональные и муниципальные архивы.",
    imagePath: "/public/source1.png",
  },
  {
    info: "Государственные музеи и исторические общества.",
    imagePath: "/public/source2.png",
  },
  {
    info: "Родственники погибших.",
    imagePath: "/public/source3.png",
  },
];
const logos = [
  "/public/logo1.png",
  "/public/logo2.png",
  "/public/logo3.png",
  "/public/logo4.png",
];

export default function AboutLayout() {
  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.hero__wrapper}>
            <div className={styles.hero__wrapper_text}>
              <h1 className={styles.hero__title}>
                Сохранение памяти о героях для будущих поколений
              </h1>
              <p className={styles.hero__subtitle}>
                Книга Памяти Оренбургской области – это цифровой архив,
                созданный для того, чтобы сохранить имена защитников Отечества.
                Этот проект объединяет истории, документы и фотографии,
                переданные архивами, музеями и родственниками героев
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className={styles.data}>
        <div className="container">
          <div className={styles.data__wrapper}>
            <h2 className={styles.data__title}>Цифры и факты</h2>
            <div className={styles.box__wrapper}>
              {sources.map(({ info, imagePath }, index) => (
                <div
                  className={styles.box}
                  style={{ backgroundImage: `url(${imagePath})` }}
                >
                  <p>{info}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className={styles.about}>
        <div className="container">
          <div className={styles.about__wrapper}>
            <img src="/Group 53.png" alt="" className={styles.about__image} />
            <div className={styles.about__info}>
              <h2 className={styles.about__title}>Кому посвящен проект</h2>
              <p className={styles.about__subtitle}>
                Данный проект посвящен солдатам и офицерам, погибшие в года
                Великой Отечественной войны, участники других боевых действий,
                также труженики тыла, награжденные государственными наградами.
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
      <section className={styles.sponsor}>
        <div className="container">
          <div className={styles.sponsor__wrapper}>
            <h2 className={styles.sponsor__title}>Кто поддерживает проект</h2>
            <div className={styles.logo_wrapper}>
              {logos.map((path, index) => (
                <img className={styles.logo} key={index} src={path} alt="" />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
