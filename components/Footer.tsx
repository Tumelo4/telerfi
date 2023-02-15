import React from 'react'
import {AiFillInstagram, AiOutlineTwitter} from 'react-icons/ai'

const Footer = () => {
  return (
    <div className='text-[#324d67] text-center mt-5 py-7 px-2.5 font-bold flex flex-col items-center gap-2 justify-center '>
      <p>2023 Telerfi All rights resevered</p>
      {/* Icons */}
      <div className='flex text-xs gap-2 '>
        <AiFillInstagram />
        <AiOutlineTwitter />
      </div>
    </div>
  )
}

export default Footer