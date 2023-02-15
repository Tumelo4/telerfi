import { loadStripe, Stripe } from '@stripe/stripe-js';

let stripePromise: Promise<Stripe | null>;
const key: string = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? 'key'

export const getStripe = () => {
    if (!stripePromise) {
        stripePromise = loadStripe(key);
    }
    return stripePromise;
}
