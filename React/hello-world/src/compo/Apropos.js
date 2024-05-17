import React from 'react';
import './Apropos.css';
import { Link } from 'react-router-dom';

function Apropos() {
    return (
        <div className='section bckg'>
            <div className='items'>
                <h6 className='StyleN'>Select Your New Perfect Style</h6>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.<br/>
                 Dignissimos alias, quis reprehenderit consectetur veritatis </p>
                <Link className='botnpropos' to="/Products"><button className='botns'>Shop Now !</button></Link>

            </div>
            
            </div> 
        
        
    )
}

export default Apropos;