import { db } from "../connect.js";

export const getMedic = (req, res) => {
  const q = "select * from veterinar.medic";
  db.query(q, (err, result, field) => {
    if (err) {
      res.status(500).json(err);
      console.log(err);
      console.log("eroare a venit la server de la baza de date");
      return;
    }
    return res.status(200).json(result);
  });
};

// export const createMedic = (req, res) => {
//   const q =
//   "INSERT INTO veterinar.medic (`Nume`, `Prenume`, `Salariu`, `NumarTelefon`, `DataNasterii`,`DataAngajarii`,`Sex`) VALUE (?)";
// const values = [
//   req.body.Nume,
//   req.body.Prenume,
//   req.body.Salariu,
//   req.body.NumarTelefon,
//   req.body.DataNasterii,
//   req.body.Email,
//   req.body.Sex,
// ];

// db.query(q, [values], (err, data) => {
//   if (err) return res.status(500).json(err);
//   res.status(200).json("User has been created.");
//   return
// });
// };

export const editMedic = (req, res) => {
  const q =
    "UPDATE veterinar.medic SET Nume=?, Prenume=?, NumarTelefon=?, DataNasterii=?,DataAngajarii=?,Sex=?,Salariu=? where MedicID=?";
  console.log(req.body);
  const Nume = req.body.nume;
  const Prenume = req.body.prenume;
  const NumarTelefon = req.body.nrtlf;
  const DataNasterii = convertToMySQLDateTime(req.body.DataNasterii);
  const DataAngajarii = convertToMySQLDateTime(req.body.DataAngajarii) 
  const Sex = req.body.sex;
  const Salariu = req.body.salariu;
  
  const values = [
    Nume,
    Prenume,
    NumarTelefon,
    DataNasterii,
    DataAngajarii,
    Sex,
    Salariu,
  ];

  db.query(q, [...values, req.params.id], (err, result, field) => {
    if (err) {
      res.status(500).json(err);
      console.log(err);
      console.log("Eroare la server: Nu s-a putut edita medicul.");
      return;
    }
    return res.status(200).json("Medic has been updated successfully.");
  });
};

const convertToMySQLDateTime = (reactDateTime) => {
  if (!reactDateTime) return null; // Handle empty or null input

  const [date, time] = reactDateTime.split("T"); // Split the string into date and time
  return `${date} ${time}:00`; // Append ":00" to match MySQL's format
};

export const createMedic = (req, res) => {
  const q =
    "INSERT INTO veterinar.medic (`MedicID`, `Nume`, `Prenume`, `NumarTelefon`, `DataNasterii`,`DataAngajarii`,`Sex`,`Salariu`) VALUE (?)";
  // VALUES ( "aaaa", "Daniel", "0775365748", "1977-07-29 00:00:00", "1977-08-29 00:00:00", 'M', 2000.00)
  const values = [
    Math.floor(Math.random() * 100000),
    req.body.Nume,
    req.body.Prenume,
    req.body.NumarTelefon,
    convertToMySQLDateTime(req.body.DataNasterii),
    convertToMySQLDateTime(req.body.DataAngajarii),
    req.body.Sex,
    req.body.Salariu,
  ];

  db.query(q, [values], (err, data) => {
    if (err) {
      console.log(err);
      console.log("de ce ai eroare ");
      res.status(500).json(err);
      return;
    }
    console.log("a mers");
    res.status(200).json("Medic has been created.");
  });
};

export const deleteMedic = (req, res) => {
  const q = "DELETE FROM veterinar.medic WHERE MedicID = ?";
  const medicId = req.params.id;

  db.query(q, [medicId], (err, result, field) => {
    if (err) {
      res.status(500).json(err);
      console.log(err);
      console.log("Eroare la server: Nu s-a putut șterge medicul.");
      return;
    }
    return res.status(200).json("Medic has been deleted successfully.");
  });
};

