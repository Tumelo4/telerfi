import { client, urlFor } from '@/lib/client'
import React, { useState } from 'react'
import { ProductsType } from '..'
import {AiFillStar, AiOutlinePlus, AiOutlineStar, AiOutlineMinus } from 'react-icons/ai'
import { formatCurrency } from '@/utilities/formatCurrency'
import Marquee from "react-fast-marquee";
import { Product } from '@/components'
import { useShoppingCart } from '@/context/ShoppingCartContext'

type ProductDetailsProps = {
  product: ProductsType,
  products: ProductsType[]
}

const ProductDetails = ({ product, products }: ProductDetailsProps) => {
  const { image, name, details, price } = product;
  const [index, setIndex] = useState(() => 0);
  const { incqty, decqty, qty, onAdd, setshowCart } = useShoppingCart();

  const handleBuyNow = () => {
    onAdd(product, qty);
    setshowCart(true);
  }

  return (
    <div className='mt-16'>
      <div className='flex flex-wrap md:flex-nowrap gap-10 m-3  md:m-10 mt-14 text-[#324d67]'>
        <div className=' flex-shrink-0 '>
          <div>
            <img
              src={urlFor(image && image[index].asset._ref).url()}
              alt = 'Image'
              className='w-[350px] h-[350px] md:w-[400px] md:h-[400px] rounded-2xl cursor-pointer bg-[#ebebeb] transition duration-300 ease-in-out hover:bg-sky-400'
            />
          </div>
          <div className='flex gap-2.5 mt-5'>
              {
                image?.map((item, i) => (
                  <img
                    key={i}
                    alt= 'Image'
                    src={urlFor(item.asset._ref).url()}
                    className={i === index? 'bg-sky-400 h-[70px] w-[70px] curson-pointer rounded-lg':'bg-[#ebebeb] h-[70px] w-[70px] curson-pointer rounded-lg'}
                    onMouseEnter={() => setIndex(i)}
                  />
                ))
              }
            </div>
        </div>
        
        <div>
            <h1>{name}</h1>
            <div className='text-[#f02d34] mt-2 flex flex-row gap-1 items-center'>
              <div className='flex flex-nowrap'>
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiOutlineStar />
              </div>
              <p className='text-[#324d67] mt-0'>
                (20)
              </p>
            </div>
            <h4 className='mt-2'>Details:</h4>
            <p className='mt-2'>{details}</p>
            <p className=' font-bold text-base mt-7 text-[#f02d34] '>{ formatCurrency(price)}</p>

            <div className='flex gap-5 mt-2 items-center'>
              <h3>Quantity:</h3>
              <p className=' flex gap-2 border-solid border-2 border-neutral-700 p-1 items-center '>
                {/* Minus */}
              <span
                className='border-solid border-2 text-[#f02d34] cursor-pointer px-3 text-base '
                onClick={decqty}
              >
                  <AiOutlineMinus />
                </span>
                <span className='text-xl cursor-pointer px-3'>
                  {qty}
                </span>
              <span
                className='border-solid border-2 text-[#31a831] cursor-pointer px-3 text-base'
                onClick={incqty}
              >
                  <AiOutlinePlus />
                </span>
              </p>
            </div>
            <div  className='flex gap-4'>
              <button
                type='button'
                className=' py-2 px-5 border-solid border-2 border-[#f02d34] mt-10 text-base font-medium bg-white text-[#f02d34] cursor-pointer w-40 md:w-48 scale-100 transition-transform duration-500 ease-in-out hover:scale-110'
                onClick={() => onAdd(product, qty)}
              >
                Add to Cart
              </button>
              <button
                type='button'
                className=' w-40 md:w-48 py-2 px-5 bg-[#f02d34] text-white border-0 mt-10 text-base cursor-pointer font-medium scale-100 transition-transform duration-500 ease-in-out hover:scale-110 '
                onClick={() => handleBuyNow}
              >
                Buy Now
              </button>
            </div>
          </div>
        
      </div>

      <div className=' mt-28 ' >
          <h2 className='text-center m-12 text-[#324d67] text-2xl'>
            You may also like
          </h2>
          {/* Marquee */}
          <div className='relative h-[400px] w-full overflow-x-hidden'>
            <Marquee
              speed={35}
              pauseOnHover
              gradient={false}
              style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexShrink: '0' }}
              
            >
              <div className='flex justify-center mt-5 flex-shrink-0 gap-4 ' onClick={() => setIndex(0)}>
                {
                  products.map((item) => (
                    <Product key={item._id} product={item} />
                  ))
                }
              </div>
            </Marquee>
          </div>
        </div>
    </div>
  )
}

export const getStaticPaths = async () => {
  const query = `*[_type == "product"] {
    slug {
      current
    }
  }`;

  const products = await client.fetch(query);
  const paths = products.map((product: ProductsType) => ({
    params: {
      slug: product.slug.current
    }
  }))

  return {paths, fallback: 'blocking', }
}

export const getStaticProps = async ({params: {slug}}: any) => {

  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const productQuery = '*[_type == "product"]';

  const product = await client.fetch(query);
  const products = await client.fetch(productQuery);

  return {
    props: {product, products},
  }
}

export default ProductDetails