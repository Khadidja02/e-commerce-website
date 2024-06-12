import React,{useState, useEffect} from 'react'
import axios from 'axios'
import Features from './Features'
import './Productsviews.css'

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
           
             <Features/>
        </div>

      </>
  )
}

export default ProductViews
