import { React } from "react";
import { useDispatch } from "react-redux";
import { filterCreated } from "../../../actions";
import "./filterCrated.css"




export const FilterCreated = ({setCurrentPage}) => {

   const dispatch = useDispatch();
   

   function handleFilterCreate(e){
    dispatch(filterCreated(e.target.value))
    setCurrentPage(1)
}



    return (
        <div>
        <select className="filterCreated" onChange={e => {handleFilterCreate(e)}}>
                    <option value='ALL'>Created/Internet</option>
                    <option value='created'>Created</option>
                    <option value='api'>Internet</option>
                </select>  
        </div>

    )
}

