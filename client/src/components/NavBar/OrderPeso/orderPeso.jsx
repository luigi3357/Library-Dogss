import React from "react";
import { orderByWeight } from "../../../actions";
import { useDispatch } from "react-redux";

export const OrderPeso = ({ setCurrentPage, setOrden, orden }) => {
    const dispatch = useDispatch();

    function handleOrderByWeight(e) {
        e.preventDefault();
        dispatch(orderByWeight(e.target.value));
        setCurrentPage(1);
        setOrden({
            ...orden,
            orden: `Ordenado ${e.target.value}`
        })
    }

    return (
        <div >
            <select className="filterCreated" onChange={e => { handleOrderByWeight(e) }}>
                <option value='weight'>Sort by Major Weight</option>
                <option value='weight_desc'>Sort by Smaller Weight </option>
            </select>
        </div>
    )
}