import React from 'react'
import {FaShippingFast} from "react-icons/fa"
import {TbTruckReturn} from "react-icons/tb"
import {BsFillCreditCardFill,BsHeadphones} from "react-icons/bs"
import'./style.css'
import bckimage from './image/counters-bg.jpg'
function Features() {
  return (
    <div>


      {/*
      <div className='iconviewprod'>
              
             
                <div className='iconviewchilds4 col-3'>
                <p className='pragrphicoprod'><BsHeadphones className='iconfontsviewprod' /></p>
                <p className='titleiconprod'>Online Support</p>
                <p className='descripiconprod'>24 hours a day, 7 days a week</p>
                </div>

             </div>*/}
             <div className="section-counter paralax-mf bg-image"  style={{ backgroundImage:  `url(${bckimage})`  }}>
             <div className="overlay-mf"></div>
             <div className="container position-relative">
               <div className="row mt-5">
                 <div className="col-sm-3 col-lg-3">
                   <div className="counter-box counter-box pt-4 pt-md-0">
                     <div className="counter-ico">
                       <span className="ico-circle"><FaShippingFast className='iconfontsviewprod' /></span>
                     </div>
                     <div className="counter-num">
                       <p data-purecounter-start="0" data-purecounter-end="450" data-purecounter-duration="1" className="counter purecounter"></p>
                       <span className="counter-text text-uppercase  mb-2">Free shipping</span>
                       <p data-purecounter-start="0" data-purecounter-end="450" data-purecounter-duration="1" className="counter purecounter"></p>
                       <span className="counter-text text-uppercase ">On orders over $50.00</span>
                     </div>
                   </div>
                 </div>
                 <div className="col-sm-3 col-lg-3">
                   <div className="counter-box pt-4 pt-md-0">
                     <div className="counter-ico">
                       <span className="ico-circle"><TbTruckReturn className='iconfontsviewprod' /></span>
                     </div>
                     <div className="counter-num">
                       <p data-purecounter-start="0" data-purecounter-end="25" data-purecounter-duration="1" className="counter purecounter"></p>
                       <span className="counter-text text-uppercase mb-2">Very easy to return</span>
                       <p data-purecounter-start="0" data-purecounter-end="25" data-purecounter-duration="1" className="counter purecounter"></p>
                       <span className="counter-text text-uppercase">Just phone number.</span>
                     </div>
                   </div>
                 </div>
                 <div className="col-sm-3 col-lg-3">
                   <div className="counter-box pt-4 pt-md-0">
                     <div className="counter-ico">
                       <span className="ico-circle"><BsFillCreditCardFill className='iconfontsviewprod' /></span>
                     </div>
                     <div className="counter-num">
                       <p data-purecounter-start="0" data-purecounter-end="550" data-purecounter-duration="1" className="counter purecounter"></p>
                       <span className="counter-text text-uppercase mb-2">Flexible Payment</span>
                       <p data-purecounter-start="0" data-purecounter-end="550" data-purecounter-duration="1" className="counter purecounter"></p>
                       <span className="counter-text text-uppercase">Pay with Multiple Credit Cards</span>
                     </div>
                   </div>
                 </div>
                 <div className="col-sm-3 col-lg-3">
                   <div className="counter-box pt-4 pt-md-0">
                     <div className="counter-ico">
                       <span className="ico-circle"><BsHeadphones className='iconfontsviewprod' /></span>
                     </div>
                     <div className="counter-num">
                       <p data-purecounter-start="0" data-purecounter-end="48" data-purecounter-duration="1" className="counter purecounter"></p>
                       <span className="counter-text text-uppercase mb-2">Online Support</span>
                       <p data-purecounter-start="0" data-purecounter-end="48" data-purecounter-duration="1" className="counter purecounter"></p>
                       <span className="counter-text text-uppercase">24 hours a day, 7 days a week</span>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
           </div>
  </div>
      );
    }

export default Features;
