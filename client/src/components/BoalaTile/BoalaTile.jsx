import "./BoalaTile.scss"

const BoalaTile = ({denumire, durata}) => {
    return (
        <div className="consultatie_an_tile_container">
        <div>{denumire} </div>
        <div>{durata} </div>
        </div>
    )
}

// fac: e an
//clasa asta in care sunt acum cu ce afisez la buton
export default BoalaTile