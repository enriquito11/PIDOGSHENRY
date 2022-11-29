import React from "react";
import './Paginado.css'


export default function Pagination({postPerPage, totalPost, paginate, currentPage}) {

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPost / postPerPage); i++){
        pageNumbers.push(i);
    }


    

    return (
        <div className="paginado-container">
               
            <ul>
                <button className="button-prev"
                onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1 )}>
                   Prev 
                </button> 
                {pageNumbers.map(number => (
                    <button className="button-pages" key={number} onClick={()=> paginate(number)}>
                    {number}
                    </button>                    
                ))}
                <button className="button-next"
                onClick={() => paginate(currentPage < pageNumbers.length ? currentPage + 1 : pageNumbers.length)} >
                    Next
                </button> 
            </ul>
                
        </div>
    )
}