export const getConsultatiiMediciNume = (req, res) => {
  const q = "SELECT * FROM veterinar.medic WHERE Nume = ?";
  db.query(q, [req.query.Nume], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length == 0) return res.status(404).json("Medicul nu există");
  });

  const q2 = `SELECT cons.ConsultatieID, cons.Diagnostic, cons.DataConsultatie, cons.Pret   
      FROM veterinar.consultatie cons
      JOIN veterinar.medic med ON cons.MedicID = med.MedicID
      WHERE med.nume = '${req.query.Nume}'`;

  db.query(q2, (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length == 0) return res.status(409).json("Nu există consultații");
    res.status(200).json(data);
  });
};

export const getConsultatiiMediciAn = (req, res) => {
  // const q = "SELECT * FROM veterinar.medic WHERE An = ?";
  // console.log(req.query.An)
  // db.query(q, [req.query.An], (err, data) => {
  //   if (err) {
  //     res.status(500).json(err);
  //     return;
  //   }
  //   if (data.length == 0) {
  //     res.status(404).json("Anul nu există");
  //     return;
  //   }
  // });
  // console.log("Aici nu ajunge")

  const q3 = `SELECT 
    cons.ConsultatieID,
    cons.Diagnostic, 
    cons.DataConsultatie, 
    cons.Pret
FROM 
    veterinar.medic med
JOIN 
    veterinar.consultatie cons 
    ON cons.MedicID = med.MedicID
WHERE 
    YEAR(cons.DataConsultatie) = '${req.query.An}' and med.Nume='${req.query.Nume}'`;

  db.query(q3, (err, data) => {
    if (err) {
      res.status(500).json(err);
      return;
    }
    if (data.length == 0) {
      res.status(409).json("Nu există consultații in anul respectiv");
      return;
    }
    res.status(200).json(data);
  });
};

export const getMedicConsultatie120 = (req, res) => {
  const q4 = `SELECT m.MedicId, m.Nume, m.Prenume, m.NumarTelefon, m.DataNasterii, m.DataAngajarii, m.Sex, m.Salariu
FROM veterinar.medic m
WHERE EXISTS (
    SELECT 1
    FROM veterinar.consultatie c
    WHERE c.MedicID = m.MedicID AND c.Pret > 120
);
`;
  console.log("aici")
  db.query(q4, (err, data) => {
    if (err) {
      res.status(500).json(err);
      return;
    }
    console.log(data)
    if (data.length == 0) {
      res.status(409).json("Nu există consultații de acest fel");
      return;
    }
    res.status(200).json(data);
  });
};

export const getMedicMaxConsultatii = (req, res) => {
  const q5 = `SELECT m.MedicID, m.Nume, m.Prenume, COUNT(c.ConsultatieID) AS numar_consultatii
FROM veterinar.medic m
JOIN veterinar.consultatie c ON m.MedicID = c.MedicID
GROUP BY m.MedicID, m.Nume, m.Prenume
HAVING COUNT(c.ConsultatieID) = (
    SELECT MAX(numar_consultatii)
    FROM (
        SELECT COUNT(c2.ConsultatieID) AS numar_consultatii
        FROM veterinar.consultatie c2
        GROUP BY c2.MedicID
    ) AS subquery
);`;
  db.query(q5, (err, data) => {
    if (err) {
      res.status(500).json(err);
      return;
    }
    if (data.length == 0) {
      res.status(409).json("Nu există");
      return;
    }
    res.status(200).json(data);
  });
};

export const register = (req, res) => {
  const q = "SELECT * FROM proprietar WHERE Username = ?";
  db.query(q, [req.body.Username], (err, data) => {
    if (err) {
      res.status(500).json(err);
      return;
    }
    if (data.length != 0) {
      res.status(409).json("User already exists!");
    }
  });

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
    return res.status(404).json("Wrong password!");
  });
};

export const logout = (req, res) => {
  console.log("You are logged out");
  return res.status(200).json("User has been logged out.");
};
