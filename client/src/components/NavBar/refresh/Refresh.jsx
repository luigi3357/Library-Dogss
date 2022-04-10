import { React } from "react";
import { useDispatch } from "react-redux";
import { getDogs } from "../../../actions";

export const Refresh = () => {
const dispatch = useDispatch();

    function handleClick(e) {
        e.preventDefault();
        dispatch(getDogs());
    }

 
    return (
        <div className="containerCreated">       
            <button className="buttonCrated1" onClick={e => { handleClick(e) }}>Refresh Dogs</button>
        </div>

    )
}