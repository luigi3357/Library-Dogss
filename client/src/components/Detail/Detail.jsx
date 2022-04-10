import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getParams, reset, deleted, getDogs } from "../../actions";
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

    useEffect(() => {
        dispatch(getParams(id))
    }, [dispatch, id])

    function handleReset() {
        dispatch(reset("reset"))
    }

    function handleDelete(el) {
        if (el) {
            dispatch(deleted(el))
        }
    }


    const myDog = useSelector((state) => state.params)
    console.log(myDog)


    return (
        <div className="ContainerDetailAll" >

            {
                myDog.length > 0 ?
                    <div className="ContainerDetail">
                        {myDog.length > 0 && myDog[0].createdInDb === true ?
                            <Link to="/home">
                                <div className="creados">
                                    <button className="buttonVolverDetail" onClick="reset">Return</button>
                                    <button onClick={() => handleDelete(id)}>Delete</button>
                                </div>
                            </Link>
                            : <Link to="/home">
                                <button className="buttonVolverDetail" onClick="reset">Return</button>
                            </Link>}
                        <img
                            className="imageDetailCard"
                            // width="200px"
                            src={myDog[0].image ?
                                myDog[0].image :
                                "https://st2.depositphotos.com/1047356/8108/i/600/depositphotos_81084856-stock-photo-beautiful-black-cute-dog-silhouette.jpg"} alt="Not Found" />
                        <p className="titleNameDetail">I am: </p>
                        <p className="titleNameDetail2">{myDog[0].name}</p>
                        <p className="YearsDetail">Years: {myDog[0].life_span}</p>
                        <div className="containerHDetail">
                        <p className="heightDetailmin">Altura min: {myDog[0].height_min}</p>
                        <p className="heightDetailmax">Altura max: {myDog[0].height_max? myDog[0].height_max: "??"}</p>
                        </div>
                        <div className="containerHDetail">
                        <p className="weightDetailmin">Peso min: {myDog[0].weight_min}</p>
                        <p className="weightDetailmax">Peso max: {myDog[0].weight_max}</p>
                        </div>
                      
                        <p className="pTemp">Temperamentos: </p>
                        <p className="pTemp2">{!myDog[0].createdInDb ? myDog[0].temperament + " " : myDog[0].temperaments.map(el => el.name + "  ")}</p>
                    </div> : <p className="Loading">Loading...</p>
            }
            <img className="imageDetail" src="https://p4.wallpaperbetter.com/wallpaper/135/865/229/dog-low-poly-siberian-husky-animals-wallpaper-preview.jpg" alt="Not Found" />


        </div>
    )

}

