import "./PropietarTile.scss"
// import { useState } from "react";
// import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';

const PropietarTile = ({nume, prenume, nrtlf, adresa, getPacientAlProprietarului}) => {
    // const [an, setAn] = useState(2023);
    return (
        <div className="propietar_tile_container">
        <div>{nume} {prenume} {nrtlf} {adresa}</div>
        {/* <div>{prenume}</div>
        <div>{nrtlf}</div>
        <div>{adresa}</div> */}
        <button onClick={(e) => getPacientAlProprietarului(e, nume)}>Animale companie proprietari</button>
        </div>
    )

}

export default PropietarTile;