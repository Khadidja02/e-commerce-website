import React, { useState, useEffect } from 'react';
import './About.css'
import { AboutUrl } from './Utils';
import axios from 'axios';

const THE_BACKEND_DOMAIN = "http://localhost:8000";

function About() {
  const [aboutUsData, setAboutUsData] = useState(null);

  useEffect(() => {
    axios.get(AboutUrl)
      .then((response) => {
        setAboutUsData(response.data); // Access the data directly
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <div className='background-About'>
        <h2 className='text-about'>About Us</h2>
      </div>
      <div className='DivOf-About'>
        {aboutUsData && (
          <div className='child-DivOf'>
            <div className='child1-DivOf'>
              <h3 className='title-about'>{aboutUsData.title}</h3>
              <p className='paragraph-about'>{aboutUsData.paragraph}</p> {/* Fix paragraph tag */}
              <h2>Q&A</h2>
              <p>{aboutUsData.q_and_a}</p> {/* Make sure the API provides q_and_a data */}
            </div>
            <div className='child2-DivOf'>
              <div className='child1-image'>
                <div className='child2-image'>
                  <img className='image-about' src={`${aboutUsData.image}`} alt="About Us" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default About;
