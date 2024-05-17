import React from "react";
import { FaFacebook} from "react-icons/fa";
import {FaInstagram} from "react-icons/fa";
import {FaSnapchatGhost} from "react-icons/fa";
import {FaMapMarkerAlt} from "react-icons/fa";
import './Footer.css'

function Footer(){
    return(
        <footer>
            <div className="content1-footer">
                <div className="logo-footer">
                    <a href="#" >
                        <img src="https://cdn.logo.com/hotlink-ok/logo-social.png" className='logo' />
                    </a>
                </div>
                <div className="lists-footer">
                    <div className="listy">
                        <ul className="list-footer2">
                        <li><a src='#' className="list-footer" > Home</a></li>
                        <li><a src='#' className="list-footer">AboutUs</a></li>
                        <li><a src='#'className="list-footer" >Shop</a></li>
                        </ul>
                    </div>
                    <div className="listy">
                     <ul className="list-footer2">
                            <li><a src='#' className="list-footer"> Card</a></li>
                            <li><a src='#' className="list-footer">ContactUs</a></li>
                            <li><a src='#'className="list-footer" >Terms&Policy</a></li>
                            
                        </ul>
                    </div>
                </div>
                <div className="content-icons">
                    <p className="social">Social Media</p>
                    <div className="footer-part">

                        <FaFacebook className="icon-footer"/>
                       <FaInstagram className="icon-footer"/>
                        <FaSnapchatGhost className="icon-footer"/>
                        
                         

                    </div>
                    
                    <p className="footer-para"><FaMapMarkerAlt className="icon-footer1"/> 7 rue des Fleurs 37000 Tours </p>
                    
                </div>
            </div>
            <div className="content2-footer">
                <p className="copyright">Copyright&#169; 2023 All right reserved</p>
                <hr className="line-footer"/>

            </div>
        </footer>
    )
}
export default Footer;