import React, { useEffect, useState } from "react";
import ProductCard from "../products/ProductCard";

export default function MensClothing() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/category/men's clothing")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.log(error));
  }, []);
  return (
    <>
      <div className="flex my-24 relative">
      
        <div className="relative w-60 h-auto p-10  text-[#1BBFE9] text-6xl shadow-[#1BBFE9]  text-shadow">
          <div className="absolute left-0 bottom-40 w-60 font-extrabold  transform -rotate-90">
            Men's Clothing
          </div>
        </div>

        <div className="flex gap-10 overflow-scroll no-scrollbar overflow-x-scroll">
          {products.map((product) => (
           <ProductCard
           key={product.id}
           id={product.id}
           imageUrl={product.image}
           productName={product.title}
         />
          ))}
        </div>
      </div>
    </>
  );
}

