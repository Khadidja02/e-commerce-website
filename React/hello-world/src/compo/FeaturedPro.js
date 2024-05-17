import React, { useState, useEffect } from "react";
import axios from "axios";
import './FeaturedPro.css'

function Featured() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const BACKEND = "http://localhost:8000/"

    useEffect(() => {
        axios.get("http://localhost:8000/apy/categories/")
            .then((response) => {
                console.log("API Response:", response.data); // Log the response data
                // Ensure response.data.results is an array containing categories
                if (Array.isArray(response.data) && response.data.length > 0) {
                    const extractedCategories = response.data.map(item => ({
                        image: item.image,
                        name: item.name,
                    }));
                    setCategories(extractedCategories);
                    setLoading(false);
                } else {
                    setError("Data format is incorrect");
                    setLoading(false);
                }
            })
            .catch((error) => {
                setError(error.message || "An error occurred while fetching data.");
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="items1">
            <p className="popular">Categories De Nos Produits</p>
            <div className="line-titles"></div>
            <div className="items1-parent">
                <div className="items1-child1">
                    {categories.map((category, index) => (
                        <div className="itemsN child2" key={index}>
                            <img src={`${BACKEND}${category.image}`} alt="t-shirt" className="images image-product1" />
                            <h4>{category.name}</h4>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Featured;
