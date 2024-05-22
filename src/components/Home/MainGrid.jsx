import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { FiArrowRight, FiMail, FiMapPin } from "react-icons/fi";

const ImageArray = [
  {
    image1:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    image2:
      "https://plus.unsplash.com/premium_photo-1683798464819-d1376249293e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZSUyMGNvbW1lcmNlfGVufDB8fDB8fHww",
    image3:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZSUyMGNvbW1lcmNlfGVufDB8fDB8fHww",
    image4:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZSUyMGNvbW1lcmNlfGVufDB8fDB8fHww",
  },
  {
    image1:
      "https://plus.unsplash.com/premium_photo-1661342527041-fb42a8d10b9b?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZSUyMGNvbW1lcmNlfGVufDB8fDB8fHww",
    image2:
      "https://images.unsplash.com/photo-1487700160041-babef9c3cb55?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZSUyMGNvbW1lcmNlfGVufDB8fDB8fHww",
    image3:
      "https://plus.unsplash.com/premium_photo-1681488350342-19084ba8e224?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZSUyMGNvbW1lcmNlfGVufDB8fDB8fHww",
    image4:
      "https://images.unsplash.com/photo-1557821552-17105176677c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGUlMjBjb21tZXJjZXxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    image1:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGUlMjBjb21tZXJjZXxlbnwwfHwwfHx8MA%3D%3D",
    image2:
      "https://plus.unsplash.com/premium_photo-1661779007328-ee926ba0b3dd?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGUlMjBjb21tZXJjZXxlbnwwfHwwfHx8MA%3D%3D",
    image3:
      "https://images.unsplash.com/photo-1474631245212-32dc3c8310c6?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGUlMjBjb21tZXJjZXxlbnwwfHwwfHx8MA%3D%3D",
    image4:
      "https://images.unsplash.com/photo-1522199755839-a2bacb67c546?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGUlMjBjb21tZXJjZXxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    image1:
      "https://plus.unsplash.com/premium_photo-1674635139152-267f57d9845a?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZHVjdHN8ZW58MHx8MHx8fDA%3D",
    image2:
      "https://images.unsplash.com/photo-1511556820780-d912e42b4980?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdHN8ZW58MHx8MHx8fDA%3D",
    image3:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHN8ZW58MHx8MHx8fDA%3D",
    image4:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZHVjdHN8ZW58MHx8MHx8fDA%3D",
  },
];

// Export the RevealBento component as the default export
export default function RevealBento() {
  const [categories, setCategories] = useState([]);

  // Fetch categories from API
  useEffect(() => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const cards = categories.map((category) => ({ title: category }));

  return (
    <div className="min-h-screen px-4 py-12 text-zinc-50">
      <Logo />
      <motion.div
        initial="initial"
        animate="animate"
        transition={{
          staggerChildren: 0.05,
        }}
        className="mx-auto grid max-w-4xl grid-flow-dense grid-cols-12 gap-4"
      >
        {cards.map((card, index) => (
          <React.Fragment key={index}>
            {console.log(index)}
            <HeaderBlock title={card.title} />
            <SocialsBlock image={ImageArray[index]} />
          </React.Fragment>
        ))}

        <AboutBlock />
        <LocationBlock />
        <EmailListBlock />
      </motion.div>
      <Footer />
    </div>
  );
}

const Block = ({ className, ...rest }) => {
  return (
    <motion.div
      variants={{
        initial: {
          scale: 0.5,
          y: 50,
          opacity: 0,
        },
        animate: {
          scale: 1,
          y: 0,
          opacity: 1,
        },
      }}
      transition={{
        type: "spring",
        mass: 3,
        stiffness: 400,
        damping: 50,
      }}
      className={twMerge(
        "rounded-lg border border-zinc-700 bg-zinc-800 p-6",
        className
      )}
      {...rest}
    />
  );
};

const scrollToSection = (event) => {
  event.preventDefault(); // Prevent the default link behavior

  const targetId = event.currentTarget.getAttribute('href').slice(1);
  const target = document.getElementById(targetId);

  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

const HeaderBlock = ({ title }) => (

  <Block className="col-span-4 row-span-2 md:col-span-3  shadow-lg shadow-[#1BBFE9]  text-shadow">
    <img
      src="https://api.dicebear.com/8.x/lorelei-neutral/svg?seed=John"
      alt="avatar"
      className="mb-4 size-14 rounded-full"
    />
    <a href={`#${title}`} className="hover:underline" onClick={scrollToSection}>
      <h1 className="mb-12 text-4xl font-medium leading-tight">{title}</h1>
    </a>
  </Block>
);

const SocialsBlock = ({ image }) => (
  <>
    <Block
      whileHover={{
        rotate: "2.5deg",
        scale: 1.1,
      }}
      className="col-span-6 bg-red-500 md:col-span-3 bg-cover"
      style={{ backgroundImage: `url(${image.image1})` }}
    >
      <a
        href="#"
        className="grid h-full place-content-center text-3xl text-white"
      ></a>
    </Block>
    <Block
      whileHover={{
        rotate: "-2.5deg",
        scale: 1.1,
      }}
      className="col-span-6 bg-green-600 md:col-span-3 bg-cover"
      style={{ backgroundImage: `url(${image.image2})` }}
    >
      <a
        href="#"
        className="grid h-full place-content-center text-3xl text-white"
      ></a>
    </Block>
    <Block
      whileHover={{
        rotate: "-2.5deg",
        scale: 1.1,
      }}
      className="col-span-6 bg-green-600 md:col-span-3 bg-cover"
      style={{ backgroundImage: `url(${image.image3})` }}
    >
      <a
        href="#"
        className="grid h-full place-content-center text-3xl text-black"
      ></a>
    </Block>
    <Block
      whileHover={{
        rotate: "2.5deg",
        scale: 1.1,
      }}
      className="col-span-6 bg-green-600 md:col-span-3 bg-cover"
      style={{ backgroundImage: `url(${image.image4})` }}
    >
      <a
        href="#"
        className="grid h-full place-content-center text-3xl text-white"
      ></a>
    </Block>
  </>
);

const AboutBlock = () => (
  <></>
);

const LocationBlock = () => (
  <></>
);

const EmailListBlock = () => (
  <></>
);

const Logo = () => {
  return <></>;
};

const Footer = () => {
  return (
    <footer className="mt-12">
      
    </footer>
  );
};
