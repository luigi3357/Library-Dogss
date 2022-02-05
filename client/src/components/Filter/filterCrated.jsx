import { React } from "react";
import { useDispatch } from "react-redux";
import { filterCreated } from "../../actions";
import "./filterCrated.css"



export const FilterCreated = () => {

   const dispatch = useDispatch();
   

   function handleFilterCreate(e){
    dispatch(filterCreated(e.target.value))
}



    return (
        <div>
        <select className="filterCreated" onChange={e => {handleFilterCreate(e)}}>
                    <option value='ALL'>Creados/Internet</option>
                    <option value='created'>Creados</option>
                    <option value='api'>Internet</option>
                </select>  
        </div>

    )
}

