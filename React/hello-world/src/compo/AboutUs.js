import React from "react";
import './AboutUs.css'
import { Link } from "react-router-dom";

function About(){
    return (
        <div className="parent-About">
            <p className="titre">What We Do</p>
            <div className="line-titles"></div>
            <p className="child-about">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore, aspernatur.<br/> 
                Perspiciatis itaque dicta similique veritatis nemo tenetur vel, 
                Lorem ipsum dolor sit amet, <br/>consectetur adipisicing elit. Labore, aspernatur.<br/>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore, aspernatur.</p>
                <Link to ="/About" > <button className="butn"> See more </button></Link> 
        </div>
    )
}
export default About;