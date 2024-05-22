'use client'

import React from 'react'
import { Menu, X, MapPin } from 'lucide-react'
import { Navbar } from '../Navbar/Navbar'

const menuItems = [
  {
    name: 'Home',
    href: '#',
  },
  {
    name: 'About',
    href: '#',
  },
  {
    name: 'Contact',
    href: '#',
  },
]

const locations = [
  {
    title: 'Chitkara',
    timings: 'Mon-Sat 9am to 5pm.',
    address: 'Chitkara Square1,, Punjab, 560100 IN',
  },
  {
    title: 'Chandigarh',
    timings: 'Mon-Sat 9am to 5pm.',
    address: '12th Main Rd, Indiranagar, Chandigarh, Chandigarh 560008 IN',
  },
  
]

const users = [
  {
    name: 'Kartik Arora',
    image:
      'https://media.licdn.com/dms/image/D5603AQHBPlLCLIxwzw/profile-displayphoto-shrink_400_400/0/1711178835155?e=1721865600&v=beta&t=6EkOiBYr2riaWrs80jICAwY0k605ggQzVOdmVFG9f00',
    position: 'Team lead',
  },
  {
    name: 'Jatin Jaglan',
    image:
      'https://media.licdn.com/dms/image/D5603AQE6JihHmetydg/profile-displayphoto-shrink_400_400/0/1711183006492?e=1721865600&v=beta&t=XyzZOoCPEKZ9hnA8yadLm8nKiT9fU27ntRQdYE3bSLI',
    position: 'Back-end developer',
  },
  {
    name: 'Kartikey Bhartwal',
    image:
      'https://media.licdn.com/dms/image/D4D03AQEMFPJ6hSc8aw/profile-displayphoto-shrink_400_400/0/1712852050439?e=1721865600&v=beta&t=cxzqoO6zOE8zHcrd2dnFtLuGlGkbnYlccOUkDBUMuB8',
    position: 'AIML Developer',
  },
  {
    name: 'Jaskirat Singh',
    image:
      'https://media.licdn.com/dms/image/D4D35AQHf2azepmDFgg/profile-framedphoto-shrink_400_400/0/1694960185549?e=1717009200&v=beta&t=fpYgZoSYEj8dZF6AoCF-6ikYeXZyLcN5NBzX2vJeIOI',
    position: 'Frontend Developer',
  },
]

