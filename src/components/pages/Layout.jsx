import React, { useContext } from 'react'
import Navbar from '../Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer'
import { mode } from '../../Context/Mode.context'

export default function Layout() {
  const{theme}=useContext(mode);
  return (
    <div className={`${theme==='dark'&&'dark'} dark:bg-gray-600 text-white flex flex-col justify-between items-center min-h-screen`}>
      <Navbar></Navbar>
      <div className='container'>
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  )
}
