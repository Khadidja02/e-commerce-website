import React,{useState, useEffect} from 'react'
import axios from 'axios'

import './Productsviews.css'
import {FaShippingFast} from "react-icons/fa"
import {TbTruckReturn} from "react-icons/tb"
import {BsFillCreditCardFill,BsHeadphones} from "react-icons/bs"
import AddToCartButton from './AddToCartButton'
import { useParams } from 'react-router-dom';


function ProductViews() {
  const { slug } = useParams(); // Get the productId from the URL
  const [product, setProduct] = useState(null);

  
  useEffect(() => {
    // Fetch the product details based on the productId
    axios
      .get(`http://localhost:8000/apy/products/${slug}/`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error('Error fetching product details:', error);
      });
  }, [slug]);

  if (!product) {
    return <p>Loading product details...</p>;
  }

  return (
    <>
      <div className='pparent'>
            <div className='parentViews1'>
             <div className='imageviews'>
                <img src={product.image} alt={product.title}className='image1views'/>
              </div>
              <div className='descripviews'>
                <h6 className='title-productviews'>{product.title}</h6>
                <div className='prodduscrip'>
                  <h6 className='titleprodview'>Description</h6>
                <div className='paragrprod'>
                  <p>{product.description}</p>                  
                </div>
             </div>
                <div className='color-products'>
                       <label className='labelproduct'>Color: Blue</label>
                      <div className='pool-colors'>
                          <div className='Borderofcolors'>
                              <div className='bckgrd-product1'>a</div>
                          </div>
                        <div className='Borderofcolors'>
                           <div className='bckgrd-product2'>b</div>
                        </div>
                        <div className='Borderofcolors'>
                            <div className='bckgrd-product3'>c</div>
                         </div>
                         <div className='Borderofcolors'>
                            <div className='bckgrd-product3'>c</div>
                         </div>
                      </div>
                </div>
                
                <div className='color-products'>
                  <label className='labelproduct'>Size: XS</label>
                  <div className='pool-colors'>
                    <div className='sizeprod'>Xs</div>
                    <div className='sizeprod'>S</div>
                    <div className='sizeprod'>M</div>
                    <div className='sizeprod'>L</div>
                  </div>
                </div>
                <div className='price-prdou' >
                  <p className='labelproduct'>Price: {product.price}$ </p>
                  
                </div>
                
                <AddToCartButton productId={product.slug} onClick={() => console.log(product.slug)} />
              </div>

          </div>
           
             <div className='iconviewprod'>
                <div className='iconviewchilds1'>
                    <p className='pragrphicoprod'><FaShippingFast className='iconfontsviewprod' /></p>
                    <p className='titleiconprod'>Free shipping</p>
                    <p className='descripiconprod'>On orders over $50.00</p>
                  </div>
                <div className='iconviewchilds2'>
                  <p className='pragrphicoprod'><TbTruckReturn className='iconfontsviewprod' /></p>
                  <p className='titleiconprod'>Very easy to return</p>
                  <p className='descripiconprod'>Just phone number.</p>
                </div>
                <div className='iconviewchilds3'>
                <p className='pragrphicoprod'><BsFillCreditCardFill className='iconfontsviewprod' /></p>
                <p className='titleiconprod'>Flexible Payment</p>
                <p className='descripiconprod'>Pay with Multiple Credit Cards</p>
                </div>
                <div className='iconviewchilds4'>
                <p className='pragrphicoprod'><BsHeadphones className='iconfontsviewprod' /></p>
                <p className='titleiconprod'>Online Support</p>
                <p className='descripiconprod'>24 hours a day, 7 days a week</p>
                </div>

             </div>
        </div>

      </>
  )
}

export default ProductViews
