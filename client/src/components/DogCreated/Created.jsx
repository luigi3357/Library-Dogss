import { React } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getDogs } from "../../actions";
import "./Created.css"

export const Created = () => {
const dispatch = useDispatch();

    function handleClick(e) {
        e.preventDefault();
        dispatch(getDogs());
    }

 
    return (
        <div className="containerCreated">
        <Link to='/dog'>
                <button className="buttonCrated1">Crear Perritos</button>
                
            </Link>
            <button className="buttonCrated2" onClick={e => { handleClick(e) }}>Recargar los Dog</button>
        </div>

    )
}