export function About() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div>
   
    <Navbar/>
      <div className="mx-auto max-w-7xl px-4">
        {/* Hero Map */}
        <div className="flex flex-col space-y-8 pb-10 pt-12 md:pt-24">
          <div className="max-w-max rounded-full border bg-gray-50 p-1 px-3">
            <p className="text-xs font-semibold leading-normal md:text-sm">About the company</p>
          </div>
          <p className="text-3xl font-bold text-white md:text-5xl md:leading-10">
            Made with love, right here in India
          </p>
          <p className="max-w-4xl text-base text-[#808080] md:text-xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore veritatis voluptates
            neque itaque repudiandae sint, explicabo assumenda quam ratione placeat?
          </p>
        </div>
        <div className="w-full space-y-4">
          <img
            className="h-[200px] w-full rounded-xl object-cover md:h-full"
            src="https://dev-ui-image-assets.s3.ap-south-1.amazonaws.com/google-map.jpg"
            alt=""
          />
        </div>
        {/* locations */}
        <div className="my-8 flex flex-col gap-y-6 md:flex-row lg:justify-around">
          {locations.map((location) => (
            <div key={location.title} className="flex flex-col space-y-3 md:w-2/4 lg:w-1/5">
              <MapPin className="h-5 w-5 text-white" />
              <p className="w-full text-xl font-semibold text-[#bfbfbf]">{location.title}</p>
              <p className="w-full text-base text-[#999999]">{location.timings}</p>
              <p className="text-sm font-medium text-[#8c8c8c]">{location.address}</p>
            </div>
          ))}
        </div>
        <hr className="mt-20" />
        {/* greetings */}
        <div className="mt-16 flex items-center">
          <div className="space-y-6 md:w-3/4">
            <div className="max-w-max rounded-full border bg-gray-50 p-1 px-3">
              <p className="text-xs font-semibold leading-normal md:text-sm">Join Us &rarr;</p>
            </div>
            <p className="text-3xl font-bold text-[#bfbfbf] md:text-4xl">Meet our team</p>
            <p className="max-w-4xl text-base text-[#999999] md:text-xl">
              Our philosophy is simple — hire a team of diverse, passionate people and foster a
              culture that empowers you to do your best work.
            </p>
            <div></div>
          </div>
        </div>
        {/* TEAM */}
        <div className="grid grid-cols-1 gap-4 gap-y-6 border-b border-gray-300 py-12 pb-20 md:grid-cols-2 lg:grid-cols-4">
          {users.map((user) => (
            <div className="rounded-md border" key={user.name}>
              <img
                src={user.image}
                alt={user.name}
                className="h-[300px] w-full rounded-lg object-cover "
              />
              <p className="mt-6 w-full px-2 text-xl  font-semibold text-white">{user.name}</p>
              <p className="w-full px-2 pb-6 text-sm font-semibold text-[#808080]">
                {user.position}
              </p>
            </div>
          ))}
        </div>
        {/* Hiring Banner */}
        <div className="flex flex-col items-center gap-x-4 gap-y-4 py-16 md:flex-row">
          <div className="space-y-6">
            <p className="text-sm text-white font-semibold md:text-base">Join our team &rarr;</p>
            <p className="text-3xl text-white font-bold md:text-4xl">We&apos;re just getting started</p>
            <p className="text-base text-[#808080] md:text-lg">
              Our philosophy is simple — hire a team of diverse, passionate people and foster a
              culture that empowers you to do your best work.
            </p>
            <button
              type="button"
              className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Join Now
            </button>
          </div>
          <div className="md:mt-o mt-10 w-full">
            <img
              src="https://images.unsplash.com/photo-1605165566807-508fb529cf3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80"
              alt="Getting Started"
              className="rounded-lg"
            />
          </div>
        </div>
      </div>
      <hr className="mt-6" />
      {/* footer */}
      <div className="mx-auto max-w-7xl">
        <footer className="px-4 py-10">
          <div className="flex flex-col md:flex-row md:items-center">
            <span>
              
            </span>
            <div className="mt-4 grow md:ml-12 md:mt-0">
              <p className="text-base font-semibold text-[#999999]">
                © 2023 Click Cove Ecom
              </p>
            </div>
          </div>
          <div className="mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            <div className="mb-8 lg:mb-0">
              <p className="mb-6 text-lg font-semibold text-[#999999]">Company</p>
              <ul className="flex flex-col space-y-4 text-[14px] font-medium text-[#b3b3b3]">
                <li>About us</li>
                <li>Company History</li>
                <li>Our Team</li>
                <li>Our Vision</li>
                <li>Press Release</li>
              </ul>
            </div>
            <div className="mb-8 lg:mb-0">
              <p className="mb-6 text-lg font-semibold text-[#999999]">Our Stores</p>
              <ul className="flex flex-col space-y-4 text-[14px] font-medium text-[#b3b3b3]">
                <li>Washington</li>
                <li>New Hampshire</li>
                <li>Maine</li>
                <li>Texas</li>
                <li>Indiana</li>
              </ul>
            </div>
            {/* <div className="mb-8 lg:mb-0">
              <p className="mb-6 text-lg font-semibold text-[#999999]">Services</p>
              <ul className="flex flex-col space-y-4 text-[14px] font-medium text-[#b3b3b3]">
                <li>UI / UX Design</li>
                <li>App Development</li>
                <li>API reference</li>
                <li>API status</li>
                <li>Documentation</li>
              </ul>
            </div> */}
            <div className="mb-8 lg:mb-0">
              <p className="mb-6 text-lg font-semibold text-[#999999]">Legal</p>
              <ul className="flex flex-col space-y-4 text-[14px] font-medium text-[#b3b3b3]">
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Cookie Policy</li>
                <li>Disclaimer</li>
                <li>Media Policy</li>
              </ul>
            </div>
            <div className="mb-8 lg:mb-0">
              <p className="mb-6 text-lg font-semibold text-[#999999]">Social Links</p>
              <ul className="flex flex-col space-y-4 text-[14px] font-medium text-[#b3b3b3]">
                <li>Facebook</li>
                <li>Twitter</li>
                <li>Instagram</li>
                <li>Linkedin</li>
                <li>YouTube</li>
              </ul>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
export default About;