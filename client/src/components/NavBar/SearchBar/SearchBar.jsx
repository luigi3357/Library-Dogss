import { React, useState } from "react";
import { useDispatch } from "react-redux";
import { getSearch } from "../../../actions";
import "./SearchBar.css"

export const SearchBar = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState('')

 function handleInputChange (e){
     e.preventDefault();
     setName(e.target.value)
 }

 function handleSubmit(e){
     e.preventDefault();
     dispatch(getSearch(name))
     setName('')
 }

    return (
        <div className="coontainerSearchBar">
            <input className="inputSearchbar" onChange={e=>{handleInputChange(e)}} type='text' placeholder="Search" value={name}></input>
            <button className="buttonSearchbar" onClick={e=>{handleSubmit(e) }} type='submit'>Search</button>
        </div>

    )
}