import React, { useEffect, useState } from "react";
import { getDogs, getTemp, postDog } from "../../actions";
import { Link, useNavigate } from 'react-router-dom';
import Home from "../Home/home.jsx";
import { useDispatch, useSelector } from "react-redux";
import "./FormCreated.css"


const urlPatternValidation = (URL) => {
    const regex = new RegExp(/(https?:\/\/.*\.(?:png|jpg))/);
    return regex.test(URL);
};


export const Form = () => {
    const dispatch = useDispatch();
    const allTemps = useSelector(state => state.temp)

    const [input, setInput] = useState({
        name: "",
        height_min: "",
        height_max: "",
        weight_min: "",
        weight_max: "",
        life_span: "",
        temperament: [],
        image: "",
    })

    const [errors, setErrors] = useState({});
    const [disabled, setDisabled] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getTemp());
    }, [dispatch]);

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
        console.log(input)
    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(postDog(input));
        alert('Creado Con Exito');
        setInput({
            name: "",
            height_min: "",
            height_max: "",
            weight_min: "",
            weight_max: "",
            life_span: "",
            temperament: [],
            image: "",
        })
        navigate('/home')
    }

    function handleSelect(e) {
        if (e.target.value) {
            setInput({
                ...input,
                temperament: [...input.temperament, e.target.value]
            })
            console.log(input.temperament)
        }
        if (!e.target.value) {
            input.temperament.splice(input.temperament.indexOf(e.target.value), 1);
            setInput({
                ...input,
            });
        } setErrors(
            validate({
                ...input,
                [e.target.name]: e.target.value
            })
        )
    }


    function validate(input) {
        let errors = {};
        if (input.temperament.length && input.temperament.length > 3) errors.temperament = "Seleccione maximo 3 Temperamentos"
        if (!input.name) errors.name = "Nombre Requerido!";
        if (input.life_span < 0) errors.life_span = "Inválido!";
        if (input.height_max < 0) errors.height_max = "Inválido!";
        if (input.height_min < 0) errors.height_min = "Inválido!";
        if (Number(input.height_max) < Number(input.height_min)) errors.height_max = "Inválido Altura Max debe ser Mayor que Min!";
        if (parseInt(input.height_min) > parseInt(input.height_max)) errors.height_min = "Inválido Altura Min debe ser Menor que Max!";
        if (input.weight_min < 0) errors.weight_min = "Inválido!";
        if (input.weight_max < 0) errors.weight_min = "Inválido!";
        if (Number(input.weight_max) < Number(input.weight_min)) errors.weight_max = "Inválido Peso Max debe ser Mayor que Min!";
        if (Number(input.weight_min) > Number(input.weight_max)) errors.weight_min = "Inválido Peso Min debe ser Menor que Max!";
        if (!urlPatternValidation(input.image) && input.image !== "")
            errors.image = "Formato no soportado";
        // if(!input.image) errors.image = ""
        return errors;
    }

    useEffect(() => {
        dispatch(getDogs());
    }, [dispatch, Home])

    function handleDelete(el) {
        setInput({
            ...input,
            temperament: input.temperament.filter(occ => occ !== el)
        })
    }
    useEffect(() => {
        if (            
            !errors.hasOwnProperty("temperament") &&
            !errors.hasOwnProperty("image") &&
            !errors.hasOwnProperty("name") &&
            !errors.hasOwnProperty("life_span") &&
            !errors.hasOwnProperty("height_min") &&
            !errors.hasOwnProperty("height_max") &&
            !errors.hasOwnProperty("weight_min") &&
            !errors.hasOwnProperty("weight_max")
        ) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [errors, input, setDisabled]);


    return (
        <div className="containerForm">
            <div className="containerForm2">
                <Link className="containerVolver" to="/home">
                    <div>
                        <button className="itemVolver">Volver</button>
                    </div>
                </Link>

                <form onSubmit={e => { handleSubmit(e) }}>
                    <h1 className="titleForm">Add Your Race</h1>
                    <section>
                        <div className="containerNameForm">
                            <label className="textInput">Name: </label><br/>
                            <input
                                className="inputName2"
                                type="text"
                                value={input.name}
                                name="name"
                                onChange={handleChange}
                                autoComplete="off"
                            />
                            {errors.name && (
                                <p className="errorMessageName">{errors.name}</p>
                            )}

                        </div>

                        <div className="containerNameForm">
                            <label className="textInput">Years: </label><br/>
                            <input
                                className="inputName2"
                                type="number"
                                name="life_span"
                                value={input.life_span}
                                onChange={handleChange}
                                autoComplete="off"
                            />
                            {errors.life_span &&
                                <p className="errorMessageName">{errors.life_span}</p>}

                        </div>

                        <div className="containerNameForm">
                            <label className="textInput2">Height Max: </label><br/>
                            <input
                                className="inputName2"
                                type="number"
                                name="height_max"
                                value={input.height_max}
                                onChange={handleChange}
                                autoComplete="off"
                            />
                            {errors.height_max &&
                                <p className="errorMessageName">{errors.height_max}</p>}
                        </div>

                        <div className="containerNameForm">
                            <label className="textInput2">Height Min: </label><br/>
                            <input
                                className="inputName2"
                                type="number"
                                name="height_min"
                                value={input.height_min}
                                onChange={handleChange}
                                autoComplete="off"
                            />
                            {errors.height_min &&
                                <p className="errorMessageName">{errors.height_min}</p>}
                        </div>

                        <div className="containerNameForm">
                            <label className="textInput2">Weight Max: </label><br/>
                            <input
                                className="inputName2"
                                type="number"
                                value={input.weight_max}
                                name="weight_max"
                                onChange={handleChange}
                                autoComplete="off" />
                            {errors.weight_max && (
                                <p className="errorMessageName">{errors.weight_max}</p>
                            )}
                        </div>

                        <div className="containerNameForm">
                            <label className="textInput2">Weight Min: </label><br/>
                            <input
                                className="inputName2"
                                type="number"
                                value={input.weight_min}
                                name="weight_min"
                                onChange={handleChange}
                                autoComplete="off" />
                            {errors.weight_min && (
                                <p className="errorMessageName">{errors.weight_min}</p>
                            )}
                        </div>

                        <div className="containerNameForm">
                            <label className="textInput">Image:</label><br/>
                            <input
                                className="inputName2"
                                type="text"
                                name="image"
                                value={input.image}
                                onChange={handleChange}
                                autoComplete="off"
                            />
                            {errors.image && (
                                <p className="errorMessageName">{errors.image}</p>
                            )}
                        </div>
                    </section>

                    <div className="containerNameForm">
                        <label className="textInput4">Temperaments</label><br/>
                        <select className="inputName2" onChange={handleSelect}>
                            <option>Seleccione al menos 1 opcion</option>
                            {allTemps.map(e => {
                                return <option
                                    name={e.name}
                                    value={e.name}
                                >{e.name}</option>
                            })}
                        </select>
                    </div>
                    <div>
                        {errors.temperament && (
                            <p className="errorsMessageTemp">{errors.temperament}</p>
                        )}
                        {!input.temperament.length ?
                            <p className="errorsMessageTemp">Temperament Required</p>
                        :null}

                    </div>
                    <div>

                        <button
                            className={disabled === true ? "itemVolver2":"itemVolver"}
                            type="submit" disabled={disabled}>
                            Enviar
                        </button>


                    </div>
                </form>
                <div className="containerTemp">
                {
                    input.temperament.map(el =>
                        <div className="containerTemp2">
                            <p className="pTemps">{el } </p>
                            <button className="buttonTemps" onClick={() => handleDelete(el)}>x</button>
                        </div>
                    )}
                    </div>
            </div>
        </div>
    )
}

