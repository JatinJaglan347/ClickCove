import React, { useRef,useState } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";

import Signupsvg from  '../../assets/Signup.svg'
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons from react-icons
import {Link} from 'react-router-dom'
import {useFirebase} from '../../context/Firebase'



const ROTATION_RANGE = 32.5;
const HALF_ROTATION_RANGE = 32.5 / 2;

const Signup = () => {

  const firebase = useFirebase();
  const [name , setName]= useState('');
  const [email ,setEmail] = useState("");
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatchError, setPasswordMatchError] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [signupMessage, setSignupMessage] = useState(""); // State to hold signup message



  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password === confirmPassword) {
      const signUpResult = await firebase.handleSignUp(name, email, password);
      if (signUpResult.success) {
        // User created successfully
        setSignupMessage(signUpResult.message);
      }
      else if(signUpResult.message === "Firebase: Error (auth/email-already-in-use)."){
        setSignupMessage("Email is already in use");
        setEmail("");
      }
      else if(signUpResult.message === "Firebase: Password should be at least 6 characters (auth/weak-password)."){
        setSignupMessage("Password should be at least 6 characters long");
        setPassword("");
        setConfirmPassword("");
      }
      else {  
        setSignupMessage(signUpResult.message);
      }
    } else {
      setPassword("");
      setConfirmPassword("");
      setPasswordMatchError("Passwords do not match");
    }
  };
  






  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x);
  const ySpring = useSpring(y);

  const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

  const handleMouseMove = (e) => {
    if (!ref.current) return [0, 0];

    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = (e.clientX - rect.left) * ROTATION_RANGE;
    const mouseY = (e.clientY - rect.top) * ROTATION_RANGE;

    const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1;
    const rY = mouseX / width - HALF_ROTATION_RANGE;

    x.set(rX);
    y.set(rY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="grid w-full bg-gradient-to-br from-[#19181b] to-[#3e3b45] px-4 py-12 text-[#fbfbfb]">
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transformStyle: "preserve-3d",
          transform,
        }}
        className="relative h-[100vh] md:h-[90vh] w-auto rounded-xl bg-gradient-to-br from-[#3e3b45] to-[#a49fac]"
        
      >
        
        <div
          style={{
            transform: "translateZ(75px)",
            transformStyle: "preserve-3d",
          }}
          className="absolute inset-4 grid place-content-center rounded-xl bg-[#141314]"
        >
          <div
            style={{
              transform: "translateZ(50px)",
            }}
            className=""
          >
            <div>
            <div>
          <section>
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
                <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
                  <h2 className="text-3xl font-bold leading-tight text-[#d8d6dc] sm:text-4xl">Sign up</h2>
                  <p className="mt-2 text-base text-[#a49fac]">
                    Already have an account?{' '}
                    <Link
                      to="/"
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
                            onChange={(e)=> setName (e.target.value)}
                            value={name}
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
                          onChange={(e)=> setEmail (e.target.value)}
                            value={email}
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
                            onChange={(e)=> setPassword (e.target.value)}
                            value={password}
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
                            onChange={(e)=>setConfirmPassword(e.target.value)}
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
                          // onClick={()=>{
                          // firebase.handleSignUp(name, email, password)
                          // }}
                          onClick={handleSubmit}
                          className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                        >
                          Create Account
                        </button>
                      </div>
                      <div>
                        {signupMessage && (
                          <p style={{ color: signupMessage.includes('success') ? 'green' : 'red' }}>
                            {signupMessage}
                          </p>
                        )}
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
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
