import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "../views/Auth/Login";
import RegisterPage from "../views/Auth/Register";
import Belajar from "../components/Belajar";
import HomePage from "../views/home";
import DashobardAdmin from "../views/Admin/Dashboard";
import UsersPage from "../views/Admin/Users";
import CreateUser from "../views/Admin/Users/create";
import UsersEdit from "../views/Admin/Users/edit";
import NotFound from "../components/NotFound";

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
      <Route
        path="/admin/dashboard"
        element={
          isAuthenticated ? (
            <DashobardAdmin />
          ) : (
            <Navigate to={"/login"} replace />
          )
        }
      />
      <Route
        path="/admin/users"
        element={
          isAuthenticated ? <UsersPage /> : <Navigate to={"/login"} replace />
        }
      />
      <Route
        path="/admin/create"
        element={
          isAuthenticated ? <CreateUser /> : <Navigate to={"/login"} replace />
        }
      />
      <Route
        path="/admin/edit/:id"
        element={
          isAuthenticated ? <UsersEdit /> : <Navigate to={"/login"} replace />
        }
      />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
};
export default AppRoutes;
