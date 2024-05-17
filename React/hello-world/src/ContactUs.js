import React, { useState } from "react";
import "./ContactUs.css";
import axios from "axios";
import { ContactUrl } from "./Utils";

function ContactUs() {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    address: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(ContactUrl, formData)
      .then((response) => {
        // Handle the response, e.g., show a success message to the user
        console.log("Form submitted successfully", response.data);
      })
      .catch((error) => {
        console.error("Error submitting form", error);
      });
  };

  return (
    <>
      <div className="parent-Contact">
        <div className="child1-contact"></div>
        <div className="child2-contact">
          <p className="text-contact">Contact Us</p>
          <form className="form-contact" onSubmit={handleSubmit}>
            <div className="email-contact">
              <label className="label-contact">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter a valid email"
                className="child-contact"
              />
            </div>
            <div className="name-contact">
              <label className="label-contact">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your name"
                className="child-contact"
              />
            </div>
            <div className="adress-contact">
              <label className="label-contact">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Enter your address location"
                className="child-contact"
              />
            </div>
            <div className="message-contact">
              <label className="label-contact">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Enter Your Message"
                rows={5}
                cols={25}
                className="child-contact"
              ></textarea>
            </div>
            
          </form>
          <div className="submit-contact">
              <button type="submit" className="submit-child-contact">
                Submit
              </button>
            </div>
        </div>
      </div>
    </>
  );
}

export default ContactUs;
