import React from "react";
import './Paginado.css'
export  const Paginado =  ({ 
    allDogs, 
    paginado, 
    currentPage, 
    setCurrentPage, 
    setDogPerPage, 
    dogPerPage, 
    setMaxPageNumberLimit, 
    setMinPageNumberLimit, 
    pageNumberLimit,
    maxPageNumberLimit,
    minPageNumberLimit })=>{
    const pageNumber = []

    for (let i = 0; i <= Math.ceil(allDogs/dogPerPage); i++) {
        pageNumber.push(i);              
    }

    function handleNextBtn (){
        setCurrentPage(currentPage + 1)
        if(currentPage +1 > maxPageNumberLimit){
            setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit)
            setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit)
        }
     }

     function handlePrevBtn (){
        setCurrentPage(currentPage-1)
        if((currentPage - 1)%pageNumberLimit === 0){
            setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit)
            setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit)
        }
     } 

     const renderPage = pageNumber.map(n =>{
        if(n < maxPageNumberLimit + 1 && n > minPageNumberLimit){
         return(
            <li key={n} className="page-item" >
                        <button className={currentPage === n? "active": "page-link"} onClick={()=> paginado(n)}>{n}</button>
                        </li>         
         )
        }else{
            return null
        }     
      })
     
    return (
        <nav className='containerPaginate'>
            <ul key="alt"className='paginado'>
            <li className="page-item">
                <button
               className="page-link" 
               onClick={()=>{handlePrevBtn()}}
               disabled={currentPage === pageNumber[1] ? true: false}
               >&#8920;</button></li>  
               {renderPage}
               <li className="page-item">
               <button 
               className="page-link"
               onClick={()=>{handleNextBtn()}}
               disabled={currentPage === pageNumber[pageNumber.length - 1] ? true: false}
               >&#8921;</button>
            </li>
            </ul>            
        </nav>
    )
}
