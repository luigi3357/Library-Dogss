import React from "react";
import './Paginado.css'
export  const Paginado = ({dogPerPage, allDogs, paginado})=>{
    const pageNumber = []

    for (let i = 0; i <= Math.ceil(allDogs/dogPerPage); i++) {
        pageNumber.push(i+1);               
    }
    pageNumber.pop() 
    return (
        <nav className='containerPaginate'>
            <ul key="alt"className='paginado'>
                {
                    pageNumber && pageNumber.map(n =>(
                        <li key={n} className="page-item" >
                        <button className="page-link" onClick={()=> paginado(n)}>{n}</button>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}