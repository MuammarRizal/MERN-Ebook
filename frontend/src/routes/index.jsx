import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "../views/Auth/Login";
import RegisterPage from "../views/Auth/Register";
import Belajar from "../components/Belajar";
import HomePage from "../views/home";

const AppRoutes = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/belajar" element={<Belajar />} />
      <Route
        path="/register"
        element={
          isAuthenticated ? (
            <Navigate to={"/admin/dashboard"} />
          ) : (
            <RegisterPage />
          )
        }
      />
      <Route
        path="/login"
        element={
          isAuthenticated ? <Navigate to={"/admin/dashboard"} /> : <LoginPage />
        }
      />
    </Routes>
  );
};
export default AppRoutes;
