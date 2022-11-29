import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBreed, getTemperaments } from "../redux/actions";
import { Link } from "react-router-dom";
import "./addBreed.css"



export const AddBreed = () => {
    const [input, setInput] = useState({          //setear valores iniciales
        name: "",
        heightMin:0,
        heightMax:0,
        weightMin:0,
        weightMax:0,
        life_span_min:0,
        life_span_max:0,
        temperament:[],
        image:""
    })

    const [errors, setErrors] = useState({
        name: "name is required",
        heightMin:"height min is required",
        heightMax:"height max is required",
        weightMin:"weight min is required",
        weightMax:"weight max is required",
        life_span_min:"life span min is required",
        life_span_max:"life span max is required",
        temperament:"Choose a temperament please"
    })
    const validate = function(input){
        let errors = {}
        if(!input.name){
            errors.name = "name is required"
        }
        else if(!/^[a-zA-Z\s]*$/.test(input.name)) {
            errors.name = "Solo debe contener letras y espacios";
        }
        if(!input.heightMin){
            errors.heightMin = "Min height is required"
        }
        if(!input.heightMax){
            errors.heightMax = "Max height is required"
        }
        if(!input.weightMin){
            errors.weightMin = "Min weight is required"
        }
        if(!input.weightMax){
            errors.weightMax = "Max weight is required"
        }
        if(!input.life_span_min){
            errors.life_span_min = "Min Life span is required"
        }
        if(!input.life_span_max){
            errors.life_span_max = "Max Life span is required"
        }
        if(input.heightMin <= 0 ){
            errors.heightMin = "Must be a value greater or equial than 1"
        }
        if(input.heightMax <= 0 ){
            errors.heightMax = "Must be a value greater or equial than 1"
        }
        if(input.weightMin <= 0 ){
            errors.weightMin = "Must be a value greater or equial than 1"
        }
        if(input.weightMax <= 0 ){
            errors.weightMax = "Must be a value greater or equial than 1"
        }
        if(input.life_span_min <= 0 ){
            errors.life_span_min = "Must be a value greater or equial than 1"
        }
        if(input.life_span_min > 15 ){
            errors.life_span_min = "Must be a less or equal than 15"
        }
        if(input.life_span_max <= 0 ){
            errors.life_span_max = "Must be a value greater or equial than 1"
        }
        if(input.life_span_max >= 15 ){
            errors.life_span_max = "Must be a value less or equal than 15"
        }
        if(input.temperament.length === 0){
            errors.temperament = "Select at least 1 temperament"
        }
        

        return errors

    } 




    const dispatch = useDispatch()
    const temps = useSelector(state => state.temperaments)
    

    const handleChangeInput = (e) => {
        e.preventDefault()
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name] : e.target.value
        }))
    }



    const handleChangeSelect = (e) =>{
        e.preventDefault()
        setInput({
            ...input,
            temperament: [...new Set([...input.temperament, e.target.value])]
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
        document.getElementById("temps").selectedIndex = 0
    }


    function handleDelete(e){
        e.preventDefault()
        setInput({
            ...input,
            temperament: input.temperament.filter(element => element !== e.target.value)
        })
    }

    console.log(errors)
    console.log(input)

    function handleOnSubmit(e){
        e.preventDefault()
        if(errors.hasOwnProperty("name") || errors.hasOwnProperty("heightMin") || errors.hasOwnProperty("heightMax") || errors.hasOwnProperty("weightMin") ||
        errors.hasOwnProperty("weightMax") || errors.hasOwnProperty("life_span_min") || errors.hasOwnProperty("life_span_max") || errors.hasOwnProperty("temperament")
        ){
           return alert('Please check all fields')
        }else{
            dispatch(createBreed(input))
            alert('Breed created')
            setInput({
                name: "",
                heightMin:0,
                heightMax:0,
                weightMin:0,
                weightMax:0,
                life_span_min:0,
                life_span_max:0,
                temperament:[],
                image:""
            })
            window.location.replace("http://localhost:3000/home")
        }
    }

    useEffect(()=>{
        dispatch(getTemperaments())
    },[dispatch])


    return(
        <div className="form-div-zero">

                <Link to="/home">
                    <button className="home-detail">Home</button>
                </Link>
                
          
            <form onSubmit={(e) => handleOnSubmit(e)}>
                <div className="div-form">
                    <div>
                        <label>Name</label>
                        <br/>
                        <input name="name"
                        onChange={(e)=>{handleChangeInput(e)}}
                        />
                        {errors.name && (
                            <p>{errors.name}</p>
                        )}
                    </div>
                    <div>
                        <label>Height Min</label>
                        <br/>
                        <input name="heightMin"
                        type="number"
                        onChange={(e)=>{handleChangeInput(e)}}/>
                        {errors.heightMin && (
                            <p>{errors.heightMin}</p>
                        )}
                    </div>
                    <div>
                        <label>Height Max</label>
                        <br/>
                        <input name="heightMax"
                        type="number"
                        onChange={(e)=>{handleChangeInput(e)}}/>
                        {errors.heightMax && (
                            <p>{errors.heightMax}</p>
                        )}
                    </div>
                    <div>
                        <label>Weight Min</label>
                        <br/>
                        <input name="weightMin"
                        type="number"
                        onChange={(e)=>{handleChangeInput(e)}}/>
                        {errors.weightMin && (
                            <p>{errors.weightMin}</p>
                        )}
                    </div>
                    <div>
                        <label>Weight Max</label>
                        <br/>
                        <input name="weightMax"
                        type="number"
                        onChange={(e)=>{handleChangeInput(e)}}/>
                        {errors.weightMax && (
                            <p>{errors.weightMax}</p>
                        )}
                    </div>
                    <div>
                        <label>LifeSpan Min</label>
                        <br/>
                        <input name="life_span_min"
                        type="number"
                        onChange={(e)=>{handleChangeInput(e)}}/>
                        {errors.life_span_min && (
                            <p>{errors.life_span_min}</p>
                        )}
                    </div>
                    <div>
                        <label>LifeSpan Max</label>
                        <br/>
                        <input name="life_span_max"
                        type="number"
                        onChange={(e)=>{handleChangeInput(e)}}/>
                        {errors.life_span_max && (
                            <p>{errors.life_span_max}</p>
                        )}
                    </div>
                    <div>
                        <label>Image</label>
                        <br/>
                        <input name="image"
                        onChange={(e)=>{handleChangeInput(e)}}/>

                    </div>
                    <div>
                        <label>Temperaments</label>
                        <br/>
                        <select id="temps" name="temperament" onChange={(e)=>{handleChangeSelect(e)}}>
                            <option>All Temperaments</option>
                            {temps && temps.map((el)=>{
                                return(
                                    
                                    <option key={el.id} value={el.name}>{el.name}</option>
                                )
                            })}
                        </select>
                        { errors.temperament &&(
                            <p>{errors.temperament}</p>
                        )}
                    </div>
                        <div>
                            <button type="submit">Submit</button>
                        </div>
                    </div>

                    <div>
                    {
                        input.temperament && input.temperament.map((el,key)=>{
                            return(
                                <div className="displayTemps">
                                    <button value={el} key={key}>{el}</button><button onClick={(e) => handleDelete(e)} value={el}>X</button>
                                </div>
                            )
                        })
                    }
                    </div>

            </form>

        </div>
    )

}

export default AddBreed