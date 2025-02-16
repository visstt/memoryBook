import { create } from "zustand";
import axios from "axios";

const useHeroStore = create((set, get) => ({
  addHero: async (formData) => {
    try {
      // Кодируем логин и пароль в Base64
      const authString = `hackathon_36:hackathon_36_25`;
      const encodedAuth = btoa(authString); // Преобразуем в Base64

      const response = await axios.post(
        `https://geois2.orb.ru/api/resource/8860/feature/`,
        formData, // Передаем данные напрямую, без обертки в объект
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
            Authorization: `Basic ${encodedAuth}`, // Добавляем заголовок Authorization
          },
        }
      );
      console.log("Успешное добавление солдата:", response.data);
    } catch (error) {
      console.log(
        "Ошибка добавления солдата:",
        error.response?.data || error.message
      );
    }
  },
  filters: [],
  getFilter: async () => {
    try {
      const response = await axios.get(`http://localhost:3000/hero/getFilters`);
      set({ filters: response.data });
    } catch (error) {
      console.log(error);
    }
  },
  hero: [],
  getHero: async (n_raion, kontrakt) => {
    try {
      const response = await axios.get(`http://localhost:3000/hero`, {
        params: {
          n_raion: n_raion,
          kontrakt: kontrakt,
        },
      });
      set({ hero: response.data });
    } catch (error) {
      console.log(error);
    }
  },
  getHeroById: async (id) => {
    try {
      const response = await axios.get(`http://localhost:3000/hero/${id}`);
      set({ hero: response.data });
    } catch (error) {
      console.log(error);
    }
  },
}));

export default useHeroStore;
