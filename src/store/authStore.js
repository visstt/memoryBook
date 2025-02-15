import { create } from "zustand";
import axios from "axios";
import { url } from "../global/constants/constants";

const useAuthStore = create((set, get) => ({
  fullName: "",
  phoneNumber: "",
  email: "",
  password: "",
  repassword: "",

  setfullName: (fullName) => set({ fullName }),
  setphoneNumber: (phoneNumber) => set({ phoneNumber }),
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  setRepassword: (repassword) => set({ repassword }),

  registration: async () => {
    const { fullName, phoneNumber, email, password, repassword } = get();

    try {
      const response = await axios.post(
        `${url}/user/register`,
        { fullName, phoneNumber, email, password, repassword },
        { withCredentials: true }
      );
      console.log("Успешная регистрация:", response.data);
    } catch (error) {
      console.log("Ошибка регистрации:", error.response?.data || error.message);
    }
  },
  Login: async () => {
    const { email, phoneNumber, password } = get();

    try {
      const response = await axios.post(
        `${url}/user/login`,
        { email, phoneNumber, password },
        { withCredentials: true }
      );
      console.log("Успешная авторизация:", response.data);
    } catch (error) {
      console.log("Ошибка авторизация:", error.response?.data || error.message);
    }
  },
}));

export default useAuthStore;
