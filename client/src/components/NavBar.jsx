import { Link } from "react-router-dom";
import SearchName from "./SearchName";
import FilterTemperament from "./FilterTemperament";
import Orders from './Orders';
import FilterBreeds from './FilterBreeds';
import './Navbar.css'


export default function Nav({paginate}){
    return (
        <div className="nav-container">
        
            <button onClick={() => window.location.reload()}>Home</button>
            
            <SearchName 
            paginate={paginate} />

            <Orders 
            paginate={paginate} />

            <FilterBreeds 
            paginate={paginate} />

            <FilterTemperament
            paginate={paginate}
             />

            <Link to="/newBreed">
                <button>Add New Breed</button>
            </Link>
            
        </div>
    )
}