// import React, { useState } from 'react';
// import { FaEye, FaEyeSlash } from 'react-icons/fa';
// import Signupsvg from '../../assets/Signup.svg';
// import { Link } from 'react-router-dom';


// function Login() {
//   const [showPassword, setShowPassword] = useState(false);
 
//   const handleLogin = () => {
//     // Your login logic here
//     // Redirect to the home page after successful login
//     window.location.href = '/Home';
//   };

//   return (
//     <>
//       <div>
//         <section>
//           <div className="grid grid-cols-1 lg:grid-cols-2">
//             <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
//               <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
//                 <h2 className="text-3xl font-bold leading-tight text-[#d8d6dc] sm:text-4xl">Sign in</h2>
//                 <p className="mt-2 text-base text-[#a49fac]">
//                   Dont't have an account?{' '}
//                   <Link
//                     to="/Signup"
//                     title=""
//                     className="font-medium text-[#fbfbfb] transition-all duration-200 hover:underline"
//                   >
//                     Sign Up
//                   </Link>
//                 </p>
//                 <form onSubmit={handleLogin} className="mt-8">
//                   <div className="space-y-5">
//                     <div>
//                       <label htmlFor="email" className="text-base font-medium text-[#d8d6dc]">
//                         {' '}
//                         Email address{' '}
//                       </label>
//                       <div className="mt-2">
//                         <input
//                           className="flex h-10 w-full rounded-md border border-[#fbfbfb] bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
//                           type="email"
//                           placeholder="Email"
//                           id="email"
//                           required
//                         />
//                       </div>
//                     </div>
//                     <div>
//                       <div className="flex items-center justify-between">
//                         <label htmlFor="password" className="text-base font-medium text-[#d8d6dc]">
//                           {' '}
//                           Password{' '}
//                         </label>
//                       </div>
//                       <div className="mt-2 relative">
//                         <input
//                           className="flex h-10 w-full rounded-md border border-[#fbfbfb] bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
//                           type={showPassword ? 'text' : 'password'}
//                           placeholder="Password"
//                           id="password"
//                           required
//                         />
//                         <span
//                           className="absolute right-4 top-3 cursor-pointer"
//                           onClick={() => setShowPassword(!showPassword)}
//                         >
//                           {showPassword ? <FaEyeSlash /> : <FaEye />}
//                         </span>
//                       </div>
//                     </div>
//                     <div>
//                       <button
//                         type="submit"
//                         onClick={handleLogin}
//                         className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
//                       >
//                         Login
//                       </button>
//                     </div>
//                   </div>
//                 </form>
//                 <div className="mt-3 space-y-3"></div>
//               </div>
//             </div>
//             <div className="h-full w-full">
//               <img className="h-full w-full" src={Signupsvg} alt="" />
//             </div>
//           </div>
//         </section>
//       </div>
//     </>
//   );
// }

// export default Login;









































import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Signupsvg from '../../assets/Signup.svg';
import { Link } from 'react-router-dom';

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault(); // Prevent form submission
    // Your login logic here
    // Redirect to the home page after successful login
    window.location.href = '/Home';
  };

  return (
    <>
      <div>
        <section>
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
              <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
                <h2 className="text-3xl font-bold leading-tight text-[#d8d6dc] sm:text-4xl">Sign in</h2>
                <p className="mt-2 text-base text-[#a49fac]">
                  Dont't have an account?{' '}
                  <Link
                    to="/Signup"
                    title=""
                    className="font-medium text-[#fbfbfb] transition-all duration-200 hover:underline"
                  >
                    Sign Up
                  </Link>
                </p>
                <form onSubmit={handleLogin} className="mt-8">
                  <div className="space-y-5">
                    <div>
                      <label htmlFor="email" className="text-base font-medium text-[#d8d6dc]">
                        {' '}
                        Email address{' '}
                      </label>
                      <div className="mt-2">
                        <input
                          className="flex h-10 w-full rounded-md border border-[#fbfbfb] bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                          type="email"
                          placeholder="Email"
                          id="email"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between">
                        <label htmlFor="password" className="text-base font-medium text-[#d8d6dc]">
                          {' '}
                          Password{' '}
                        </label>
                      </div>
                      <div className="mt-2 relative">
                        <input
                          className="flex h-10 w-full rounded-md border border-[#fbfbfb] bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Password"
                          id="password"
                          required
                        />
                        <span
                          className="absolute right-4 top-3 cursor-pointer"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                      </div>
                    </div>
                    <div>
                      <button
                        type="button" // Use type="button" to prevent form submission
                        onClick={handleLogin}
                        className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                      >
                        Login
                      </button>
                    </div>
                  </div>
                </form>
                <div className="mt-3 space-y-3"></div>
              </div>
            </div>
            <div className="h-full w-full">
              <img className="h-full w-full" src={Signupsvg} alt="" />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Login;

