import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { getDogs } from "../../actions";
import Home from "../Home/home";
import './landingPage.css'



export default function LandingPage() {
 

    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getDogs());
    }, [Home])

    return (
        <div className="containerLanding" >
            <h1 className="Landing_h1">
                Bienvenidos a la pagina de perritos
            </h1>
            <div>               
                    <div className="list">
                        <div className="list-item">
                            <Link className="listLink" to="/Home">
                                <button className="list-a" ><p className="textHome" >Home</p></button>
                            </Link>
                        </div>
                    </div>               
            </div>
            <img className="imageLanding" src="https://i.pinimg.com/originals/f3/3b/a6/f33ba6295d7ab1a0c07f6c1f0d890012.jpg" alt=" " />
            <Outlet />
           
        </div>
    )
}