import { useShoppingCart } from '@/context/ShoppingCartContext'
import { urlFor } from '@/lib/client'
import { getStripe } from '@/lib/getStripe'
import { formatCurrency } from '@/utilities/formatCurrency'
import Link from 'next/link'
import React from 'react'
import { toast } from 'react-hot-toast'
import { AiOutlinePlus, AiOutlineMinus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai'
import { TiDeleteOutline } from 'react-icons/ti'
import Stripe from 'stripe'
import Image from 'next/image'


const Cart = () => {
  const { setshowCart, totalPrice, totalQuantities, cartItems, toggleCartItemQuanitity, onRemove, isLogin, setOpenLogin } = useShoppingCart();

  const handle_Check_User_Login_And_Pay = () => {
    if (isLogin) {
      handle_Checkout()
    }
    else {
      setOpenLogin(true);
    }
  }

  const handle_Checkout =  async () => {

    const checkoutSession = await fetch('/api/checkout/session', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ cartItems })
    })

    const data = await checkoutSession.json();
   
    if (data.statusCode === 500) return;
    
    const session = data as Stripe.Checkout.Session

    toast.loading('Redirecting...');

    const stripe = await getStripe();
    const { error } = await stripe!.redirectToCheckout({
      // Make the id field from the Checkout Session creation API response
      // available to this file, so you can provide it as parameter here
      // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
      sessionId: session.id,
    });
    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `error.message`.
    console.warn(error.message);
  } 
  
  return (
    <div className=' mx-4 relative bg-white/50 w-full md:w-[600px] h-screen md:py-10 p-[4px] md:px-2.5'>
      <div className='flex  items-center gap-2 border-0'>
        <button
          type='button'
          className='border-0 hover:bg-[#f02d34] rounded-md'
          onClick={() => setshowCart(false)}
        >
          <AiOutlineLeft />
        </button>
        <span className='text-base'>Your Cart</span>
        {
          totalQuantities === 1 ?
            <span className='text-[#f02d34]'>({totalQuantities} item)</span> :
            <span className='text-[#f02d34]'>({totalQuantities} items)</span>
        }
      </div>
      {
        totalQuantities <= 0 ?
          (
            <div className='flex flex-col items-center'>
              <AiOutlineShopping size={150} />
              <h3>Your shopping bag is empty</h3>
              <Link href='/'>
                <button
                  onClick={() => setshowCart(false)}
                  type='button'
                  className='w-full border-0 rounded-2xl text-base uppercase py-2.5 px-3 mt-10 bg-[#f02d34] text-[#fff] cursor-pointer scale-100 transition-transform duration-500 ease-in-out hover:scale-110'
                >
                  continue
                </button>
              </Link>
            </div>
          ) :
          (
            cartItems.length > 0 && <div className='flex flex-col gap-4'>
              {
                cartItems.map((item) => (
                  <div className='flex gap-4 flex-col md:flex-row mt-4 flex-shrink-0' key={item.product._id}>
                    <Image
                      src={urlFor(item?.product.image[0].asset._ref).url()}
                      alt='Image'
                      className='w-1/4 h-1/4 bg-[#ebebeb] rounded-lg cursor-pointer'
                    />
                    <div className='flex flex-col gap-2  text-[#324d67] w-full justify-between'>
                      <div className='flex  flex-wrap md:flex-nowrap gap-2 md:gap-0 justify-between'>
                        <h4 className='text-[20px]'>{item.product.name}</h4>
                        <h5 className='text-[24px]'>{formatCurrency(item.product.price * item.quantity)}</h5>
                      </div>
                      <div className='flex items-center justify-between'>
                        <div>
                          <p className=' flex gap-2 border-solid border-2 border-neutral-700 p-1 items-center '>
                            {/* Minus */}
                            <span
                              className='border-solid border-2 text-[#f02d34] cursor-pointer px-3 text-base '
                              onClick={() => toggleCartItemQuanitity(item.product._id, 'dec')}
                            >
                              <AiOutlineMinus />
                            </span>
                            <span className='text-xl cursor-pointer px-3'>
                              {item.quantity}
                            </span>
                            <span
                              className='border-solid border-2 text-[#31a831] cursor-pointer px-3 text-base'
                              onClick={() => toggleCartItemQuanitity(item.product._id, 'inc')}
                            >
                              <AiOutlinePlus />
                            </span>
                          </p>
                        </div>
                        <button
                          type='button'
                          className=' cursor-pointer text-2xl border-none text-[#f02d34] bg-transparent'
                          onClick={() => onRemove(item.product._id)}
                        >
                          <TiDeleteOutline />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              }

              <div className='flex text-[#324d67] justify-between mt-6 text-2xl md:text-xl '>
                <h3 className=' font-bold uppercase'>Total:</h3>
                <h3>{formatCurrency(totalPrice)}</h3>
              </div>

              <button
                type='button'
                className=' uppercase text-[#f02d34] rounded-lg py-3 my-7 mx-5 md:m-7 bg-white border-2 text-lg font-bold border-[#f3383e] hover:bg-[#f02d34] hover:text-white duration-500 ease-in-out hover:scale-110'
                onClick={handle_Check_User_Login_And_Pay}
              >
                Pay with Stripe
              </button>

            </div>
          )
      }
    </div>
  )
}

export default Cart