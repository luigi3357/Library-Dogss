
import React from "react";
import { NavLink } from 'react-router-dom';
import { Created } from "./DogCreated/Created";
import { FilterCreated } from "./Filter/filterCrated";
import { FilterTemp } from "./Filter/FilterTemp";
import { OrderName } from "./OrderName/orderName";
import { OrderPeso } from "./OrderPeso/orderPeso";
import { Refresh } from "./refresh/Refresh";
import { SearchBar } from "./SearchBar/SearchBar";
import { ButonVolver } from "./Volver/ButonVolver";
import "./Navbar.css"

export const NavBar = ({ setCurrentPage, setOrden, orden }) => {

    return (
        <div className="containerNavBar">
            <div className="ContainerButtonNavbar">
                <Created />
                <ButonVolver />
                <Refresh />
            </div>
            <div className="ContainerFilterNavbar">
                <OrderName setOrden={setOrden} orden={orden} setCurrentPage={setCurrentPage} />
                <OrderPeso setOrden={setOrden} orden={orden} setCurrentPage={setCurrentPage} />
            <SearchBar />
                <FilterCreated setCurrentPage={setCurrentPage} />
                <FilterTemp setCurrentPage={setCurrentPage} />
             </div>
            <h1 className="title">Library Dogs</h1>
        </div>
    )
}


