import React, { useEffect, useState } from "react";
import SideBarMenu from "../../../components/SideBarMenu";
import Cookie from "js-cookie";
import Api from "../../../services/service";
import { useNavigate, useParams } from "react-router-dom";
const token = Cookie.get("token");
const UsersEdit = () => {
  const { id } = useParams();
  const [users, setUsers] = useState([]);
  const [validation, setValidation] = useState([]);
  const navigate = useNavigate();
  const token = Cookie.get("token");

  const handlerEdit = async () => {
    Api.defaults.headers.common["Authorization"] = token;
    try {
      await Api.put(`api/admin/users/${id}`, {
        ...users,
      })
        .then(() => {
          alert("Data berhasil di update");
          navigate("/admin/users");
        })
        .catch((error) => {
          //   console.log(error);
          setValidation(error.response.data);
        });
    } catch (error) {
      console.log(error);
      setValidation(error.response.data);
    }
  };

  const handlerFormEdit = (e) => {
    e.preventDefault();
    handlerEdit();
  };

  const getUsersByID = () => {
    Api.defaults.headers.common["Authorization"] = token;
    Api.get(`/api/admin/users/${id}`)
      .then((response) => {
        setUsers(response.data.data);
      })
      .catch((error) => console.log({ error }));
  };
  useEffect(() => {
    getUsersByID();
  }, []);
  return (
    <div className="container mt-5 mb-5">
      <div className="row">
        <div className="col-md-3">
          <SideBarMenu />
        </div>
        <div className="col-md-9">
          <div className="card border-0 rounded shadow-sm">
            <div className="card-header">EDIT USER</div>
            <div className="card-body">
              {validation.errors && (
                <div className="alert alert-danger mt-2 pb-0">
                  {validation.errors.map((error, index) => (
                    <p key={index}>
                      {error.path} : {error.msg}
                    </p>
                  ))}
                </div>
              )}
              <form onSubmit={handlerFormEdit}>
                <div className="form-group mb-3">
                  <label className="mb-1 fw-bold">Full Name</label>
                  <input
                    type="text"
                    value={users.name || ""}
                    onChange={(e) =>
                      setUsers({ ...users, name: e.target.value })
                    }
                    className="form-control"
                    placeholder="Full Name"
                  />
                </div>

                <div className="form-group mb-3">
                  <label className="mb-1 fw-bold">Email address</label>
                  <input
                    type="email"
                    defaultValue={users.email}
                    // value={users.email || ""}
                    onChange={(e) =>
                      setUsers({ ...users, email: e.target.value })
                    }
                    className="form-control"
                    placeholder="Email Address"
                  />
                </div>

                <div className="form-group mb-3">
                  <label className="mb-1 fw-bold">Password</label>
                  <input
                    type="password"
                    value={users.password || ""}
                    onChange={(e) =>
                      setUsers({ ...users, password: e.target.value })
                    }
                    className="form-control"
                    placeholder="Password"
                  />
                </div>

                <button type="submit" className="btn btn-sm btn-primary">
                  UPDATE
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersEdit;
