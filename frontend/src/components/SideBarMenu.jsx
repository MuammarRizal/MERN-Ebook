import React, { useContext } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Cookie from "js-cookie";
import { AuthContext } from "../context/AuthContext";
const SideBarMenu = () => {
  const { setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const allCookie = Cookie.get();

  const logoutHandle = () => {
    Object.keys(allCookie).forEach((key) => Cookie.remove(key));
    setIsAuthenticated(false);
    navigate("/login", { replace: true });
  };
  return (
    <div className="card border-0 rounded shadow-sm">
      <div className="card-header">MAIN MENU</div>
      <div className="card-body">
        <div className="list-group">
          <Link
            to="/admin/dashboard"
            className="list-group-item list-group-item-action"
          >
            Dashboard
          </Link>

          <Link
            to="/admin/users"
            className="list-group-item list-group-item-action"
          >
            Users
          </Link>
          <a
            href="#"
            className="list-group-item list-group-item-action"
            style={{ cursor: "pointer" }}
            onClick={logoutHandle}
          >
            Logout
          </a>
        </div>
      </div>
    </div>
  );
};

export default SideBarMenu;
