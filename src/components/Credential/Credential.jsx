import React, { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";

import { FiMousePointer } from "react-icons/fi";
import Signup from "../Signup/Signup";
import Signupsvg from  '../../assets/Signup.svg'
import Login from "../Login/Login";
import { Outlet } from "react-router-dom";
// import { ArrowRight } from 'lucide-react'

const Credential = () => {
  return (
    <div className="grid w-full bg-gradient-to-br from-[#19181b] to-[#3e3b45] px-4 py-12 text-[#fbfbfb]">
      <TiltCard />
    </div>
  );
};

const ROTATION_RANGE = 32.5;
const HALF_ROTATION_RANGE = 32.5 / 2;

const TiltCard = () => {
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
            <Outlet/>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Credential;
