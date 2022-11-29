import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getBreeds, clean, getTemperaments } from "../redux/actions/";
import HomeCard from "./HomeCard.jsx";
import NavBar from "./NavBar.jsx";
import Paginado from "./Paginado.jsx";
import './Home.css'
import Loader from "./Loader";




export default function Breeds(){
    let breeds = useSelector((state)=> state.breeds);
    let dispatch = useDispatch();
    

    

    
    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage] = useState(8);
    
    
    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentPosts = breeds.slice(indexOfFirstPost, indexOfLastPost);
    
    
    const paginate = (pageNumber) => setCurrentPage(pageNumber);


    
    

    useEffect(() => {
        dispatch(getBreeds());
        dispatch(clean())
        dispatch(getTemperaments())
        }, [dispatch])
    
    return(
        <div className="main-home">
            
            
            <div>
                <NavBar 
                paginate={paginate}/>
            </div>

        

           
            
            <div>
            <Paginado
            postPerPage={postPerPage}
            totalPost={breeds.length}
            paginate={paginate}
            currentPage={currentPage}
          />  
            </div>
          
            
            {breeds.length === 0 ? (
                <div className="div-loader">
                    
                    <Loader/>
                </div> 
                ):( 

           <div>
             {
                currentPosts.map(e=> (
                    <HomeCard
                    key={e.id}
                    id={e.id}
                    img={e.image}
                    name={e.name}
                    weightMin={e.weightMin}
                    weightMax={e.weightMax}                    
                    temperament={e.temperament}
                    />
                ))
            
            }
            </div> 
    )}
          </div>
        
    )
}