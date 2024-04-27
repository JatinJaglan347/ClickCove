import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import React, { useState , useRef } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Signupsvg from '../../assets/Signup.svg';
import { Link } from "react-router-dom";
import {useFirebase} from '../../context/Firebase'


const ROTATION_RANGE = 32.5;
const HALF_ROTATION_RANGE = 32.5 / 2;

const Login = () => {
  const firebase = useFirebase();
  const [showPassword, setShowPassword] = useState(false);
  const [email ,setEmail] = useState("");
  const [password, setPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState("");
  

  const handleLogin = async (e) =>{
    e.preventDefault();
    try{
      await firebase.signinWithEmailAndPassword(email , password);
      console.log("Logged In Succesfully")
    }catch (error){
      if (error.code==="auth/invalid-credential"){
        setEmail("");
        setPassword("");
        setLoginMessage("Invalid credential's.")
        console.log(error.code);
      }
      else if (error.code==="auth/too-many-requests"){
        setEmail("");
        setPassword("");
        setLoginMessage("Too many incorrect attempts. Please try again after some time.")
        console.log(error.code);
      }
      else{
        console.log(error.code);
      }
    }
  }

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
                        <form onSubmit={handleLogin} method="POST" className="mt-8">
                          <div className="space-y-5">
                            <div>
                              <label htmlFor="email" className="text-base font-medium text-[#d8d6dc]">
                                {' '}
                                Email address{' '}
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
                                  onChange={(e)=> setPassword (e.target.value)}
                                  value={password}
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
                                type="button"
                                // onClick={()=>{
                                //   firebase.signinWithEmailAndPassword(email , password)
                                // }}
                                onClick={handleLogin}
                                className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                              >
                                Login
                              </button>
                              {loginMessage && (
                                <p style={{ color:'red' }}>
                                  {loginMessage}
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

export default Login;
