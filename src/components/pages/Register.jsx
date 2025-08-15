import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod"
import { RegisterScheme } from '../../lib/register.scheme';
import Feedback from '../Feedback';
import { addUser } from '../../API/Register.api';
import { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';


export default function Register() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit,watch, formState: { errors } } = useForm({
    resolver: zodResolver(RegisterScheme),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      dateOfBirth: '',
      gender: ''
    }
  })
  async function onSubmit(data) {
    setLoading(true);
    try {
      const res = await addUser(data);
      console.log(res);   
      if (res.message === 'success') {
        setLoading(false);
        setError('');
        navigate('/');
      }
    } catch (error) {
      setLoading(false);
      setError(error?.response?.data?.error);
    }
  }

  return (
    <>
        <Helmet>
        <title>Register</title>
        <meta name="description" content="Helmet application" />
    </Helmet>
      <div className='w-1/3 mx-auto my-2'>{error && <Feedback msg={error}></Feedback>}</div>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto dark:text-white shadow shadow-gray-500 p-5">
        <div className="relative z-0 w-full mb-4 group">
          <input type="text" {...register('name')} id="name" className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-400 dark:focus:border-white focus:outline-none focus:ring-0 focus:border-purple peer" />
          {errors.name && <Feedback msg={errors.name?.message}></Feedback>}
          <label htmlFor="name" className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-purple peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">name</label>
        </div>
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
        <div className="relative z-0 w-full mb-4 group">
          <input type="password" autoComplete='off' {...register('rePassword')} id="rePassword" className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-400 dark:focus:border-white focus:outline-none focus:ring-0 focus:border-purple peer" />
          {errors.rePassword && <Feedback msg={errors.rePassword?.message}></Feedback>}
          <label htmlFor="rePassword" className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-purple peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">rePassword</label>
        </div>
        <div className="relative z-0 w-full mb-4 group">
          <input type="date" {...register('dateOfBirth')} id="dateOfBirth" className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-400 dark:focus:border-white focus:outline-none focus:ring-0 focus:border-purple peer" />
          {errors.dateOfBirth && <Feedback msg={errors.dateOfBirth?.message}></Feedback>}
          <label htmlFor="dateOfBirth" className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-purple peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">dateOfBirth</label>
        </div>
        <div className="flex items-center mb-4">
          <input id="male" type="radio" {...register('gender')} value='male' className="w-4 h-4 text-purple bg-gray-100 accent-purple dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600" />
          <label htmlFor="male" className="w-full ms-2 text-lg font-medium text-gray-900 dark:text-white">Male</label>
        </div>
        <div className="flex items-centerrounded-sm mb-4">
          <input id="female" type="radio" {...register('gender')} value='female' className="w-4 h-4 text-purple bg-gray-100 accent-purple dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600" />
          <label htmlFor="female" className="w-full ms-2 text-lg font-medium text-gray-900 dark:text-white">Female</label>
        </div>
        {errors.gender && <Feedback msg={errors.gender?.message}></Feedback>}
        <button type='submit' className='btn bg-purple text-white dark:border-2 dark:border-gray-400'>
          {loading ? <i className='fa-solid fa-spin fa-spinner'></i> : 'Register'}
        </button>
        <p className='text-black my-5'>Already have account <Link to={'/'} className='text-purple dark:text-white'>Login</Link></p>

      </form>
    </>

  )
}
