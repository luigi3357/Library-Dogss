import React from "react";
import { Link } from "react-router-dom";


export const ButonVolver = ()=>{
  
    return (
        <div >                
        <Link to="/">               
               <button className="buttonCrated1">Return</button>
       </Link>
       </div>
    )
}