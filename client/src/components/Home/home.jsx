import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs, getTemp, orderByName, orderByWeight } from "../../actions";
import { Link } from "react-router-dom";
import  Card  from '../Card/card.jsx'
import { Paginado } from "../Paginado/Paginado";
import { SearchBar } from "../SearchBar/SearchBar";
import { FilterTemp } from "../Filter/FilterTemp";
import { FilterCreated } from "../Filter/filterCrated";
import { Created } from "../DogCreated/Created";
import './home.css'
// import { Detail } from "../Detail/Detail";

// import { NavBar } from "../NavBar/NavBar";


export default function Home() {
    const dispatch = useDispatch();
    const allDogs = useSelector((state) => state.dogs);
    const [orden, setOrden] = useState(``);



    const [currentPage, setCurrentPage] = useState(1);
    const [dogPerPage, setDogPerPage] = useState(8);
    const indexLastDog = currentPage * dogPerPage;
    const indexFirstDog = indexLastDog - dogPerPage;
    const currentDogs = allDogs.slice(indexFirstDog, indexLastDog);

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)       
    };


    useEffect(() => {
        dispatch(getTemp());
    }, [dispatch])

    //order
    function handleOrderByName(e) {
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`);
        
    }
    function handleOrderByWeight(e) {
        e.preventDefault();
        dispatch(orderByWeight(e.target.value));
        setCurrentPage(1);
        setOrden({
            ...orden,
            orden:`Ordenado ${e.target.value}`
        })
    }

    useEffect(() => {
        dispatch(getDogs());
    }, [dispatch])

    return (
        <div className="containerHome">
                <div className="containerVolver">                
             <Link className="itemVolver" to="/">
                    <div>
                        {/* <img src="" alt="not found" /> */}
                    </div>
                    <button className="butonVolver">Volver</button>
            </Link>
            </div>

            <h1 className="title">DOGS</h1>
            <div className="filtercontainer" >
                <div className="searchbar">
                <SearchBar />
                </div>
                <Created className="Crear_Refresh"/> 
            
            <div>
                <div >
                    <select className="selectAZ" onChange={e => { handleOrderByName(e) }}>
                        <option className="option">Ordenar</option>
                        <option className="option" value='asc'>Ordenar A/Z</option>
                        <option className="option" value='desc'>Ordenar Z/ A</option>
                    </select>                                                  
                    <select className="selectPeso" onChange={e => { handleOrderByWeight(e) }}>
                        <option value='weight'>Ordenar por Peso mayor</option>
                        <option value='weight_desc'>Ordenar por Peso menor </option>
                    </select>
                    <FilterCreated />  
                    <FilterTemp setCurrentPage={setCurrentPage} />
                </div>
            </div>
            </div> 
<div className="containerCard">
            {currentDogs?.map((e) => {
                return (
                    <div key={e.id}className="card">
                    <Link to={"/home/" + e.id}>                       
                        <Card 
                        name={e.name} 
                        image={e.image ? e.image : 'https://st2.depositphotos.com/1047356/8108/i/600/depositphotos_81084856-stock-photo-beautiful-black-cute-dog-silhouette.jpg'} 
                        temperament={e.createdInDb? e.temperaments.map(el=> el.name+" "):e.temperament}
                        // temperaments={e.temperaments}
                        height={e.height} 
                        weight={e.weight} 
                        key={e.id} />                        
                    </Link>
                    </div>
                )
            })}
            </div>
            <Paginado
             className="Paginado" 
             dogPerPage={dogPerPage} 
             allDogs={allDogs.length} 
             paginado={paginado} />

            <img className="imageHome" src="https://i.pinimg.com/originals/c7/f7/9b/c7f79b87ecdc215aec81df1635779a7f.jpg" alt="Not Found" />
           

        </div>
    )
}
// https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/drakensbergs-1524637216.jpg?crop=1xw:1xh;center,top&resize=480:
