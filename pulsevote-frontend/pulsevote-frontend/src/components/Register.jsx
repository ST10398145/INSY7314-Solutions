import { useState } from "react";
import axios from "axios";
import { isValidEmail, isStrongPassword, isEmpty } from "../utils"; // import utils

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
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
      const res = await axios.post("/api/auth/register", { email, password });
      setMessage("Registration successful! You can now log in.");
      setEmail("");      // Clear form
      setPassword("");
    } catch (err) {
      setMessage("Registration failed: " + err.response?.data?.message || err.message);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Register</h2>
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
      <button type="submit">Register</button>
      {message && <p style={{ color: message.includes("failed") ? "red" : "green" }}>{message}</p>}
    </form>
  );
}
