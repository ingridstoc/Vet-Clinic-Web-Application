import { db } from "../connect.js";

export const getProprietar = (req, res) => {
  const q = "select * from veterinar.proprietar";
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

export const getProprietariAnimaleAceeasiSpecie = (req, res) => {
  const q1 = `
    SELECT DISTINCT prop.ProprietarID, prop.Nume, prop.Prenume
    FROM veterinar.proprietar prop
    WHERE prop.Nume IN (
    SELECT prop.Nume
    FROM veterinar.pacient pac
    JOIN veterinar.proprietar prop ON pac.ProprietarID = prop.ProprietarID
    WHERE pac.Specie = '${req.query.Specie}'
    GROUP BY prop.Nume, pac.Specie
    HAVING COUNT(pac.Nume) >= 2
    );
`;
  db.query(q1, (err, data) => {
    if (err) {
      res.status(500).json(err);
      console.log(err);
      console.log("eroare a venit la server de la baza de date");
      return;
    }
    return res.status(200).json(data);
  });
};
