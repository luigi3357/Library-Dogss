import React from "react";
import { orderByName } from "../../../actions";
import { useDispatch } from "react-redux";

export const OrderName = ({ setCurrentPage, setOrden, orden }) => {
    const dispatch = useDispatch();
    function handleOrderByName(e) {
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setCurrentPage(1);
        setOrden({
            ...orden,
            orden: `Ordenado ${e.target.value}`
        })
    }
    return (

        <div >
            <select className="filterCreated" onChange={e => { handleOrderByName(e) }}>
                <option className="option">Order</option>
                <option className="option" value='asc'>Order A/Z</option>
                <option className="option" value='desc'>Order Z/ A</option>
            </select>
        </div>
    )
}