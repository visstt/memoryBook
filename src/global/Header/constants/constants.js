// Animations
export const renderElementAnimation = {
  hidden: {
    opacity: 0,
    y: -10,
  },
  visible: (custom) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, delay: custom * 0.15, type: "spring" },
  }),
};

export const spanVariants = [
  { open: { y: 0, rotate: 45 }, closed: { y: 10, rotate: 0 } },
  { open: { x: 15, opacity: 0 }, closed: { x: 0, opacity: 1 } },
  { open: { y: 0, rotate: -45 }, closed: { y: -10, rotate: 0 } },
];
