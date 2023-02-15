// Importing external dependencies and hooks
import { useShoppingCart } from '@/context/ShoppingCartContext' // import the useShoppingCart hook from the ShoppingCartContext module
import { runFireworks } from '@/utilities/confetti' // import the runFireworks function from the confetti utility
import Link from 'next/link' // import the Link component from the next/link module
import React, { useEffect, useState } from 'react' // import React and its useEffect and useState hooks
import { BsBagCheckFill } from 'react-icons/bs' // import the BsBagCheckFill icon component from the react-icons/bs module

/*
React component called Success, which is a confirmation page 
that is displayed to users when their order is successful. 
The component imports some external dependencies and hooks, 
and it makes use of the useShoppingCart hook from a context provider called ShoppingCartContext.

The useEffect hook is used to perform some side effects when 
the component mounts. It clears the local storage, sets the 
shopping cart items, total price and total quantities to zero, 
and retrieves login data from the local storage. It then sets 
the value of isLogin based on the retrieved data and triggers 
the runFireworks function to display a confetti animation.

The component returns a div element with a class name of min-h-[60vh] 
and a background color of white. Within this div, there is another div 
element with a class name of w-[370px] md:w-[1000px] m-auto mt-[100px] 
md:mt-[160px] bg-[#dcdcdc] p-5 md:p-6 rounded-2xl flex justify-center 
items-center flex-col, which is the main content container of the confirmation 
page. This container includes an icon, a heading, a message, and a button.

The icon is a checkmark that is displayed in green and uses the BsBagCheckFill 
icon from the react-icons/bs module. The heading says "Thank you for your order!" 
and is displayed in a dark blue color. The message tells the user to check their 
email inbox for the receipt and is displayed in a bold font.

There is also a contact email address provided in case the user has any questions or 
concerns. This email address is displayed in red and is linked to a mailto URL that 
opens the user's email client when clicked.

Finally, there is a button with the text "continue shopping" that redirects the user 
to the home page when clicked. The button has a hover effect that scales it up by 10% 
and uses a transition of 500ms with ease-in-out timing.
*/

// Defining the Success component
const Success = () => {
    // Destructuring the useShoppingCart Context hook to get the necessary state setters
    const { setcartItems, settotalPrice, settotalQuantities, setIsLogin } = useShoppingCart()
    
    // useEffect hook to clear local storage, reset cart state, and retrieve login data
    useEffect(() => {
         // run some code after the component has mounted
        const data = window.localStorage.getItem('Login'); // retrieve login information from localStorage
        window.localStorage.clear(); // clear the stored data

        // Resetting cart state
        setcartItems([]); // reset the cart items to an empty array
        settotalPrice(0); // reset the total price to zero
        settotalQuantities(0); // reset the total quantity to zero
        if (data) {
            setIsLogin(JSON.parse(data)); // set the isLogin state using the retrieved data
        }
        else {
            setIsLogin(false); // set the isLogin state to false if there is no data
        }

        // Triggering confetti animation
        runFireworks(); // celebrate the successful purchase with some fireworks
    },[setcartItems, settotalPrice, settotalQuantities, setIsLogin ]) // only run this code once, when the component mounts

  return (

      <div className=' min-h-[60vh] bg-white'>
        <div className=' w-[370px] md:w-[1000px] m-auto mt-[100px] md:mt-[160px] bg-[#dcdcdc] p-5 md:p-6 rounded-2xl flex justify-center items-center flex-col '>
            <p className=' text-green-500 text-4xl'>
                <BsBagCheckFill /> {/* display the shopping bag checkmark icon */}
            </p>
            <h2 className=' capitalize my-4 font-black text-[#324d67]'>
                Thank you for your order! {/* display a message indicating the purchase was successful */}
            </h2>
            <p className=' text-base font-semibold text-center'>
               Check your email inbox for the receipt. {/* display a message to check the user's email for a receipt */}  
            </p>
            <p className=' text-base font-semibold text-center m-2.5 mt-7 ml-1 text-[#f02d34]'>
                If you have any questions, please email {/* display a message with an email address to contact if there are any issues */}
                <a
                    className=' capitalize my-4 font-black text-[#324d67] ml-2'
                    href='mailto:telerfi@ecommerce.com'
                >
                    telerfi@ecommerce.com
                </a>
            </p>
            <Link href='/'>
                  <button
                      type='button'
                      className=' w-full max-w-[300px] py-2.5 px-3 rounded-2xl border-none text-xl text-rose-600 mt-10 cursor-pointer uppercase font-medium scale-100 transition-transform duration-500 ease-in-out hover:scale-110'
                  >
                    continue shopping {/* display a button to continue shopping */}
                </button>
            </Link>
        </div>
      </div>
  )
}

export default Success