import React from 'react';
import { Link } from "react-router-dom";

const ProductCard = ({ imageUrl, productName, productId,id  }) => {
  return (
<>

    <div className="container">
      <div className="card border-2 rounded-2xl border-blue-400">
        <div className="imgBx">
          <img src={imageUrl} alt={productName} />
        </div>
        <div className="contentBx">
          <h2>{productName}</h2>
          <Link to={`/product/${id}`}>Buy Now</Link>
          {/* <a href="#">Buy Now</a> */}
        </div>
      </div>
    </div>


    </>
  );
};

export default ProductCard;
