import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SideBarMenu from "../../../components/SideBarMenu";
import Cookie from "js-cookie";
import Api from "../../../services/service";
const UsersPage = () => {
  const token = Cookie.get("token");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchDataUsers = async () => {
    setLoading(true);
    if (token) {
      Api.defaults.headers.common["Authorization"] = token;

      try {
        const response = await Api.get("/api/admin/users");
        setUsers(response.data.data);
      } catch (error) {
        console.error("there was error in page, the error : ", error);
      } finally {
        setLoading(false);
      }
    } else {
      console.error("Token is not available");
    }
  };

  //   delete user function
  const deleteUser = async (id) => {
    const confirmDeleted = confirm("Anda yakin ingin menghapus ? ");
    if (!confirmDeleted) {
      alert("Data tidak jadi dihapus");
      return;
    }
    await Api.delete(`/api/admin/users/${id}`)
      .then(() => {
        alert("Delete User successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    setLoading(true);
    fetchDataUsers();
  }, [users]);
  return (
    <>
      <div className="container mt-5 mb-5">
        <div className="row">
          <div className="col-md-3">
            <SideBarMenu />
          </div>
          <div className="col-md-9">
            <div className="card border-0 rounded shadow-sm">
              <div className="card-header d-flex justify-content-between align-items-center">
                <span>USERS</span>
                <Link
                  to="/admin/create"
                  className="btn btn-sm btn-success rounded shadow-sm border-0"
                >
                  ADD USER
                </Link>
              </div>
              <div className="card-body">
                <table className="table table-bordered">
                  <thead className="bg-dark text-white">
                    <tr>
                      <th scope="col">Full Name</th>
                      <th scope="col">Email Address</th>
                      <th scope="col" style={{ width: "17%" }}>
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.length > 0 ? (
                      users.map((user, index) => (
                        <tr key={index}>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td className="text-center">
                            <Link
                              to={`/admin/edit/${user.id}`}
                              className="btn btn-sm btn-primary rounded-sm shadow border-0 me-2"
                            >
                              EDIT
                            </Link>
                            <button
                              className="btn btn-sm btn-danger rounded-sm shadow border-0"
                              onClick={() => deleteUser(user.id)}
                            >
                              DELETE
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="text-center">
                          <div className="alert alert-danger mb-0">
                            Data Belum Tersedia!
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UsersPage;
