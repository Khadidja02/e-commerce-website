import React from "react";
import Apropos from './compo/Apropos';
import Featured from './compo/FeaturedPro';
import AboutUs from './compo/AboutUs';
import LeatestPro from './compo/LeatestPro'
import Features from "./Features";





function Home(){
    return(
       
        <div>
            
            <Apropos/>
            <Featured/>
            <AboutUs /> 
            <Features/>
              
            <LeatestPro/> 
            
            
            
        </div>
        
    
       
    )
}
export default Home;
