import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons from react-icons
import Signupsvg from '../../assets/Signup.svg';
import {Link} from 'react-router-dom'

function Signup() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatchError, setPasswordMatchError] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordMatchError('');
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    setPasswordMatchError('');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password === confirmPassword) {
      // Passwords match, proceed with form submission
      window.location.href = '/Login';
      // Add your form submission logic here
    } else {
      // Passwords don't match, highlight input fields and show error message
      setPassword('');
      setConfirmPassword('');
      setPasswordMatchError('Passwords do not match');
    }
  };

  return (
    <>
      <div>
        <section>
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
              <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
                <h2 className="text-3xl font-bold leading-tight text-[#d8d6dc] sm:text-4xl">Sign up</h2>
                <p className="mt-2 text-base text-[#a49fac]">
                  Already have an account?{' '}
                  <Link
                    to="/Login"
                    title=""
                    className="font-medium text-[#fbfbfb] transition-all duration-200 hover:underline"
                  >
                    Sign In
                  </Link>
                </p>
                <form onSubmit={handleSubmit} method="POST" className="mt-8">
                  <div className="space-y-5">
                    <div>
                      <label htmlFor="name" className="text-base font-medium text-[#d8d6dc]">
                        Full Name
                      </label>
                      <div className="mt-2">
                        <input
                          className="flex h-10 w-full rounded-md border border-[#fbfbfb] bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                          type="text"
                          placeholder="Full Name"
                          id="name"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="email" className="text-base font-medium text-[#d8d6dc]">
                        Email address
                      </label>
                      <div className="mt-2">
                        <input
                          className="flex h-10 w-full rounded-md border border-[#fbfbfb] bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                          type="email"
                          placeholder="Email"
                          id="email"
                          required
                        ></input>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="password" className="text-base font-medium text-[#d8d6dc]">
                        Password
                      </label>
                      <div className="mt-2 relative">
                        <input
                          className={`flex h-10 w-full rounded-md border ${
                            passwordMatchError ? 'border-red-500' : 'border-[#fbfbfb]'
                          } bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50`}
                          type={showPassword ? 'text' : 'password'} // Toggle input type based on showPassword state
                          placeholder="Password"
                          value={password}
                          onChange={handlePasswordChange}
                          required
                        />
                        <div
                          className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                          onClick={togglePasswordVisibility}
                        >
                          {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Show/hide eye icon based on showPassword state */}
                        </div>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="confirmPassword" className="text-base font-medium text-[#d8d6dc]">
                        Re-Enter Password
                      </label>
                      <div className="mt-2">
                        <input
                          className={`flex h-10 w-full rounded-md border ${
                            passwordMatchError ? 'border-red-500' : 'border-[#fbfbfb]'
                          } bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50`}
                          type={showPassword ? 'text' : 'password'} // Toggle input type based on showPassword state
                          placeholder="Re-Enter Password"
                          value={confirmPassword}
                          onChange={handleConfirmPasswordChange}
                          required
                        />
                      </div>
                      {passwordMatchError && (
                        <p className="mt-1 text-red-500 text-sm">{passwordMatchError}</p>
                      )}
                    </div>

                    <div>
                      <button
                        type="submit"
                        className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                      >
                        Create Account
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

export default Signup;
