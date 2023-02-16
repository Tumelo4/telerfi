import { urlFor } from '@/lib/client'
import { BannerType } from '@/pages'
import Link from 'next/link'
import React from 'react'

type FooterBannerProps = {
  banner: BannerType
}

const FooterBanner: React.FC<FooterBannerProps> = ({banner: {desc, discount, largeText1, largeText2, saleTime, smallText, midText, product, buttonText, image }}) => {
  return (
    <div className=' py-24 px-10 bg-[#f02d34] rounded-2xl relative h-[560px] md:h-[400px] leading-none text-white w-full mt-20 md:mt-28 '>
      <div className='flex justify-between flex-wrap gap-5m md:flex-nowrap md:gap-0'>
        {/* Left */}
        <div>
          <p className='m-4'>{discount}</p>
          <h3 className='font-black md:text-7xl md:ml-6 text-5xl ml-1 capitalize'>{largeText1}</h3>
          <h3 className='font-black md:text-7xl md:ml-6 text-5xl ml-1 capitalize'>{largeText2}</h3>
          <p className='m-4'>{saleTime}</p>
        </div>

        <img
          src={urlFor(image.asset._ref).url()}
          loading="lazy"
          className='w-[74%] h-[53%] md:w-[40%] md:h-[80%] md:left-[25%] top-[-20%] md:top-[-25%] absolute hover:scale-110 duration-500 '
          alt='Laptop'
        />
        
        {/* Right */}
        <div>
          <p className='mx-4 mt-5 mb-2 md:m-4 capitalize'>{smallText}</p>
          <h3 className=' text-2xl md:text-6xl font-medium md:font-semibold capitalize'>{midText}</h3>
          <p className='ml-4 mr-2 my-2 md:m-4'>{desc}</p>
          <Link href={`/product/${product}`}>
            <button
              type='button'
              className='py-25 px-4 bg-white rounded-2xl text-red-700 text-lg mt-5  md:mt-10 border-0 font-medium cursor-pointer '
              
            >
              {buttonText}
            </button>
          </Link>
        </div>

      </div>
    </div>
  )
}

export default FooterBanner