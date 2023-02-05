import { useContext, useEffect } from "react";
import { AppContext } from "../AppContext";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

export const PageLogin = () => {
  const {
    loginAdmin,
    setPassword,
    appTitle,
    adminIsOnline,
    logoutAdmin,
    password,
  } = useContext(AppContext);

  const navigate = useNavigate();

  const loginAndRedirect = () => {
    loginAdmin(() => {
      navigate("/");
    });
  };
  return (
    <div className="page pageLogin">
      <Helmet>
        <title>{appTitle} - Login</title>
      </Helmet>

      {adminIsOnline ? (
        <p>
          <button className="logout" onClick={logoutAdmin}>
            Logout
          </button>
        </p>
      ) : (
        <p>
          Identify as admin:{" "}
          <input
            type="password"
            autoFocus
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />{" "}
          <button onClick={loginAndRedirect} type="button">
            Login
          </button>
        </p>
      )}

      {/*   
      <label>Identify as admin: </label>
      <input
        type="password"
        autoFocus
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={loginAndRedirect}>Login</button> */}
    </div>
  );
};
