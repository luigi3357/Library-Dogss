import { React } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "./Created.css"

export const Created = () => {
const dispatch = useDispatch();

  

 
    return (
        <div className="containerCreated">
        <Link to='/dog'>
                <button className="buttonCrated1">Create Puppies</button>
                
            </Link>
        </div>

    )
}
