import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getParams,reset,deleted, getDogs } from "../../actions";
import { Link, useParams } from "react-router-dom";

import "./Detail.css"
import Home from "../Home/home";



export const Detail = (props) => {
    const dispatch = useDispatch();
    const { id } = useParams()

    // const allDogs = useSelector((state) => state.dogs);

    // useEffect(() => {
    //     dispatch(getDogs());
    // }, [Home, dispatch])

    useEffect((id) => {
        dispatch(getParams(id))
    }, [dispatch])    

    useEffect(() => {
        dispatch(reset("reset"))
    },[dispatch])

    function handleDelete(el){
        if(el){
            dispatch(deleted(el))              
        } 
    }
   

    const myDog = useSelector((state) => state.params)
 

    return (
        <div>            
            <Link to="/home">
                <button className="buttonVolverDetail" onClick={"reset"}>Volver</button> 
                <div><button onClick={() =>handleDelete(id)}>borrar</button></div>
            </Link> 
                        {
                myDog.length > 0 ?
                    <div className="ContainerDetail">
                        <h1 className="titleNameDetail">Soy: {myDog[0].name}</h1>
                        <img 
                        className="imageDetailCard" 
                        // width="200px"
                        src={myDog[0].image ? 
                        myDog[0].image : 
                        "https://st2.depositphotos.com/1047356/8108/i/600/depositphotos_81084856-stock-photo-beautiful-black-cute-dog-silhouette.jpg"} alt="Not Found" />
                        <h4 className="YearsDetail">Años: {myDog[0].life_span.split(" ").slice(0,3)}</h4>
                        <h4 className="heightDetailmin">Altura min: {myDog[0].height_min}</h4>
                        <h4 className="heightDetailmax">Altura max: {myDog[0].height_max}</h4>
                        <h5 className="weightDetailmin">Peso min: {myDog[0].weight_min}</h5>
                        <h5 className="weightDetailmax">Peso max: {myDog[0].weight_max}</h5>
                        <h2 className="h2Temp">Temperamentos: </h2><p className="pTemp">{!myDog[0].createdInDb ? myDog[0].temperament + " " : myDog[0].temperaments.map(el => el.name + "  ")}</p>
                    </div> : <p className="Loading">Loading...</p>
            }
             <img className="imageDetail" src="https://i.pinimg.com/originals/ea/2b/9f/ea2b9f637fc11889118b94cc10cec318.jpg" alt="Not Found" />

        </div>
    )

}

