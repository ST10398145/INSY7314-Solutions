import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { isValidEmail, isStrongPassword, isEmpty } from "../utils"; // import utils

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // -------------------------
    // Front-end validation
    // -------------------------
    if (isEmpty(email) || isEmpty(password)) {
      setMessage("Email and password are required.");
      return;
    }

    if (!isValidEmail(email)) {
      setMessage("Invalid email format.");
      return;
    }

    if (!isStrongPassword(password)) {
      setMessage(
        "Password must be at least 8 characters long and include letters and numbers."
      );
      return;
    }

    // -------------------------
    // Send request to backend
    // -------------------------
    try {
      const res = await axios.post("/api/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      setMessage("Login successful!");
      navigate("/dashboard");
    } catch (err) {
      setMessage("Login failed: " + err.response?.data?.message || err.message);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value.trim())}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
      {message && <p style={{ color: "red" }}>{message}</p>}
    </form>
  );
}
