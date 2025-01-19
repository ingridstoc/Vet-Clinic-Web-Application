import "./MedicTile.scss"
import { useState } from "react";
import ReactSlider from "react-slider";

const MedicTile = ({id, nume, prenume, nrtlf, salariu, sex, dataNasterii, dataAngajarii, getConsultatiiNume, getConsultatiiAn, deleteMedic, editMedic}) => {
    const [an, setAn] = useState(2023);
    const [isEditing, setIsEditing] = useState(false);
    const [editedMedic, setEditedMedic] = useState({ nume, prenume, salariu, nrtlf, sex, dataAngajarii, dataNasterii});
  
    const handleEditChange = (e) => {
      setEditedMedic((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
  
    const saveEdit = () => {
      editMedic(id, editedMedic);
      setIsEditing(false);
    };

    return (
        <div className="medic_tile_container">
        {isEditing ? (
        <div>
          <input type="text" name="nume" value={editedMedic.nume} onChange={handleEditChange} />
          <input type="text" name="prenume" value={editedMedic.prenume} onChange={handleEditChange} />
          <input type="text" name="nrtlf" value={editedMedic.nrtlf} onChange={handleEditChange} />
          <input type="number" name="salariu" value={editedMedic.salariu} onChange={handleEditChange} />
          <button onClick={saveEdit}>Salvează</button>
        </div>
      ) : (
        <div>
          <div>{nume}</div>
          <div>{prenume}</div>
          <div>{nrtlf}</div>
          <div>{salariu}</div>
          <div>{sex}</div>
        </div>
      )}
        <div className="medic_tile_button_container">
        <button onClick={() => deleteMedic(id)}>Sterge</button>
        <button onClick={() => setIsEditing(!isEditing)}>Editeaza</button></div>
        <button onClick={(e) => getConsultatiiNume(e, nume)}>Arată Consultațiile după Nume</button>
        <button onClick={(e) => getConsultatiiAn(e, nume, an)}>Arată Consultațiile după An</button>
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
      />
        </div>
    )

}

export default MedicTile