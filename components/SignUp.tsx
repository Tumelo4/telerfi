import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useFormProps } from '../interface/InputInterface'
import InputField from './InputField'
import { useShoppingCart } from '@/context/ShoppingCartContext';
import { AiOutlineArrowRight } from 'react-icons/ai'

const schema = yup.object({
    name: yup.string().required("Name is a required field"),
    surname: yup.string().required("Surname is a required field"),
    email: yup
        .string()
        .required("Email is a required field")
        .email("Email is not valid!"),
    password: yup.string().min(8)
})

const SignUp = () => {
    const { signUp, setisLoginC } = useShoppingCart()
    
    const { register, handleSubmit, formState: {errors}} = useForm<Partial<useFormProps>>({
        resolver: yupResolver(schema)
    });

    const handleform = (data: Partial<useFormProps>) => {
        // ONLY USED EMAIL AND PASSWORD JUST TO SHOW THAT SIGNUP DOES WORK
        const email = data.email as string;
        const password = data.password as string;
        signUp(email, password);
    }
    
    return (
        <div className='w-full space-y-2'>
            <div>
                <h1 className="text-2xl block text-start font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-900" >Sign Up</h1>
            </div>
            <form className='flex flex-col gap-4' onSubmit={handleSubmit(handleform)}>
                
                <InputField
                    label='Name'
                    type='text'
                    id='name'
                    placeholder='Enter Name...'
                    register={{...register("name") }}
                    errorMessage = {errors.name?.message}
                />
                
                <InputField
                    label='Surname'
                    type='text'
                    id='surname'
                    placeholder='Enter Surname...'
                    register={{...register("surname") }}
                    errorMessage = {errors.surname?.message}
                />

                <InputField
                    label='Email'
                    type='text'
                    id='email'
                    placeholder='Enter Email...'
                    register={{...register("email") }}
                    errorMessage = {errors.email?.message}
                />
                    
                <InputField
                    label='Password'
                    type='password'
                    id='password'
                    placeholder='Enter Password...'
                    register={{...register("password") }}
                    errorMessage = {errors.password?.message}
                />

                <div className='flex justify-between items-center'>
                    <div>
                        <input type="checkbox" />
                        <label className='mx-2'>Remember Me</label>
                    </div>
                    <div
                        className=' cursor-pointer border-0 hover:bg-cyan-400 hover:scale-110 duration-500 ease-in-out rounded-md'
                        onClick={() => setisLoginC(true)}
                    >
                        <AiOutlineArrowRight />
                    </div>
                </div>
                
                <button
                    type="submit"
                    className="text-sm border-2 border-indigo-700 bg-indigo-700 text-white p-2 w-full rounded-md hover:bg-transparent hover:text-indigo-700 font-semibold"
                >
                    Sign Up
                </button>
            </form>
        </div>
    )
}

export default SignUp
