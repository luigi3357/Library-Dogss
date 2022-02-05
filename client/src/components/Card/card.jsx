import React from "react";
import "./card.css"
// weight, height,
function Card({name, weight, height, image, temperament, temperaments,weight_max,height_max}){
    console.log(name)
    return (
        <div className="containerCard" >     
           <div className="textContent" ><h6 className="container__h3__name" >{name.split(" ").join(" ")}</h6></div>
            <h5 className="container__h5__peso">Peso: {weight?weight:weight_max}</h5>                         
            <h5 className="container__h6__altura">Altura: {height?height:height_max}</h5> 
            <img className="container__image__Card" src={image} alt="img not found"  />
            <b className="container__b__temperament" >Temperamentos:</b>
            <b className="container_b2_temperament">{temperament}</b>
            
        </div>
    )    
}

export default Card