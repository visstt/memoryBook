import React, { useEffect, useState } from "react"; // Импортируйте React
import { createBrowserRouter } from "react-router-dom"; // Убедитесь, что импортируете правильно
import HomeLayout from "../Pages/Home/HomeLayout";
import Registration from "../Pages/Auth/Registration";
import BookLayout from "../Pages/Book/BookLayout";
import Login from "../Pages/Auth/Login";
import ProfileLayout from "../Pages/Profile/ProfileLayout";
import Page from "../Pages/page/Page";
import Map from "../Pages/Map/Map";

// const UsersRoute = ({ children }) => {
//   const isLoggedIn = Cookies.get("logged_in") === "true";

//   if (!isLoggedIn) {
//     return <Navigate to="/" replace />;
//   }
//   return children;
// };

// export default UsersRoute;

// export const AdminRoute = ({ children }) => {
//   const { getUserInfo, user } = useUserStore();
//   const [loading, setLoading] = useState(true);
//   const [isAdmin, setIsAdmin] = useState(false);

//   useEffect(() => {
//     const fetchUserInfo = async () => {
//       await getUserInfo();
//       setLoading(false);
//     };
//     fetchUserInfo();
//   }, [getUserInfo]);

//   useEffect(() => {
//     if (user?.data) {
//       setIsAdmin(user.data.role_id === 1);
//     }
//   }, [user]);

//   if (loading) {
//     return <div>Loading...</div>; // Можно добавить индикатор загрузки
//   }

//   if (!isAdmin) {
//     return <Navigate to="/" replace />;
//   }
//   return children;
// };

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
  },
  {
    path: "/registration",
    element: <Registration />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/book",
    element: <BookLayout />,
  },
  {
    path: "/page/:id",
    element: <Page />,
  },
  {
    path: "/profile",
    element: <ProfileLayout />,
  },
  {
    path: "/map",
    element: <Map />,
  },
  //   {
  //     path: "/catalog",
  //     element: <СategoriesPage />,
  //   },
  //   {
  //     path: "/products/:id", // динамический маршрут
  //     element: <CatalogsLayout />, // Исправлено имя компонента
  //   },
  //   {
  //     path: "/product/:id", // динамический маршрут
  //     element: <ProductDynamicPage />, // Исправлено имя компонента
  //   },
  //   {
  //     path: "/basket", // динамический маршрут
  //     element: <BasketLayout />, // Исправлено имя компонента
  //   },
  //   {
  //     path: "/delivery", // динамический маршрут
  //     element: <Delivery />, // Исправлено имя компонента
  //   },
  //   {
  //     path: "/about", // динамический маршрут
  //     element: <About />, // Исправлено имя компонента
  //   },
  //   {
  //     path: "/returnpolicy", // динамический маршрут
  //     element: <Return_policy />, // Исправлено имя компонента
  //   },
  //   {
  //     path: "/deteils", // динамический маршрут
  //     element: <Deteils />, // Исправлено имя компонента
  //   },
  //   {
  //     path: "/certificate", // динамический маршрут
  //     element: <Electronic_certificate />, // Исправлено имя компонента
  //   },
  //   {
  //     path: "/contacts", // динамический маршрут
  //     element: <Contacts />, // Исправлено имя компонента
  //   },

  //   {
  //     path: "/auth",
  //     element: <Auth />,
  //   },
  //   {
  //     path: "/register",
  //     element: <Register />,
  //   },
  //   {
  //     path: "/paymants",
  //     element: <Paymants />,
  //   },
  //   {
  //     path: "/paymants/:id",
  //     element: <PayOnclick />,
  //   },
  //   {
  //     path: "/profile",
  //     element: (
  //       <UsersRoute>
  //         <UserAccount />
  //       </UsersRoute>
  //     ),
  //   },
  //   {
  //     path: `/admin/*`,
  //     element: (
  //       <AdminRoute>
  //         <AdminDashboard />
  //       </AdminRoute>
  //     ),
  //   },
]);
