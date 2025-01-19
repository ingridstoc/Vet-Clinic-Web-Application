import "./ConsultatieTile.scss"

const ConsultatieTile = ({data, diagnostic, pret}) => {
    return (
        <div className="consultatie_an_tile_container">
        <div>{data} {diagnostic} {pret}</div>
        {/* <div>{diagnostic} </div>
        <div>{pret} </div> */}
        </div>
    )
}

// fac: e an
//clasa asta in care sunt acum cu ce afisez la buton
export default ConsultatieTile