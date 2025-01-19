import "./Medic.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import MedicTile from "../../components/MedicTile/MedicTile";
// import ConsultatieNumeTile from "../../components/ConsultatieNumeTile/ConsultatieNumeTile";
// import ConsultatieAnTile from "../../components/ConsultatieTile/ConsultatieTile";
import ConsultatieTile from "../../components/ConsultatieTile/ConsultatieTile";
const Medic = () => {
  const [inputs, setInputs] = useState({
    Nume: "",
    Prenume: "",
    Salariu: "",
    NumarTelefon: "",
    DataNasterii: "",
    DataAngajarii: "",
    Sex: "",
  });

  const getMedici = async () => {
    await axios.get("http://localhost:8800/api/medic").then(
      (response) => {
        setMedici(response.data);
      },
      () => {
        setMedici([]);
      }
    );
  };

  useEffect(() => {
    getMedici();
  }, []);

  const [medici, setMedici] = useState([]);
  const [err, setError] = useState({
    message: "",
    errorState: false,
  });

  const [consultatii, setConsultatii] = useState([]);

  const cleanInput = () => {
    setInputs({
      Nume: "",
      Prenume: "",
      Salariu: "",
      NumarTelefon: "",
    });
  };

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  async function getConsultatiiMediciNume(e, nume) {
    e.preventDefault();
    console.log(nume);
    await axios
      .get("http://localhost:8800/api/medic/consultatiinume", {
        params: {
          Nume: nume, 
        },
      })
      .then((response) => {
        setConsultatii(response.data);
        setError({
          message: "",
          errorState: false,
        });
      })

      .catch(() => {
        setConsultatii([]);
        setError({
          message: "Nu există consultație.",
          errorState: true,
        });
      });
  }

  async function getConsultatiiMediciAn(e, nume, an) {
    e.preventDefault();
    await axios
      .get("http://localhost:8800/api/medic/consultatiian", {
        params: {
          An: an, 
          Nume: nume,
        },
      })
      .then((response) => {
        setConsultatii(response.data);
        setError({
          message: "",
          errorState: false,
        });
      }).catch(() => {
        setConsultatii([]);
        setError({
          message: "Nu există consultație.",
          errorState: true,
        });
      });
  }


  const handleSearchClick = async (e) => {
    e.preventDefault();
    await axios
      .get("http://localhost:8800/api/medic")
      .then((response) => {
        setMedici(response.data);
        cleanInput();
      })
      .catch(() => {
        setError({
          message:
            "Nu s-au putut trimite date la server. Server închis. Path-ul nu e bun.",
          errorState: true,
        });
      });
  };

  const createMedicVariable = async (e) => {
    e.preventDefault()
    console.log(inputs)
    await axios
      .post("http://localhost:8800/api/medic", inputs)
      .then((response) => {
        cleanInput();
        setError({
          message: "",
          errorState: false,
        })
        handleSearchClick(e)
      })
      .catch(() => {
        setError({
          message:
            "Nu s-a putut creea medicul.",
          errorState: true,
        });
      });
  }

  const deleteMedic = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/api/medic/${id}`);
      getMedici(); // Refresh the list after deletion
    } catch (err) {
      setError({
        message: "Nu s-a putut șterge medicul.",
        errorState: true,
      });
    }
  };
  
  const editMedic = async (id, updatedMedic) => {
    try {
      await axios.put(`http://localhost:8800/api/medic/${id}`, updatedMedic);
      getMedici(); // Refresh the list after updating
    } catch (err) {
      setError({
        message: "Nu s-a putut edita medicul.",
        errorState: true,
      });
    }
  };

  const getMedic120 = async (e) => {
    e.preventDefault()
    await axios.get(`http://localhost:8800/api/medic/getconsultatii120`).then((response) => {
      setMedici(response.data)
      setError({
        message: "",
        errorState: false,
      })
    })
    .catch(() => {
      setError({
        message:
          "Nu s-a putut gasi medicul.",
        errorState: true,
      });
    });
  }

  const getMaximConsultatiiMedic = async (e) => {
    e.preventDefault()
    await axios.get(`http://localhost:8800/api//medic/getmaxconsultatii`).then((response) => {
      setMedici(response.data)
      setError({
        message: "",
        errorState: false,
      })
    })
    .catch(() => {
      setError({
        message:
          "Nu s-a putut gasi medicul.",
        errorState: true,
      });
    });
  }

  return (
    <div className="medici">
      <div className="card">
        <h1>Medicii cabinetului</h1>
        <form>
          <input
            type="text"
            placeholder="Nume"
            name="Nume"
            value={inputs.Nume}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Prenume"
            name="Prenume"
            value={inputs.Prenume}
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder="Salariu"
            name="Salariu"
            value={inputs.Salariu}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="NumarTelefon"
            name="NumarTelefon"
            value={inputs.NumarTelefon}
            onChange={handleChange}
          />
          <input
          type="datetime-local"
          placeholder="DataNasterii"
          name="DataNasterii"
          onChange={handleChange}></input>
          <input
          type="datetime-local"
          placeholder="DataAngajarii"
          name="DataAngajarii"
          onChange={handleChange}></input>

          <label>
            <input type="radio" name="Sex"
               value="F" onChange={handleChange}/> Feminin
          </label>
          <label>
            <input type="radio" name="Sex"
               value="M" onChange={handleChange}/> Masculin
          </label>

          <div className="medic_put_one_line">
            <button onClick={handleSearchClick}>Search</button>
            <div className="spacer"></div>  
            <button onClick={createMedicVariable}>Creeaza</button>  
          </div>
          <button onClick={getMedic120}>Medici cu Consultatii mai scumpe de 120 de ron</button>
          <button onClick={getMaximConsultatiiMedic}>Medicii cu cele mai multe consultatii</button>
        </form>
        {consultatii.length > 0 ? (
          consultatii.map((consultatie) => (
            <ConsultatieTile
              key={consultatie.ConsultatieID}
              data={consultatie.DataConsultatie}
              diagnostic={consultatie.Diagnostic}
              pret={consultatie.Pret}
            ></ConsultatieTile>
          ))
        ) : (
          <p>Nu există consultatii.</p>
        )}
      {err.errorState && err.message}
      </div>
      <div className="results">
        <h2>Rezultatele Medicilor</h2>
        {medici.length > 0 ? (
          medici.map((medic) => (
            <MedicTile
              key={`${medic.id}-${medic.Nume}-${medic.Prenume}`}
              id={medic.MedicID}
              nume={medic.Nume}
              prenume={medic.Prenume}
              nrtlf={medic.NumarTelefon}
              salariu={medic.Salariu}
              sex={medic.Sex}
              getConsultatiiNume={getConsultatiiMediciNume}
              getConsultatiiAn= {getConsultatiiMediciAn}
              deleteMedic = {deleteMedic}
              dataNasterii = {medic.DataNasterii}
              dataAngajarii = {medic.DataAngajarii}
              editMedic={editMedic}
            />
          ))
        ) : (
          <p>Nu există date disponibile.</p>
        )}
      </div>
    </div>
  );
};

export default Medic;
