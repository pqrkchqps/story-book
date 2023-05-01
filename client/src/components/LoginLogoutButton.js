// client/src/components/LogoutButton.js

import React, { Fragment, useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../AuthContext";

const LoginLogoutButton = () => {
  const { authToken, setAuthToken } = useContext(AuthContext);
  const history = useHistory();

  const handleLogout = () => {
    setAuthToken(null);
  };

  const handleRedirect = () => {
    history.push("/login");
  };

  return (
    <Fragment>
      {authToken ? (
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Logout
        </button>
      ) : (
        <button
          onClick={handleRedirect}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Login
        </button>
      )}
    </Fragment>
  );
};

export default LoginLogoutButton;
