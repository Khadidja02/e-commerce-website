import React, { useState, useEffect } from "react";
import axios from "axios";

function Testing() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/apy/products/") // Update the API URL to match your actual endpoint
      .then((res) => {
        console.log(res);
        setPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <ul>
        {posts.map((post, index) => (
          
          <li key={index}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default Testing;
