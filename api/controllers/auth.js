import { db } from "../connect.js";
//import bcrypt from "bcryptjs";

export const register = (req, res) => {
  const q = "SELECT * FROM proprietar WHERE Username = ?";
// verific daca mai exista un user cu acelasi nume
  db.query(q, [req.body.Username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("User already exists!");
  });
  //inserez in db
  const val =
    "INSERT INTO proprietar (`Username`, `Email`, `Parola`, `Nume`, `Prenume`,`Adresa`,`NumarTelefon`) VALUE (?)";
  const values = [
    req.body.Username,
    req.body.Email,
    req.body.Parola,
    req.body.Nume,
    req.body.Prenume,
    req.body.Adresa,
    req.body.NumarTelefon,
  ];
  //adaug in db
  db.query(val, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("User has been created.");
  });
};

export const login = (req, res) => {
  const q = "SELECT * FROM proprietar WHERE Username = ?";
  db.query(q, [req.body.Username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("User not found!");
    
    for (let i = 0; i < data.length; i++) {
        if (req.body.Parola === data[i].Parola) {
            return res.status(200).json(data[i]);
        }
      }
      return res.status(404).json("Wrong password!")
  });
};
export const logout = (req, res) => {
    console.log("You are logged out")
    return res.status (200).json("User has been logged out.")
};
