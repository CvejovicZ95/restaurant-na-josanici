import React, { useState } from "react";
import { useLogin } from "../../hooks/useAdminLogin";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { loginHandler } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await loginHandler(username, password);
  };
  return (
    <div>
      <form className="admin-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Korisnicko ime"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Lozinka"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Uloguj se</button>
      </form>
      <ToastContainer />
    </div>
  );
};
