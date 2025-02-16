// Server
export const url = import.meta.env.VITE_URL_SERVER;
console.log(url);

// Data
export const links = [
  { href: "/", label: "О проекте" },
  { href: "/book", label: "Книга памяти" },
  { href: "/map", label: "Интерактивная карта" },
  { href: "/", label: "Контакты" },
];

export const networks = [
  {
    href: "https://vk.com",
    icon: "/public/icons/icons8-vk 1.svg",
  },
  {
    href: "",
    icon: "/public/icons/tg.svg",
  },
];

export const sliderImages = [
  "/public/slider.png",
  "/public/slider2.jpg",
  "/public/slider3.jpg",
];

// Styles
export const directLinkStyle = {
  color: "#ccc",
  textDecoration: "none",
  transition: ".2s color ease-in-out",
  "&:hover": { color: "white" },
};

// Animations
export const buttonAnimation = {
  whileTap: {
    scale: 0.95,
  },
};
