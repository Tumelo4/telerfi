import { CartItem } from '@/context/ShoppingCartContext';
import type { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


export default async function handler(req : NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            // Create Checkout Sessions from body params.
            const cartItems: CartItem[] = req.body.cartItems;

            const params: Stripe.Checkout.SessionCreateParams = {
                submit_type: 'pay',
                mode: 'payment',
                payment_method_types: ['card'],
                billing_address_collection: 'auto',
                shipping_options: [
                    { shipping_rate: 'shr_1MaJOAEfkDBLy3Uj6I9fDHX6' },
                    { shipping_rate: 'shr_1MaJS6EfkDBLy3UjRko7nI3I' }
                ],
                line_items: cartItems.map((item) => {
                    const { image, price } = item.product
                    
                    const img = image[0].asset._ref
                    const newImage = img.replace('image-', 'https://cdn.sanity.io/images/r3nlzub1/production/').replace('-webp', '.webp').replace('-png', '.png');
                    
                    return {
                        price_data: { 
                        currency: 'zar',
                        product_data: { 
                            name: item.product.name,
                            images: [newImage],
                        },
                        unit_amount: price * 100,
                        
                        },
                        adjustable_quantity: {
                        enabled:true,
                        minimum: 1,
                        },
                        quantity: item.quantity
                    }
                }),
                success_url: `${req.headers.origin}/success`,
                cancel_url: `${req.headers.origin}/canceled`,
            }
            const session = await stripe.checkout.sessions.create(params);
            res.status(200).json(session);
        }
        catch (err: any) {
            const errorMessage = err instanceof Error ? err.message : 'Internal server error'
            res.status(500).json({ statusCode: 500, message: errorMessage })
        }
    }
    else {
        res.setHeader('Allow', 'POST')
        res.status(405).end('Method Not Allowed')
    }
}