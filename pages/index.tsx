import React from 'react'
import { client } from '@/lib/client'
import type { GetServerSideProps } from 'next'
import { Product, FooterBanner, HeroBanner } from '../components'

// Define the shape of the data for products and banners
export interface ProductsType {
  _createdAt: string,
  _id: string,
  _rev: string,
  _type: string,
  _updatedAt: string,
  details: string,
  image: [
    {
      _key: string,
      _type: string,
      asset: {
        _ref: string,
        _type: string
      }
    }
  ],
  name: string,
  price: number,
  slug: {_type: string,current: string}
}

export interface BannerType {
  _createdAt: string,
  _id: string,
  _rev: string,
  _type: string,
  _updatedAt: string,
  buttonText: string,
  desc: string,
  discount: string,
  image: {
    _type: string,
    asset: {
      _ref: string,
      _type: string
    }
  },
  largeText1: string,
  largeText2: string,
  midText: string,
  product: string,
  saleTime: string,
  smallText: string
}

// Define the shape of the props for the home component
interface HomeProps {
  products: ProductsType[],
  bannerData: BannerType[]
}

// Create the home component with props destructuring
const Home: React.FC<HomeProps> = ({ products, bannerData }) => {
  
  return (
    <>
      {
        // Render the hero banner only if there is data to show
        bannerData.length && <HeroBanner banner={bannerData[0]} />
      }

      <div className='my-10 text-center mx-0 text-[#324d67]'>
        <h2 className='text-4xl font-extrabold'>Best selling Products</h2>
        <p className='text-sm font-extralight'>High-performance laptop</p>
      </div>

      <div className='flex flex-wrap justify-center gap-4 mt-5 width-full'>
        {
          // Render each product in the products array using the Product component
          products?.map(product_index => <Product key={product_index._id} product = {product_index} />)
        }
      </div>
      
      {
         // Render the footer banner only if there is data to show
        bannerData.length && <FooterBanner banner={bannerData[0]} />
      }
    </>
  )
}

/*
The getServerSideProps function is a Next.js specific function that runs on 
the server-side before the component is rendered. It fetches the products and 
banner data using queries to the Sanity API using the client object from the @/lib/client module.
 */

export const getServerSideProps: GetServerSideProps = async () => {

  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const bannerquery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerquery);
  
  return {
    props: {products, bannerData}, // will be passed to the page component as props
  }
}


export default Home