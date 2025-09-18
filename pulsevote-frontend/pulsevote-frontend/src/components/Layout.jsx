import { Link } from "react-router-dom";

export default function Layout({ children }) {
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <div>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          {isAuthenticated ? (
            <>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/logout">Logout</Link></li>
            </>
          ) : (
            <>
              <li><Link to="/register">Register</Link></li>
              <li><Link to="/login">Login</Link></li>
            </>
          )}
        </ul>
      </nav>
      <main>{children}</main>
    </div>
  );
}
