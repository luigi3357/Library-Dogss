import React from "react";
import { Link } from "react-router-dom";
import "./card.css"
// weight, height,
function Card({ name, id, weight, height, image, temperament, temperaments, weight_max, height_max }) {
    console.log(name)
    return (

        <div className="containerCard2" >
             <div className="containerCard3">
               <Link to={"/home/" + id}>
                    <button
                        className="buttonCard">
                        More Info
                    </button>
                </Link>
                <img
                    className="container__image__Card"
                    src={image} alt="img not found" />
                <div className="textContent" >
                    <p
                        className="container__h3__name" >
                        {name.split(" ").join(" ")}
                    </p>
                </div>
                <div>
                    <div className="containerPCard">
                        <p
                            className="container__h5__peso">
                            Peso: {weight ? weight : weight_max}
                        </p>
                        <p
                            className="container__h6__altura">
                            Altura: {height ? height : height_max}
                        </p>
                    </div>
                    <b
                        className="container__b__temperament" >
                        Temperamentos:
                    </b>
                     <p
                        className="container_b2_temperament">
                        {temperament}
                    </p>  
                 </div> 
            </div> 
        </div>
    )
}

export default Card