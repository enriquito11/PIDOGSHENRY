import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getBreedsId } from "../redux/actions/";
import Loader from "./Loader";
import './Detail.css'


export default function Detail(props){
    const dispatch = useDispatch();
    const breedId = useSelector((state) => state.breedsDetail)
    
    useEffect(()=> {
        dispatch(getBreedsId(props.match.params.id))
    }, [dispatch, props.match.params.id])
    
    return (
        <div className="main-detail">   
            <div className="home_create_container">
                <Link to="/home">
                    <button className="home-detail">Home</button>
                </Link>
                <Link to="/newBreed">
                    <button className="create-detail">Create Breed</button>
                </Link>
            </div>         
                {breedId.length === 0 ? (
                <div className="loader-detail"><Loader/></div>) : 
                (                     
                <div>
                {breedId.map(breedId => {  
                    return( 
                    <div className="detail-card" key={breedId.id}>                     
                        <img src={breedId.image} alt='img'/>   
                        <h2>{breedId.name}</h2>    
                        <div><h4>Weight:</h4> <p>Min: {breedId.weightMin}/kg - Max: {breedId.weightMax}/kg</p></div>
                        <div><h4>Height:</h4> <p>Min: {breedId.heightMin}/cm - Max: {breedId.heightMax}/cm</p></div>
                        <div><h4>Life-Span:</h4><p>Min: {breedId.life_span_min} - Max: {breedId.life_span_max}</p></div>
                        <div><h4>Temperaments:</h4><p>{breedId.temperament}</p></div>
                    </div>
                     )})}
             </div> 
              
            
    )} 
        </div>
        )
}