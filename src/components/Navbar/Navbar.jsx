'use client';

import React, { useEffect, useState } from 'react';
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react';
import { FaRegUser } from 'react-icons/fa';
import { Link,NavLink } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { getDatabase, ref, get, remove } from 'firebase/database';
import Login from '../Login/Login';
import { IoMdCart } from "react-icons/io";

const auth = getAuth();
const menuItems = [
  {
    name: 'Home',
    href: '/',
  },
  {
    name: 'About',
    href: '/About',
  },
  {
    name: 'Contact',
    href: '/Contact',
  },
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [cartData, setCartData] = useState([]);
  const [isOpenCartDropdown, setIsOpenCartDropdown] = useState(false);
  const [productDetails, setProductDetails] = useState({});
  const [isCartEmpty, setIsCartEmpty] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        getData(user.uid);
      } else {
        setUser(null);
      }
    });
  }, []);

  const getData = async (uid) => {
    const db = getDatabase();
    const userRef = ref(db, `users/${uid}`);
    const cartRef = ref(db, `users/${uid}/cart`);

    try {
      const snapshot = await get(userRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        setUserData(data);
      } else {
        console.log('No user data available');
      }
    } catch (error) {
      console.error('Error getting user data:', error);
    }

    try {
      const snapshot = await get(cartRef);
      if (snapshot.exists()) {
        const data = Object.values(snapshot.val());
        setCartData(data);
      } else {
        setCartData([]);
      }
    } catch (error) {
      console.error('Error getting cart data:', error);
    }
  };

  const removeFromCart = async (productId) => {
    const db = getDatabase();
    const currentUser = auth.currentUser; // Get current user
    const cartItemRef = ref(db, `users/${currentUser.uid}/cart/${productId}`);

    try {
      await remove(cartItemRef);
      setCartData(cartData.filter((item) => item.productId !== productId));
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      const promises = cartData.map((item) =>
        fetch(`https://fakestoreapi.com/products/${item.productId}`)
          .then((response) => response.json())
      );
      const productDetails = await Promise.all(promises);
      setProductDetails(productDetails);
      setIsCartEmpty(cartData.length === 0);
      // Calculate total amount
      const total = cartData.reduce(
        (acc, item, index) =>
          acc + (productDetails[index]?.price || 0) * item.quantity,
        0
      );
      setTotalAmount(total.toFixed(2));
    };

    fetchProductDetails();
  }, [cartData]);

  const toggleCartDropdown = () => {
    setIsOpenCartDropdown(!isOpenCartDropdown);
  };

  if (user === null) {
    return <Login />;
  }

  return (
    <div className="relative w-full bg-white shadow-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
        {/* Your Logo and Branding */}
        <div className="inline-flex items-center space-x-2">
          <span>
            {/* Logo SVG */}
          </span>
          <span className="font-bold">ClickCove</span>
        </div>

        {/* Navigation Menu */}
        <div className="hidden grow items-start lg:flex">
          <ul className="ml-12 inline-flex space-x-8">
          {/* <NavLink className={({isActive})=> `hover:text-[#9BA1A6] duration-500 ${isActive ? "text-[#2997FF]" : "md:text-white" }` } to="/"><li className=' flex items-center'><ion-icon name="bookmarks-outline"></ion-icon>&nbsp;&nbsp;<p className=' hover:underline-offset-2 hover:underline'>Home</p></li></NavLink> */}
            {menuItems.map((item) => (
              <li key={item.name}>
                <NavLink className={({isActive})=> `inline-flex items-center text-sm font-semibold text-[#2997FF] hover:text-gray-900 duration-500 ${isActive ? "text-[#2997FF]" : "text-gray-800" }` }
                  to={item.href}
                >
                  {item.name}
                  <span>
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </span>
                  </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Search Input */}
        {/* <div className="flex grow justify-end mr-5">
          
          <input
            className="flex h-10 w-[250px] rounded-md bg-gray-100 px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
            type="text"
            placeholder="Search"
          ></input>
        </div> */}

        {/* User and Cart Dropdowns */}
        <div className="hidden space-x-2 lg:block">
          <div className="flex gap-3">




            {/* Cart Dropdown */}
            <div className="relative">
              <button
                className="flex items-center space-x-2 bg-white px-3 py-2 rounded-md shadow-md text-gray-800 focus:outline-none"
                onClick={toggleCartDropdown}
              >
                <span>
                  <IoMdCart className="inline-block w-5 h-5" /> ({cartData.length})
                </span>
                <ChevronDown
                  className={`h-4 w-4 ${isOpenCartDropdown ? 'transform rotate-180' : ''
                    }`}
                />
              </button>
              {isOpenCartDropdown && (
                <div className="absolute right-0 mt-2 w-96 bg-white rounded-md shadow-lg z-10">
                  <div className="py-1">
                    {cartData.length === 0 ? (
                      <div className="px-4 py-2 text-gray-800">
                        Your cart is empty.
                      </div>
                    ) : (
                      cartData.map((item, index) => (
                        <div
                          key={index}
                          className="flex flex-col px-4 py-4 border-b border-[#141314]"
                        >
                          <div className='flex items-center justify-between'>
                            <div className="flex items-center space-x-4">
                              <img
                                src={productDetails[index]?.image || 'placeholder.jpg'}
                                alt={productDetails[index]?.title || 'Product'}
                                className="w-16 h-16 rounded"
                              />
                              <div>
                                <p>{productDetails[index]?.title || 'Product'}</p>
                                <div className="flex items-center space-x-2">
                                  <p className="text-gray-500">{`$${productDetails[index]?.price || '-'}`}</p>
                                  <p>{`Qty: ${item.quantity}`}</p>
                                  <p>{`Total: $${(productDetails[index]?.price || 0) * item.quantity}`}</p>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-4">
                              <button
                                className="text-red-500 hover:text-red-700"
                                onClick={() => removeFromCart(item.productId)}
                              >
                                &#x2715;
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    )}

                    {!isCartEmpty && (
                      <Link to="/Checkout">
                        <button className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80">
                          Checkout (${totalAmount})
                        </button>
                      </Link>
                    )}
                  </div>
                </div>
              )}
            </div>





            {/* User Dropdown */}
            <div className="relative">
              <button
                className="flex items-center space-x-2 bg-white px-3 py-2 rounded-md shadow-md text-gray-800 focus:outline-none"
                onClick={toggleDropdown}
              >
                <FaRegUser className="h-5 w-5 text-gray-600" />
              </button>
              {isOpen && (
                <div className="absolute right-0 mt-2 bg-white rounded-md shadow-lg z-10">
                  <div className="py-1">
                    <div className="px-4 py-2 text-gray-800">
                      {userData ? userData.name : 'User'}
                    </div>
                    <div className="px-4 py-2 text-gray-800">{user.email}</div>
                    <hr />
                    <button
                      type="button"
                      onClick={() => signOut(auth)}
                      className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu Icon */}
        <div
          className="lg:hidden">
          <Menu onClick={toggleMenu} className="h-6 w-6 cursor-pointer" />
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute inset-x-0 top-0 z-50 origin-top-right transform p-2 transition lg:hidden">
            <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="px-5 pb-6 pt-5">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center space-x-2">
                    <span>
                      {/* Logo SVG */}
                    </span>
                    <span className="font-bold">ClickCove</span>
                  </div>
                  <div className="-mr-2">
                    <button
                      type="button"
                      onClick={toggleMenu}
                      className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                      <span className="sr-only">Close menu</span>
                      <X className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <div className="mt-6">
                  <nav className="grid gap-y-4">
                    {menuItems.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="-m-3 flex items-center rounded-md p-3 text-sm font-semibold hover:bg-gray-50"
                      >
                        <span className="ml-3 text-base font-medium text-gray-900">
                          {item.name}
                        </span>
                        <span>
                          <ChevronRight className="ml-3 h-4 w-4" />
                        </span>
                      </a>
                    ))}
                  </nav>
                </div>






                <div className="relative">
                  <button
                    className="w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black items-center justify-center text-center"
                    onClick={toggleDropdown}
                  >
                    <FaRegUser className="h-5 w-full text-gray-600" />
                  </button>
                  {isOpen && (
                    <div className="absolute right-0 mt-2 bg-white rounded-md shadow-lg z-10">
                      <div className="py-1">
                        <div className="px-4 py-2 text-gray-800">
                          {userData ? userData.name : 'User'}
                        </div>
                        <div className="px-4 py-2 text-gray-800">{user.email}</div>
                        <hr />
                        <button
                          type="button"
                          onClick={() => signOut(auth)}
                          className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                <div className="mt-2 space-y-2">
                  {/* <button
                type="button"
                className="w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Cart
              </button> */}

                  <div className="relative">
                    <button
                      className="w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black items-center justify-center text-center"
                      onClick={toggleCartDropdown}
                    >
                      <span>
                        <div className='flex items-center justify-center'>
                        <IoMdCart className="inline-block w-5 h-5" /> ({cartData.length})
                        <ChevronDown
                        className={`h-4 w-4 ${isOpenCartDropdown ? 'transform rotate-180' : ''
                          }`}
                      />
                      </div>
                      </span>
                      
                    </button>
                    {isOpenCartDropdown && (
                      <div className="absolute right-0 mt-2 w-96 bg-white rounded-md shadow-lg z-10">
                        <div className="py-1">
                          {cartData.length === 0 ? (
                            <div className="px-4 py-2 text-gray-800">
                              Your cart is empty.
                            </div>
                          ) : (
                            cartData.map((item, index) => (
                              <div
                                key={index}
                                className="flex flex-col px-4 py-4 border-b border-[#141314]"
                              >
                                <div className='flex items-center justify-between'>
                                  <div className="flex items-center space-x-4">
                                    <img
                                      src={productDetails[index]?.image || 'placeholder.jpg'}
                                      alt={productDetails[index]?.title || 'Product'}
                                      className="w-16 h-16 rounded"
                                    />
                                    <div>
                                      <p>{productDetails[index]?.title || 'Product'}</p>
                                      <div className="flex items-center space-x-2">
                                        <p className="text-gray-500">{`$${productDetails[index]?.price || '-'}`}</p>
                                        <p>{`Qty: ${item.quantity}`}</p>
                                        <p>{`Total: $${(productDetails[index]?.price || 0) * item.quantity}`}</p>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex items-center space-x-4">
                                    <button
                                      className="text-red-500 hover:text-red-700"
                                      onClick={() => removeFromCart(item.productId)}
                                    >
                                      &#x2715;
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))
                          )}

                          {!isCartEmpty && (
                            <Link to="/Checkout">
                              <button className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80">
                                Checkout (${totalAmount})
                              </button>
                            </Link>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
