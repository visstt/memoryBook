import { BrowserRouter, RouterProvider } from "react-router-dom";
import { router } from "./Routers/Routers";
import Header from "./global/Header/Header";
import "./App.css";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Header />
      {/* <ToastContainer /> */}
      <RouterProvider router={router} />
      {/* <Footer /> */}
    </>
  );
}

export default App;
