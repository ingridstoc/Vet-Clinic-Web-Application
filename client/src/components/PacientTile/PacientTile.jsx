import "./PacientTile.scss"
import { useState } from "react";
import 'react-range-slider-input/dist/style.css';

const PacientTile = ({id, nume, specie, sex, getBoliPacient, deletePacient, editPacient}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedPacient, setEditedPacient] = useState({nume, specie, sex});
    const handleEditChange = (e) => {
        setEditedPacient((prev) => ({ ...prev, [e.target.name]: e.target.value }));
      };
      const saveEdit = () => {
        editPacient(id, editedPacient);
        setIsEditing(false);
      };
    return (
        <div className="pacient_tile_container">
            {isEditing ? (
        <div>
          <input type="text" name="nume" value={editedPacient.nume} onChange={handleEditChange} />
          <input type="text" name="specie" value={editedPacient.specie} onChange={handleEditChange} />
          <input type="text" name="datanasterii" value={editedPacient.datanasterii} onChange={handleEditChange} />
          <input type="number" name="sex" value={editedPacient.sex} onChange={handleEditChange} />
          <button onClick={saveEdit}>Salvează</button>
        </div>
      ) : (
        <div>
        <div>{nume}</div>
        <div>{specie}</div>
        <div>{sex}</div>
        </div>
      )}
        <div className="pacient_tile_button_container">
        <button onClick={() => deletePacient(id)} >Sterge</button>
        <button onClick={() => setIsEditing(!isEditing)}>Editeaza</button></div>
        <button onClick={(e) => getBoliPacient(e, nume)}>Arată Bolile după Nume</button>
        </div>
    )

}

export default PacientTile;