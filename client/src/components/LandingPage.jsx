import React from "react";
import { Link } from "react-router-dom";
import './LandingPage.css'



export default function LandingPage() {

    return (
        <div className="landing-container">
            <div className="button-home">
                <div>
                    <h1 className="title-landing">Dogs App</h1>
                    <Link to={'/home'}>
                    <button className="button-landing">Enter</button>
                    </Link>
                </div>
            </div>

        </div>
    )
}