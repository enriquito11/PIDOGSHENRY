import React, {useState} from "react"
import { useDispatch } from "react-redux"
import { reload } from "../redux/actions"




export default function Loader(){
    let[showing, isShowing] = useState(false)
    let dispatch = useDispatch()

    function handleReload(e){
        dispatch(reload())
    }

    setTimeout(() => {isShowing(true)}, 4000)

    return(
        <div className="loader-main">
            <div className="loader-son">
                <img src= 'https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif' alt='loading' />
            
                {showing !== false ? (<button className="button-reload" onClick={(e)=>handleReload(e)}>Reload</button>) : ""}
            
            </div>
        </div>
    )
}