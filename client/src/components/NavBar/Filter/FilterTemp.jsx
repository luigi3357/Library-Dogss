import { React } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterTemp } from "../../../actions";
import "./filterTemp.css"


export const FilterTemp = ({setCurrentPage}) => {

   const dispatch = useDispatch();
   const allTemp = useSelector((state) => state.temp);


function handleFilterTemp(e){
    dispatch(filterTemp(e.target.value))
    setCurrentPage(1)
}


    return (
        <div>
            <select 
            className="filterTemp" 
            onChange={e =>{handleFilterTemp(e)}}
            >
                    <option value='All'>All The Dogs</option>
                    {allTemp.map(c=>{
                        return <option value={c.name} key={c.id}>{c.name}</option>
                    })}
                   
                </select>
        </div>

    )
}


