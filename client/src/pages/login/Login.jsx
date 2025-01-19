import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import "./login.scss";

const Login = () => {
  const { login } = useContext(AuthContext);

  const handleLogin = () => {
    login();
  };

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Pet Care</h1>
          <p>
          La Pet Care, pasiunea noastră este sănătatea și fericirea prietenilor tăi necuvântători.
          Oferim servicii veterinare de top, de la consultații și tratamente personalizate, până la prevenție și sfaturi pentru o viață sănătoasă. 
          Echipa noastră de profesioniști este aici pentru a-ți sprijini animalul de companie cu grijă și dedicare. 🐾
          </p>
          <span>Nu aveti cont?</span>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form>
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
            <button onClick={handleLogin}>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
