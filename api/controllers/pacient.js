import { db } from "../connect.js";

export const getPacientiAiMedicului = (req, res) => {
  console.log(req.query)
  const q = 
  `
  SELECT m.Nume, m.Prenume, p.Nume, p.Specie, c.DataConsultatie
FROM veterinar.medic m
JOIN veterinar.consultatie c ON m.MedicID = c.MedicID
JOIN veterinar.pacient p ON c.PacientID = p.PacientID
WHERE m.Nume = '${req.query.Nume}'
  `
  db.query(q, (err, data) => {
    if (err) {
      res.status(500).json(err);
      console.log(err);
      return;
    }
    return res.status(200).json(data);
  });
}


export const getPacientiAn = (req, res) => {
  console.log(req.query)
  const q = `
    SELECT pac.PacientID, pac.Nume, pac.Specie
FROM veterinar.pacient pac
JOIN veterinar.consultatie cons ON cons.PacientID = pac.PacientID
WHERE YEAR(cons.DataConsultatie) = '${req.query.An}'
  `
  db.query(q, (err, data) => {
    if (err) {
      res.status(500).json(err);
      console.log(err);
      return;
    }
    return res.status(200).json(data);
  });
}

export const getPacientAlProprietarului = (req, res) => {
  console.log(req.query)
    const q = `
    SELECT pac.PacientID, pac.Nume, pac.Specie 
FROM veterinar.pacient pac
JOIN veterinar.proprietar prop ON pac.ProprietarID = prop.ProprietarID
WHERE prop.Nume = '${req.query.Nume}'
`   
db.query(q, (err, data) => {
  if (err) {
    res.status(500).json(err);
    console.log(err);
    return;
  }
  return res.status(200).json(data);
});
}

export const getPacient = (req, res) => {
  const q = "select * from veterinar.pacient";
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

export const createPacient = (req, res) => {
  const q_proprietar = `select * from veterinar.proprietar where veterinar.proprietar.Nume = '${req.body.NumeProprietar}'`;
  db.query(q_proprietar, [req.body.Nume], (err, data) => {
    if (err) {
      console.log(err)
      res.status(500).json(err);
      return
    } 
    if (data.length == 0) {
      console.log("nu gaseste proprietarul")
      res.status(404).json("Proprietarul nu exista");
      return
    }
    const values = [
      Math.floor((Math.random() * 10000)),
      data[0].ProprietarID,
      req.body.Nume,
      req.body.Specie,
      req.body.Sex
    ]
    console.log(values)
    const q =
    "INSERT INTO veterinar.pacient (`PacientID`, `ProprietarID`, `Nume`, `Specie`, `Sex`) VALUE (?)";
    db.query(q, [values], (qerr, qdata) => {
      if (qerr) {
        console.log(qerr)
        res.status(500).json(qerr);
        return
      } 
      res.status(200).json(qdata);
    })
  });
};

export const editPacient = (req, res) => {
  const q =
      "UPDATE veterinar.pacient SET Nume=?, Specie=?, Sex=? where PacientID=?";
    console.log(req.body);
    const Nume = req.body.nume;
    const Sex = req.body.sex;
    const Specie = req.body.specie
    
    const values = [
      Nume,
      Specie,
      Sex,
    ];
  
    db.query(q, [...values, req.params.id], (err, result, field) => {
      if (err) {
        res.status(500).json(err);
        console.log(err);
        console.log("Eroare la server: Nu s-a putut edita pacientul.");
        return;
      }
      return res.status(200).json("Pacientul a fost editat cu succes.");
    });
}

export const getBoliPacient = (req, res) => {
  console.log(req.query.Nume);
  const q = `SELECT * FROM veterinar.pacient WHERE Nume = '${req.query.Nume}'`;
  db.query(q, [req.query.Nume], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length == 0) return res.status(404).json("Pacientul nu există");
  });

  const q2 = `SELECT  b.BoalaID , b.Denumire , t.DurataTratament
FROM veterinar.pacient p
JOIN veterinar.consultatie c ON p.PacientID = c.PacientID
JOIN veterinar.bolilepacientilor bp ON c.ConsultatieID = bp.ConsultatieID
JOIN veterinar.boala b ON bp.BoalaID = b.BoalaID
JOIN veterinar.tratament t ON b.BoalaID = t.BoalaID
WHERE p.Nume = '${req.query.Nume}'`;

  db.query(q2, (err, data) => {
    if (err) return res.status(500).json(err);
    console.log(data.length);
    if (data.length == 0) return res.status(409).json("Nu există boli");
    console.log(data);
    res.status(200).json(data);
  });
};

export const getPacientiNevindecati = (req, res) => {
  const q3 = `
   SELECT DISTINCT 
    p.PacientID, 
    p.Nume, 
    p.Specie, 
    p.Sex,
    bp.Diagnostic
FROM 
    veterinar.pacient p
JOIN 
    veterinar.bolilepacientilor bp 
    ON p.PacientID = bp.PacientID
WHERE 
    bp.Vindecare = '0'
    AND p.PacientID IN (
        SELECT PacientID
        FROM veterinar.bolilepacientilor
        WHERE Vindecare = '0'
    );
`

  db.query(q3, (err, data) => {
    if (err) {
      res.status(500).json(err);
      console.log(err);
      return;
    }
    return res.status(200).json(data);
  });
};

export const getConsultatiiMediciAn = (req, res) => {
  const q = "SELECT * FROM veterinar.medic WHERE An = ?";
  db.query(q, [req.query.An], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length == 0) return res.status(404).json("Anul nu există");
  });

  const q4 = `SELECT med.MedicID, med.Nume , med.Prenume
FROM veterinar.medic med
JOIN veterinar.consultatie cons ON cons.MedicID = med.MedicID
WHERE YEAR(cons.DataConsultatie) = '${req.query.An}'`;

  db.query(q4, (err, data) => {
    if (err) return res.status(500).json(err);
    console.log(data.length);
    if (data.length == 0) return res.status(409).json("Nu există consultații");
    console.log(data);
    res.status(200).json(data);
  });
};

export const deletePacient = (req, res) => {
  const q = "DELETE FROM veterinar.pacient WHERE PacientID = ?";
  const pacientID = req.params.id;

  db.query(q, [pacientID], (err, result, field) => {
    if (err) {
      res.status(500).json(err);
      console.log(err);
      console.log("Eroare la server: Nu s-a putut șterge pacientul.");
      return;
    }
    return res.status(200).json("Pacientul a fost sters cu succes");
  });
};

export const register = (req, res) => {
  const q = "SELECT * FROM proprietar WHERE Username = ?";
  db.query(q, [req.body.Username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("User already exists!");
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
