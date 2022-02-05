
import React from "react";
import { NavLink } from 'react-router-dom';

export const NavBar = ()=>{
  
    return (
       <div>
           <nav>
                <ul key="list" className="list">
                    <li key="listitem" className="list-item">
                        <NavLink exact to="/Home" >Home</NavLink>                      
                    </li>
                </ul>
            </nav>
            
          
       </div>
    )
}


