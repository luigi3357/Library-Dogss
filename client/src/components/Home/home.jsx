import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs, getTemp, orderByName, orderByWeight } from "../../actions";
import Card from '../Card/card.jsx'
import { NavBar } from "../NavBar/NavBar";
import { Paginado } from "../Paginado/Paginado";

import './home.css'



export default function Home() {
    const dispatch = useDispatch();
    const allDogs = useSelector((state) => state.dogs);
    const [orden, setOrden] = useState(``);



    const [currentPage, setCurrentPage] = useState(1);
    const [dogPerPage, setDogPerPage] = useState(9);
    const indexLastDog = currentPage * dogPerPage;
    const indexFirstDog = indexLastDog - dogPerPage;
    const currentDogs = allDogs.slice(indexFirstDog, indexLastDog);

    const [pageNumberLimit, setPageNumberLimit] = useState(10)
    const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(10)
    const [minPageNumberLimit, setMinPageNumberLimit] = useState(0)

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    };


    useEffect(() => {
        dispatch(getTemp());
    }, [dispatch])

    //order



    useEffect(() => {
        dispatch(getDogs());
    }, [dispatch])

    return (
        <div className="containerHome">
            <NavBar
                setCurrentPage={setCurrentPage}
                setOrden={setOrden}
                orden={orden}
            />
            <div className="containerCard">
                {currentDogs?.map((e) => {
                    return (
                        <div key={e.id} className="card">
                            <Card
                                id={e.id}
                                name={e.name}
                                image={e.image ? e.image : 'https://st2.depositphotos.com/1047356/8108/i/600/depositphotos_81084856-stock-photo-beautiful-black-cute-dog-silhouette.jpg'}
                                temperament={e.createdInDb ? e.temperaments.map(el => el.name + " ") : e.temperament}
                                // temperaments={e.temperaments}
                                height={e.height}
                                weight={e.weight}
                                key={e.id}
                            />
                        </div>
                    )
                })}
            </div>
            <Paginado

                className="Paginado"
                dogPerPage={dogPerPage}
                allDogs={allDogs.length}
                paginado={paginado}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                setdogPerPage={setDogPerPage}
                pageNumberLimit={pageNumberLimit}
                minPageNumberLimit={minPageNumberLimit}
                maxPageNumberLimit={maxPageNumberLimit}
                setMaxPageNumberLimit={setMaxPageNumberLimit}
                setMinPageNumberLimit={setMinPageNumberLimit}
            />

            <img className="imageHome" src="https://p4.wallpaperbetter.com/wallpaper/135/865/229/dog-low-poly-siberian-husky-animals-wallpaper-preview.jpg" alt="Not Found" />


        </div>
    )
}
// https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/drakensbergs-1524637216.jpg?crop=1xw:1xh;center,top&resize=480:
