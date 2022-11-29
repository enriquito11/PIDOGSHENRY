import { Link } from "react-router-dom";
import './HomeCard.css'



export default function BreedCard({id, img, name, weightMin, weightMax, temperament}){

    return(
        <div className="card-container">
            <div>
                <img src={img} alt="img" />
                <Link to={`/home/${id}`} style={{textDecoration: 'none', color: "white", textAlign: 'center'}}>
                <h3>{name}</h3>
                </Link>
                <h4>Weight: </h4><div><p> Min: {weightMin}/kg - Max: {weightMax}/kg</p></div> 
                <h4>Temperament:</h4><p> {temperament}</p>                
            </div>
        </div>
    )
}