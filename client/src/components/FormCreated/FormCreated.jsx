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
        height_max:"",
        weight_min: "",
        weight_max: "",
        life_span: "",
        temperament: [],
        image: "",
    })
    
    const [errors, setErrors] = useState({});
    const [disabled, setDisabled] = useState(true);
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
            height_max:"",
            weight_min: "",
            weight_max: "",
            life_span: "",
            temperament: [],
            image: "",
        })
        navigate('/')
    }

    function handleSelect(e) {
        if(e.target.value){
            setInput({
                ...input,
                temperament: [...input.temperament, e.target.value]
            })
            console.log(input.temperament)
        }
        if(!e.target.value){
            input.temperament.splice(input.temperament.indexOf(e.target.value), 1);
                  setInput({
                    ...input,
                  });
        }setErrors(
            validate({
                ...input,
                [e.target.name]: e.target.value
            })
        )     
    }
   

    function validate(input) {
        let errors = {};
        if (!input.temperament.length) errors.temperament="Temperamento Requerido";
        if(input.temperament.length > 3)errors.temperament="Seleccione maximo 3 Temperamentos"
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
    
   function handleDelete(el){
        setInput({
            ...input,
            temperament : input.temperament.filter(occ => occ !== el) 
        })
    }
    useEffect(() => {
        if (           
            !errors.hasOwnProperty("temperament")&&
            !errors.hasOwnProperty("image") &&
            !errors.hasOwnProperty("name") &&
            !errors.hasOwnProperty("life_span") &&
            !errors.hasOwnProperty("height_min") &&
            !errors.hasOwnProperty("height_max") &&
            !errors.hasOwnProperty("weight_min")&&
            !errors.hasOwnProperty("weight_max")
        ) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [errors, input, setDisabled]);


    return (
        <div>
            <Link className="containerVolver" to="/home">
                <div>                   
                    <button className="itemVolver">Volver</button>
                </div>
            </Link>
                       
            <form onSubmit={e => { handleSubmit(e) }}>
                <h1 className="titleForm">Agrega tu Raza</h1>
                <section>
                    <div>
                        <label className="textInput">Nombre: </label>
                        <input
                            className="inputName"
                            type="text"
                            placeholder="Nombre"
                            value={input.name}
                            name="name"
                            onChange={handleChange}
                            autoComplete="off"
                        />
                        {errors.name && (
                            <p className="errorMessageName">{errors.name}</p>
                        )}

                    </div>

                    <div>
                        <label className="textInputYear">Años: </label>
                        <input
                            className="inputYear"
                            placeholder="Años de Vida"
                            type="number"
                            name="life_span"
                            value={input.life_span}
                            onChange={handleChange}
                            autoComplete="off"
                        />
                        {errors.life_span &&
                            <p className="errorMessageLife">{errors.life_span}</p>}

                    </div>

                    <div>
                        <label className="textInputHeight_max">Altura max: </label>
                        <input
                            placeholder="Altura Maxima"
                            className="inputheight_max"
                            type="number"
                            name="height_max"
                            value={input.height_max}
                            onChange={handleChange}
                            autoComplete="off"
                        />
                        {errors.height_max &&
                            <p className="errorMessageHeigthMax">{errors.height_max}</p>}
                    </div>

                    <div>
                        <label className="textInputHeight_min">Altura min: </label>
                        <input
                            className="inputheight_min"
                            placeholder="Altura Minima"
                            type="number"
                            name="height_min"
                            value={input.height_min}
                            onChange={handleChange}
                            autoComplete="off"
                        />
                        {errors.height_min &&
                            <p className="errorMessageHeigthMin">{errors.height_min}</p>}
                    </div>
                   
                    <div>
                        <label className="textInputweight_max">Peso max: </label>
                        <input
                            className="inputweight_max"
                            placeholder="Peso Máximo"
                            type="number"
                            value={input.weight_max}
                            name="weight_max"
                            onChange={handleChange}
                            autoComplete="off" />
                        {errors.weight_max && (
                            <p className="errorMessageWeigthMax">{errors.weight_max}</p>
                        )}
                    </div>
                    <div>

                        <label className="textInputweight_min">Peso min: </label>
                        <input
                            className="inputweight_min"
                            placeholder="Peso Minimo"
                            type="number"
                            value={input.weight_min}
                            name="weight_min"
                            onChange={handleChange}
                            autoComplete="off" />
                        {errors.weight_min && (
                            <p className="errorMessageWeigthMin">{errors.weight_min}</p>
                        )}
                    </div>

                    


                    <div>
                        <label className="textInputImage">Imagen:</label>
                        <input
                        className="inputImage"
                        placeholder="Image"
                            type="text"
                            name="image"
                            value={input.image}
                            onChange={handleChange}
                            autoComplete="off"
                        />
                        {errors.image && (
                            <p className="errorMessageImage">{errors.image}</p>
                        )}
                    </div>
                </section>

                <div> 
                {/* <label className="titleTemp">Temperamentos</label> */}
                        <select className="selectTemp" onChange={handleSelect}>
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

                    </div>
                <div>

                <button 
                className="submitButton"
                 type="submit" disabled={disabled}>
                    Enviar
                </button>                    
                   

                </div>               
            </form>           
            {
            input.temperament.map(el => 
                <div className="containerTemp">
                    <p className="pTemps">{el}</p>
                    <button className="buttonTemps" onClick={() => handleDelete(el)}><p className="textButonX">x</p></button>
                </div>
            )}
            <img className="img_Form" src="https://image.freepik.com/vector-gratis/etapa-podio-redonda-rayos-focos-realista_107791-448.jpg" alt="Not Found"/>

        </div>
    )
}

