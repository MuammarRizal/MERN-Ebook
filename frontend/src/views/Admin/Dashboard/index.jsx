import React, { useEffect, useState } from "react";
import SideBarMenu from "../../../components/SideBarMenu";
import Cookie from "js-cookie";

const DashobardAdmin = () => {
  const [user, setUser] = useState({});
  useEffect(() => {
    const userData = Cookie.get("user");

    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);
  return (
    <div className="container mt-5 mb-5">
      <div className="row">
        <div className="col-md-3">
          <SideBarMenu />
        </div>
        <div className="col-md-9">
          <div className="card border-0 rounded shadow-sm">
            <div className="card-header">DASHBOARD</div>
            <div className="card-body">
              Selamat Datang, <strong>{user?.name || "admin"}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashobardAdmin;
