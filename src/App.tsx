import "./App.scss";
import { NavLink, Routes, Route, Navigate } from "react-router-dom";
import { PageWelcome } from "./pages/PageWelcome";
import { PageInfo } from "./pages/PageInfo";
import { PageLogin } from "./pages/PageLogin";
import { PageLogout } from "./pages/PageLogout";
import { useContext } from "react";
import { AppContext } from "./AppContext";

function App() {
  const { adminIsOnline } = useContext(AppContext);
  return (
    <div className="App">
      {adminIsOnline ? <h1>ADMIN MODE </h1> : <h1>SQlite flashcards </h1>}

      <nav>
        <NavLink to="/welcome">Welcome</NavLink>
        <NavLink to="/info">Info</NavLink>
        {adminIsOnline ? (
          <NavLink to="/logout">Logout</NavLink>
        ) : (
          <NavLink to="/login">Login</NavLink>
        )}
      </nav>
      <Routes>
        <Route path="welcome" element={<PageWelcome />} />
        <Route path="info" element={<PageInfo />} />
        <Route path="login" element={<PageLogin />} />
        <Route path="logout" element={<PageLogout />} />
        <Route path="/" element={<Navigate to="welcome" replace />} />
      </Routes>
    </div>
  );
}

export default App;
