import React, { useEffect, useState } from 'react';
import { Navbar } from '../Navbar/Navbar';
import { useParams } from 'react-router-dom';
import { IoIosStar } from "react-icons/io";
import { useFirebase } from '../../context/Firebase';

export function Products() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [warning, setWarning] = useState("");
  const [successMessage, setSuccessMessage] = useState(false); // State for success message
  const { currentUser, addToCart } = useFirebase();
  

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${productId}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((error) => console.log(error));
  }, [productId]);

  const incrementQuantity = () => {
    setWarning("");
    if (quantity < 10) {
      setQuantity(quantity + 1);
    } else {
      setWarning("You can't order more than 10 items on a single account.");
    }
  };

  const decrementQuantity = () => {
    setWarning("");
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = async () => {
    if (currentUser) {
      const response = await addToCart(currentUser.uid, productId, quantity);
      if (response.success) {
        setSuccessMessage(true); // Show success message
        setTimeout(() => setSuccessMessage(false), 1000); // Hide after 1 second
      } else {
        setWarning(response.message);
      }
    } else {
      setWarning("You must be logged in to add items to the cart.");
    }
  };

  if (!product) return <div>Loading...</div>;
  return (
    <>
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 md:px-8 2xl:px-16 bg-[#141314] text-[#d8d6dc]">
        <div className="block grid-cols-9 items-start gap-x-10 pb-10 pt-7 lg:grid lg:pb-14 xl:gap-x-14 2xl:pb-20">
          <div className="col-span-5 grid grid-cols-2 gap-2.5">
            <div className="col-span-1 transition duration-150 ease-in hover:opacity-90">
              <img
                src={product.image}
                alt={product.title}
                className="w-full object-cover"
              />
            </div>
          </div>
          <div className="col-span-4 pt-8 lg:pt-0">
            <div className="mb-7 border-b border-gray-300 pb-7">
              <h2 className="text-heading mb-3.5 text-lg font-bold md:text-xl lg:text-2xl 2xl:text-3xl text-[#fbfbfb]">
                {product.title}
              </h2>
              <p className="text-body text-sm leading-6 lg:text-base lg:leading-8 text-[#d8d6dc]">
                {product.description}
              </p>
              <div className="mt-5 flex items-center">
                <div className="text-heading pr-2 text-base font-bold md:pr-0 md:text-xl lg:pr-2 lg:text-2xl 2xl:pr-0 2xl:text-4xl text-[#fbfbfb]">
                  ${product.price}
                </div>
              </div>
            </div>
            <div className="border-b border-gray-300 pb-3"></div>
            <div className="space-s-4 3xl:pr-48 flex items-center gap-2 border-b border-gray-300 py-8 md:pr-32 lg:pr-12 2xl:pr-32 text-[#d8d6dc]">
              <div className="group flex h-11 flex-shrink-0 items-center justify-between overflow-hidden rounded-md border border-gray-300 md:h-12">
                <button
                  className="text-heading hover:bg-heading flex h-full w-10 flex-shrink-0 items-center justify-center border-e border-gray-300 transition duration-300 ease-in-out focus:outline-none md:w-12"
                  onClick={incrementQuantity}
                >
                  +
                </button>
                <span className="duration-250 text-heading flex h-full w-12 flex-shrink-0 cursor-default items-center justify-center text-base font-semibold transition-colors ease-in-out md:w-20 xl:w-24">
                  {quantity}
                </span>
                <button
                  className="text-heading hover:bg-heading flex h-full w-10 flex-shrink-0 items-center justify-center border-s border-gray-300 transition duration-300 ease-in-out focus:outline-none md:w-12"
                  onClick={decrementQuantity}
                >
                  -
                </button>
              </div>
              <button
                type="button"
                className="h-11 w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                onClick={handleAddToCart}
              >
                Add to cart
              </button>
            </div>
            {successMessage && (
              <div className="text-green-500 py-2">
                Item has been added to your cart!
              </div>
            )}
            {warning && (
              <div className="text-red-500 py-2">
                {warning}
              </div>
            )}
            <div className="py-6 text-[#d8d6dc]">
              <ul className="space-y-5 pb-1 text-sm">
                <li>
                  <span className="text-heading inline-block pr-2 font-semibold">Category:</span>
                  <a className="hover:text-heading transition hover:underline" href="#">
                    {product.category}
                  </a>
                </li>
                <li className="productTags">
                  <span className="text-heading inline-block pr-2 font-semibold">Rating:</span>
                  <a
                    className="hover:text-heading inline-block pr-1.5 transition last:pr-0 hover:underline"
                    href="#"
                  >
                    <div className='flex text-center justify-center items-center gap-2'>{product.rating.rate} <IoIosStar /></div>
                  </a>
                </li>
              </ul>
            </div>
            <div className="shadow-sm">
              <header className="flex cursor-pointer items-center justify-between border-t border-gray-300 py-5 transition-colors md:py-6">
                <h2 className="text-heading pr-2 text-sm font-semibold leading-relaxed md:text-base lg:text-lg text-[#fbfbfb]">
                  Product Details
                </h2>
                <div className="relative flex h-4 w-4 flex-shrink-0 items-center justify-center">
                  <div className="bg-heading h-0.5 w-full rounded-sm" />
                  <div className="bg-heading absolute bottom-0 h-full w-0.5 origin-bottom scale-0 transform rounded-sm transition-transform duration-500 ease-in-out" />
                </div>
              </header>
              <div>
                <div className="pb-6 text-sm leading-7 text-[#d8d6dc] md:pb-7">
                  {product.description}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
