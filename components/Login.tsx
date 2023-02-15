import React, { useState } from 'react'
import logo from '@/public/logo.png'
import InputField from './InputField';
import SignUp from './SignUp';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useFormProps } from '../interface/InputInterface'
import { useForm } from 'react-hook-form';
import { async } from '@firebase/util';
import { useShoppingCart } from '@/context/ShoppingCartContext';

const schema = yup.object({
  email: yup.string().required("Email is a required field"),
  password: yup.string().min(8)
})

const Login: React.FC = () => {
  const { login, isLoginC, setisLoginC } = useShoppingCart()

  const { register, handleSubmit, formState: {errors}} = useForm<Partial<useFormProps>>({
    resolver: yupResolver(schema)
  });


  const handleform =  (data: Partial<useFormProps>) => {
    const email = data.email as string;
    const password = data.password as string;
    login(email, password);
  }
  
  return (
    
    <div className='flex flex-col items-center w-80 sm:w-96 p-6 shadow-md rounded-md bg-white  relative'>
      <img
        src={logo.src}
        alt="Logo"
        className="mx-auto w-20 my-1"
      />

      {
        isLoginC ?
          (
            <div className="w-full space-y-2">
              <div className="w-full">
                <h1 className="text-2xl block text-start font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-900" >Login</h1>
              </div>
              <form className='flex flex-col gap-4' onSubmit={handleSubmit(handleform)} >

                <InputField
                  label='Email'
                  type='text'
                  id='email'
                  placeholder='Enter Email...'
                  register={{ ...register("email") }}
                  errorMessage = {errors.email?.message}
                />
                    
                <InputField
                  label='Password'
                  type='password'
                  id='password'
                  placeholder='Enter Password...'
                  register={{ ...register("password") }}
                  errorMessage = {errors.password?.message}
                />

                <div className='flex justify-between'>
                    <div>
                      <input type="checkbox" />
                      <label className='mx-2'>Remember Me</label>
                    </div>
                    <div>
                      <div className="text-indigo-800 cursor-pointer font-semibold">Forgot Password?</div>
                    </div>
                </div>
                
                <button
                  type="submit"
                  className="text-sm border-2 border-indigo-700 bg-indigo-700 text-white p-2 w-full rounded-md hover:bg-transparent hover:text-indigo-700 font-semibold"
                >
                  Login
                </button>
                
                <div className="flex justify-center text-xs font-light text-center text-gray-700"> Don&apos;t have an account? <div onClick={() => setisLoginC(false)} className="font-medium text-purple-600 hover:underline cursor-pointer">Sign up</div></div>
              </form>
            </div>
          )
          :
          (
            <SignUp />
          )
      }
    </div>
  )
}

export default Login