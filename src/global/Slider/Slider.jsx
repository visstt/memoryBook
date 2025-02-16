import { useState } from "react";
import styles from "./Slider.module.css";

export default function Slider({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () =>
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  const prevSlide = () =>
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );

  return (
    <div className={styles.slider__container}>
      <div
        className={styles.slider__wrapper}
        style={{
          transform: `translateX(-${currentIndex * 100}%) `,
        }}
      >
        {images.map((slide, index) => (
          <img src={slide} className={styles.slide} key={index} />
        ))}
      </div>
      <button
        className={`${styles.button} ${styles.button__left}`}
        onClick={prevSlide}
      >
        <img src="/public/icons/Arrow_Left_LG.svg" alt="" />
      </button>
      <button
        className={`${styles.button} ${styles.button__right}`}
        onClick={nextSlide}
      >
        <img src="/public/icons/Arrow_Right_LG.svg" alt="" />
      </button>
    </div>
  );
}
