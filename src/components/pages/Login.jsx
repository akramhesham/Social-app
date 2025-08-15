import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { LoginUser } from '../../API/Login.api';
import Feedback from '../Feedback';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginScheme } from '../../lib/Login.scheme';
import { counter } from '../../Context/Counter.context';
import { auth } from '../../Context/Auth.context';
import { Helmet } from 'react-helmet';

export default function Login() {
  const {setLogin}=useContext(auth);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(LoginScheme),
    defaultValues: {
      email: '',
      password: ''
    }
  })
  async function onSubmit(data) {
    setLoading(true);
    try {
      const res = await LoginUser(data);
      console.log(res);
      if (res.message === 'success') {
        setLoading(false);
        setError('');
        navigate('/home');
        localStorage.setItem('token',res.token);
        setLogin(res.token);
      }
    } catch (error) {
      setLoading(false);
      setError(error?.response?.data?.error);
    }
  }
  useEffect(()=>{
    if(localStorage.getItem('token')){
      navigate('/home')
    }
  },[navigate])
  return (
    <>
        <Helmet>
        <title>Login</title>
        <meta name="description" content="Helmet application" />
    </Helmet>
      <div className='w-1/3 mx-auto my-2'>{error && <Feedback msg={error}></Feedback>}</div>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto dark:text-white shadow shadow-gray-500 p-5">
        <div className="relative z-0 w-full mb-4 group">
          <input type="email" {...register('email')} id="email" className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-400 dark:focus:border-white focus:outline-none focus:ring-0 focus:border-purple peer" />
          {errors.email && <Feedback msg={errors.email?.message}></Feedback>}
          <label htmlFor="email" className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-purple peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">email</label>
        </div>
        <div className="relative z-0 w-full mb-4 group">
          <input type="password" autoComplete='off' {...register('password')} id="password" className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-400 dark:focus:border-white focus:outline-none focus:ring-0 focus:border-purple peer" />
          {errors.password && <Feedback msg={errors.password?.message}></Feedback>}
          <label htmlFor="password" className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-purple peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">password</label>
        </div>
        <button type='submit' className='btn bg-purple text-white dark:border-2 dark:border-gray-400'>
          {loading ? <i className='fa-solid fa-spin fa-spinner'></i> : "Login"}
        </button>
        <p className='text-black my-5'>Don't have account <Link to={'/register'} className='text-purple dark:text-white'>Register</Link></p>
      </form>
    </>
  )
}
