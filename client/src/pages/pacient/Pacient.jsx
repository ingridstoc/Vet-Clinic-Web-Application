import "./Pacient.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import PacientTile from "../../components/PacientTile/PacientTile";
import BoalaTile from "../../components/BoalaTile/BoalaTile";
import PropietarTile from "../../components/PropietarTile/PropietarTile";
import ReactSlider from "react-slider";


const Pacient = () => {
  const [inputs, setInputs] = useState({
    NumeProprietar: "",
    Nume: "",
    Specie: "",
    Sex: "",
  });

  const createPacient = async (e) => {
      e.preventDefault()
      await axios
      .post("http://localhost:8800/api/pacient", inputs)
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
            "Nu s-a putut creea pacientul.",
          errorState: true,
        });
      });
  }

  const [numeMedic, setNumeMedic] = useState("")
  const handleNumeMedic = (e) => {
    setNumeMedic(e.target.value);
  };
  const [an, setAn] = useState(2023)
  const getPacienti = async () => {
    await axios.get("http://localhost:8800/api/pacient").then(
      (response) => {
        setPacient(response.data);
      },
      () => {
        setPacient([]);
      }
    );
  };

  useEffect(() => {
    getPacienti();
    getTotiPropietarii();
  }, []);

  const [proprietari, setProprietari] = useState([])
  const [pacienti, setPacient] = useState([]);
  const [err, setError] = useState({
    message: "",
    errorState: false,
  });

  const [boalanume, setBoliPacient] = useState([]);
