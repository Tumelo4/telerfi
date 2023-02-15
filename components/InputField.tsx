import React from 'react'

interface InputFieldProps {
    label: string,
    type: string,
    id: string,
    placeholder: string,
    // NEED TYPE
    register: any,
    errorMessage: string | undefined 
}

const InputField: React.FC<InputFieldProps> = ({label, type, id, placeholder, register, errorMessage}) => {
  return (
    <div className='flex flex-col'>
      <div className='flex flex-col gap-2'>
          <label>{label}</label>
          <input
              type={type}
              id={id}
              placeholder={placeholder}
              className="border rounded-sm w-full text-base p-2 focus:outline-none focus:ring-0 focus:border-gray-600"
              {...register}
          />
      </div>
      {
        errorMessage && <span className='text-red-600 text-errsz'>{errorMessage}</span>
      }
    </div>
  )
}

export default InputField