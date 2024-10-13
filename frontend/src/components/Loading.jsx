import React from "react";

const Loading = () => {
  return (
    <tr>
      <td>
        <div className="d-flex justify-content-center align-items-center vh-100">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </td>
    </tr>
  );
};

export default Loading;
