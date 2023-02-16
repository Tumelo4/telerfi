import React from 'react'
import Link from 'next/link'
import { BannerType } from '@/pages'
import { urlFor } from '@/lib/client'

interface HeroBannerProps {
  banner : BannerType
}


const HeroBanner: React.FC<HeroBannerProps> = ({banner}) => {
  return (
    <div className='py-24 px-10 bg-[#dcdcdc] rounded-2xl relative h-[500px] leading-none width-full'>
      <p className='text-xl capitalize'>{banner.smallText}</p>
      <h3 className='text-6xl mt-1 capitalize'>{banner.midText}</h3>
      <h1 className='text-white text-9xl ml-[-20px] uppercase'>{banner.largeText1}</h1>
      <img
        src={urlFor(banner.image.asset._ref).url()}
        alt='Laptop'
        loading="lazy"
        className='absolute w-[74%] h-[53%] top-[5%]  right-[13%] md:top-[2%] md:right-1/4 md:w-[450px] md:h-[450px] object-cover'
      />
      
      <div>
       
        <Link href={`/product/${banner.product}`}>
          <button
            type='button'
            className='rounded-2xl mt-10  py-2 px-4 bg-[#703e40] text-white border-0 text-lg font-medium cursor-pointer !z-[10000]'
          >
            {banner.buttonText }
          </button>
        </Link>
        
        <div className=' absolute right-[10%] bottom-[5%] w-72 leading-tight flex flex-col text-[#324d67]'>
          <h5 className=' mb-3 font-bold text-base self-end'>
            Description
          </h5>
          <p className='text-[#5f5f5f] font-thin text-end'>
            {banner.desc}
          </p>
        </div>
      </div>
    </div>
  )
}

export default HeroBanner