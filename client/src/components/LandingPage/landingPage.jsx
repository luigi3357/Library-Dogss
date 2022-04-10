import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { getDogs } from "../../actions";
import Home from "../Home/home";
import Dog from "../../assets/Dog.jpg"
import './landingPage.css'



export default function LandingPage() {
 

    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getDogs());
    }, [Home])

    return (
        <div className="containerLanding" >
            <h1 className="Landing_h1">
            You are welcome to the dog library
            </h1>
            <img className="imageLanding" 
            src="https://c4.wallpaperflare.com/wallpaper/21/1005/307/4k-dog-funny-animals-cookie-wallpaper-preview.jpg"
             alt=" " />
         
            <div className="list">
                        <div className="list-item">
                            <Link className="listLink" to="/Home">
                                <button className="list-a" ><p className="textHome" >Home</p></button>
                            </Link>
                        </div>
                    </div> 
           
        </div>
    )
}