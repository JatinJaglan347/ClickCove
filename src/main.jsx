import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import Signup from './components/Signup/Signup.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Credential from './components/Credential/Credential.jsx'
import Login from './components/Login/Login.jsx'
import Home from './components/Home/Home.jsx'
const router = createBrowserRouter([
  {
    path:'/',
    element:<Credential/>,
    children:[
      {
        path:"/",
        element:<Login/>
      },
      {
        path:"/Signup",
        element:<Signup/>
      },
      {
        path:"/Login",
        element:<Login/>
      },
      {
        path:"/Home",
        element:<Home/>

      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App /> */}
    {/* <Signup/> */}
    <RouterProvider router={router}/>
    
  </React.StrictMode>,
)
