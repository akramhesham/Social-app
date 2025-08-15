import React, { useContext, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { auth } from '../Context/Auth.context';
import { mode } from '../Context/Mode.context';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { uploadPhoto } from '../API/uploadPhoto.api';

export default function Navbar() {
  const { isLogin, setLogin, allData } = useContext(auth);
  const queryClient = useQueryClient()
  const { mutate, isPending, isError, data } = useMutation({
    mutationFn: uploadPhoto,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['photo'] })
  });
  const [image, setImage] = useState('');
  const [imageSrc, setImageSrc] = useState('');
  const [isOpen, setOpen] = useState(false);
  const { theme, toggleTheme } = useContext(mode);
  console.log(allData);
  const navigate = useNavigate();
  function toggle() {
    setOpen(!isOpen);
  }
  function logOut() {
    setLogin(null);
    localStorage.removeItem('token');
    navigate('/');
  }
  function addPhoto(e) {
    e.preventDefault();
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImageSrc(URL.createObjectURL(file));
      const formdata = new FormData();
      formdata.append('photo', file);
      mutate(formdata);
    }
  }
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 w-full">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <h2 className='logo tracking-widest text-purple'>Social</h2>
        <button data-collapse-toggle="navbar-default" onClick={toggle} type="button" className="cursor-pointer inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15">
            </path>
          </svg>
        </button>
        <div id="navbar-default" className={`${!isOpen && 'hidden'} w-full md:block md:w-auto`}>
          <ul className="items-center font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {isLogin ?
              <>
                <li>
                  <NavLink to={'/home'} className='text-purple'>Home</NavLink>
                </li>
                <li>
                  <NavLink className='text-purple cursor-pointer' onClick={logOut}>LogOut</NavLink>
                </li>
                <li className='flex items-center justify-between gap-3'>
                  <div>
                    <input type="file" id='profilePhoto' className='hidden' onChange={addPhoto} />
                    <label htmlFor="profilePhoto" className='cursor-pointer'>
                      <img src={imageSrc || allData.photo} className='size-9 rounded-full' alt="" />
                    </label>
                  </div>
                  <Link to={`/profile/${allData._id}`}>
                    <span className='text-black'>{allData.name}</span>
                  </Link>
                </li>
              </>
              :
              <>
                <li>
                  <NavLink to={'/'} className='text-purple'>Login</NavLink>
                </li>
                <li>
                  <NavLink to={'/register'} className='text-purple'>Register</NavLink>
                </li>
              </>
            }
            <li>
              <label className="inline-flex items-center cursor-pointer">
                <input type="checkbox" onChange={toggleTheme} checked={theme === 'dark'} value="" className="sr-only peer" />
                <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-purple dark:peer-focus:ring-purple dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple dark:peer-checked:bg-purple"></div>
                <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                  {theme === 'dark' ? <i className='fa-solid fa-sun'></i> : <i className='fa-solid fa-moon'></i>}
                </span>
              </label>
            </li>
          </ul>
        </div>
      </div>
    </nav>

  )
}
