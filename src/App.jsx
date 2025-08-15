import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/react.svg'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/pages/Layout'
import Register from './components/pages/Register'
import Home from './components/pages/Home'
import Login from './components/pages/Login'
import NotFound from './components/pages/NotFound'
import ProtectRoute from './components/ProtectRoute'
import PostDetails from './components/PostDetails'
import Profile from './components/pages/Profile'

function App() {

  const router = createBrowserRouter([{
    path: '/', element: <Layout></Layout>, children: [
      { index: true, element: <Login></Login> },
      { path: '/register', element: <Register></Register> },
      { path: '/home', element: <ProtectRoute><Home></Home></ProtectRoute> },
      { path: '/posts/:id', element: <ProtectRoute><PostDetails></PostDetails></ProtectRoute> },
      { path: '/profile/:id', element: <ProtectRoute><Profile></Profile></ProtectRoute> },
      { path: '*', element: <NotFound></NotFound> }]

  }
  ])

  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App
