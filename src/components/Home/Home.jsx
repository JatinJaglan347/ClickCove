import React from 'react'
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
        Home
        <Link to="/Login">
            <button
               
                className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
            >
                Login
            </button>
        </Link>
        <Link to="/Signup">
            <button
              
                className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
            >
                SignUp
            </button>
        </Link>
    </div>
    
    
  )
}

export default Home