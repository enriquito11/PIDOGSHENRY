import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { filterTemperament, getTemperaments } from "../redux/actions/";
import './FilterTemperament.css'



export default function FilterTemp({paginate}){
    const temperament = useSelector((state)=> state.temperaments)
    const dispatch = useDispatch();
    
   
    
    useEffect(()=>{
        dispatch(getTemperaments());
        }, [dispatch])
    
    function onFilterTemperament(e){
        e.preventDefault()
        dispatch(filterTemperament(e.target.value))
        paginate(1)
    }

    return(
        <div>
            <select className="select-temperament" onChange={onFilterTemperament}>
                <option value='All Temperaments' key='All Temperaments'>All Temperaments</option>
                {temperament.map((el, index)=> (
                    <option value={el.name} key={index}>{el.name}</option>
                ))}
            </select>
        </div>
    )
}