//   const [consultatiian, setConsultatiiAn] = useState([]);

  const cleanInput = () => {
    setInputs({
      NumeProprietar: "",
      Nume: "",
      Specie: "",
      Sex: "",
    });
  };

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  async function getBoliPacient(e, nume) {
    e.preventDefault();
    console.log(nume);
    await axios
      .get("http://localhost:8800/api/pacient/boalanume", {
        params: {
          Nume: nume, 
        },
      })
      .then((response) => {
        setBoliPacient(response.data);
        setError({
          message: "",
          errorState: false,
        });
      })
      .catch(() => {
        setBoliPacient([]);
        setError({
          message: "Pacientul nu a avut boli.",
          errorState: true,
        });
      });
  }

  const getTotiPropietarii = async (e) => {
    await axios.get("http://localhost:8800/api/propietar")
    .then((response) => {
      setProprietari(response.data);
      setError({
        message: "",
        errorState: false,
      });
    }).catch(() => {
      setProprietari([]);
      setError({
        message: "Proprietarii nu a fost gasiti.",
        errorState: true,
      });
    });
  }

  const getProprietariAnimaleAceeasiSpecie = async (e) => {
    e.preventDefault()
    await axios.get("http://localhost:8800/api/proprietar/aceeasispecie", {
      params: {
        Specie: inputs.Specie, 
      },
    })
    .then((response) => {
      setProprietari(response.data);
      setError({
        message: "",
        errorState: false,
      });
    }).catch(() => {
      setProprietari([]);
      setError({
        message: "Nu au fost gasiti proprietari care au cel putin 2 animale dintr-o specie.",
        errorState: true,
      });
    });
  }

  const handleSearchClick = async (e) => {
    e.preventDefault();
    await axios
      .get("http://localhost:8800/api/pacient")
      .then((response) => {
        setPacient(response.data);
        getTotiPropietarii();
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

  const getPacientiNevindecati = async (e) => {
    e.preventDefault()
    await axios.get("http://localhost:8800/api/pacient/nevindecati")
    .then((response) => {
      setPacient(response.data);
      cleanInput();
    })
    .catch(() => {
      setError({
        message:
          "Nu s-au gasit pacienti nevindecati.",
        errorState: true,
      });
    });
  }

  const getPacientAlProprietarului = async (e, nume) => {
    e.preventDefault()
    await axios.get("http://localhost:8800/api/pacient/numeproprietar", {
      params: {
        Nume: nume
      }
    })
    .then((response) => {
      setPacient(response.data);
      cleanInput();
    })
    .catch(() => {
      setError({
        message:
          "Nu au fost gasite animalele de companie ale acestui proprietar.",
        errorState: true,
      });
    });
  }

  const getPacientiAn = async (e) => {
    console.log(e)
    e.preventDefault()
    console.log("aici")
    await axios.get("http://localhost:8800/api/pacient/an", {
        params:{
          An: an
        }
    })
      .then((response) => {
        setPacient(response.data);
        cleanInput();
        setError({
          message:"",
          errorState: false,
        })
      })
      .catch(() => {
        setError({
          message:
            "Nu exista animale de companie in acel an",
          errorState: true,
        });
      });
  }

  const getPacientiMedic = async (e) => {
    e.preventDefault()
    await axios.get("http://localhost:8800/api/pacient/dinmedic", {
      params: {
        Nume: numeMedic
      }
    })
    .then((response) => {
      setPacient(response.data);
      cleanInput();
    })
    .catch(() => {
      setError({
        message:
          "Nu au fost gasite animalele de companie ale acestui proprietar.",
        errorState: true,
      });
    });
  }

  const deletePacient = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/api/pacient/${id}`);
      getPacienti(); // Refresh the list after deletion
    } catch (err) {
      setError({
        message: "Nu s-a putut șterge medicul.",
        errorState: true,
      });
    }
  }

  const editPacient = async (id, updatePacient) => {
    await axios.put(`http://localhost:8800/api/pacient/${id}`, updatePacient)
    .catch(() => {
      setError({
        message: "Nu s-a putut edita pacientul.",
        errorState: true,
      });
    });
    getPacienti();

  }

  return (
    <div className="pacienti">
      <div className="card">
        <h1>Pacienții noștri</h1>
        <form>
          <input type="text" placeholder="Nume Proprietar" name="NumeProprietar" 
          value={inputs.NumeProprietar} onChange={handleChange}>
          </input>
          <input
            type="text"
            placeholder="Nume"
            name="Nume"
            value={inputs.Nume}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Specie"
            name="Specie"
            value={inputs.Specie}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Sex"
            name="Sex"
            value={inputs.Sex}
            onChange={handleChange}
          />
          {err.errorState && err.message}
          <button onClick={createPacient}>Creeaza Pacient</button>
          <button onClick={handleSearchClick}>Recupereaza</button>
          <button onClick={getProprietariAnimaleAceeasiSpecie}>Proprietari cu cel putin 2 animale din aceeasi specie</button>
          <button onClick={getPacientiNevindecati}>Pacienti nevindecati</button>
          <button onClick={getPacientiAn}>Pacienti din anul respectiv</button>
          <div className="space_reduction">
          <ReactSlider
        className="horizontal-slider"
        thumbClassName="thumb"
        trackClassName="track"
        min={2020}
        max={2024}
        value={an}
        onChange={setAn}
        renderThumb={(props, state) => (
          <div {...props} style={{ ...props.style, backgroundColor: "blue" }}>
            {state.valueNow}
          </div>
        )}
      /></div>
      <input
            type="text"
            placeholder="Nume medic"
            name="Nume medic"
            value={numeMedic}
            onChange={handleNumeMedic}
      />
      <button onClick={getPacientiMedic}>Pacientii medicului respectiv</button>
        </form>
        {boalanume.length > 0 ? (
          boalanume.map((boala) => (
            <BoalaTile
              key={boala.BoalaID}
              denumire={boala.Denumire}
              durata={boala.DurataTratament}
            ></BoalaTile>
          ))
        ) : (
          <p>Nu există date disponibile.</p>
        )}
      </div>
      <div className="results">
        <h2>Rezultatele Pacienților</h2>
        {pacienti.length > 0 ? (
          pacienti.map((pacient) => (
            <PacientTile
              id={pacient.PacientID}
              key={`${pacient.PacientID}-${pacient.Nume}`}
              nume={pacient.Nume}
              specie={pacient.Specie}
              sex={pacient.Sex}
              getBoliPacient={getBoliPacient}
              deletePacient = {deletePacient}
              editPacient = {editPacient}
            />
          ))
        ) : (
          <p>Nu există date disponibile.</p>
        )}
      </div>
      <div className="tabela_propietar">
      <h2>Rezultatele Proprietarilor</h2>
      {proprietari.length > 0 ? (
          proprietari.map((proprietar) => (
            <PropietarTile
              key={`${proprietar.Id}-${proprietar.Nume}`}
              nume={proprietar.Nume}
              prenume={proprietar.Prenume}
              nrtlf={proprietar.NumarTelefon}
              adresa={proprietar.Adresa}
              getPacientAlProprietarului = {getPacientAlProprietarului}
            />
          ))
        ) : (
          <p>Nu există date disponibile.</p>
        )}
      </div>
    </div>
  );
};

export default Pacient;
