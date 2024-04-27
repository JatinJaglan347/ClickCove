import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'


import Login from './components/Login/Login.jsx'
import { createBrowserRouter ,RouterProvider } from 'react-router-dom';
import Home from './components/Home/Home.jsx';
import Signup from './components/Signup/Signup.jsx';


function App() {
  const router = createBrowserRouter([
    {
      path:"/",
      element:<Home/>
    },
    {
      path:"/SignUP",
      element:<Signup/>
    }
  ])
  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
