import { Link } from "react-router-dom";
import "./register.scss";
import { useState } from "react";
import axios from "axios";
const Register = () => {
  const [inputs, setInputs] = useState({
    Username: "",
    Email: "",
    Parola: "",
    Nume: "",
    Prenume: "",
    Adresa:"",
    NumarTelefon:""
  });

  const [err, setError] = useState(false);

  const cleanInput = (e) => {
    setInputs((prev) => ({...prev, [e.target.name]: ""}));
  }

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  
  const handleClick = async e => {
    e.preventDefault()
    try {
      console.log(inputs)
      await axios.post('http://localhost:8800/api/auth/register', inputs, {headers:{"Content-Type" : "application/json"}})
      cleanInput(e)
    } catch(err) {
      console.log(err)
      setError(true)
    }
  }

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Pet Care</h1>
          <p>
          La Pet Care, pasiunea noastră este sănătatea și fericirea prietenilor tăi necuvântători.
          Oferim servicii veterinare de top, de la consultații și tratamente personalizate, până la prevenție și sfaturi pentru o viață sănătoasă. 
          Echipa noastră de profesioniști este aici pentru a-ți sprijini animalul de companie cu grijă și dedicare. 🐾
          </p>
          <span>Aveti un cont deja?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form>
            <input
              type="text"
              placeholder="Username"
              name="Username"
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="Email"
              name="Email"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Parola"
              name="Parola"
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Nume"
              name="Nume"
              onChange={handleChange}
            />
             <input
              type="text"
              placeholder="Prenume"
              name="Prenume"
              onChange={handleChange}
            />
             <input
              type="text"
              placeholder="Adresa"
              name="Adresa"
              onChange={handleChange}
            />
             <input
              type="text"
              placeholder="NumarTelefon"
              name="NumarTelefon"
              onChange={handleChange}
            />
            {err && "There is an error."}
            <button onClick={handleClick}>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
