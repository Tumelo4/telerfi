import { urlFor } from '@/lib/client'
import { ProductsType } from '@/pages'
import { formatCurrency } from '@/utilities/formatCurrency'
import Link from 'next/link'
import React from 'react'

type ProductProps = {
  product: ProductsType
}

const Product = ({product: {image, name, slug, price}}: ProductProps) => {
  return (
    <div className='hover:z-[1000]'>
      <Link href={`/product/${slug.current}`}>
        <div className=' cursor-pointer scale-100 transition-transform duration-500 ease-in-out text-[#324d67] hover:scale-125 '>
          <img
            src={urlFor(image && image[0].asset._ref).url()}
            alt = 'Image'
            className = 'w-60 h-60 rounded-2xl bg-[#ebebeb] scale-100 transition-transform duration-500 ease-in-out'
          />
          <p className='font-medium'>{name}</p>
          <p className='font-extrabold mt-1 text-black'>{formatCurrency(price)}</p>
        </div>
      </Link>
    </div>
  )
}

export default Product