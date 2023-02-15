import { auth } from '@/lib/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { ProductsType } from '@/pages';
import React, { createContext, ReactNode, useContext, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface ShoppingCartProviderProps {
    children: ReactNode
}

export interface CartItem {
    product: ProductsType,
    quantity: number
}

interface ShoppingCartContextProps {
    showCart: boolean,
    setshowCart: React.Dispatch<React.SetStateAction<boolean>>,
    cartItems: CartItem[],
    setcartItems:React.Dispatch<React.SetStateAction<CartItem[]>>,
    totalPrice: number,
    settotalPrice: React.Dispatch<React.SetStateAction<number>>,
    totalQuantities: number,
    settotalQuantities: React.Dispatch<React.SetStateAction<number>>,
    qty: number,
    incqty: () => void,
    decqty: () => void,
    onAdd: (product: ProductsType, quantity: number) => void,
    onRemove: (id: string) => void,
    toggleCartItemQuanitity: (id: string, value: string) => void,
    signUp: (email: string, password: string) => void,
    login: (email: string, password: string) => void,
    logout: () => void,
    isLogin: boolean,
    isLoginC: boolean,
    setisLoginC: React.Dispatch<React.SetStateAction<boolean>>,
    setOpenLogin: React.Dispatch<React.SetStateAction<boolean>>,
    openLogin: boolean,
    setIsLogin: React.Dispatch<React.SetStateAction<boolean>>
}

const ShoppingCartContext = createContext({} as ShoppingCartContextProps);

export const useShoppingCart = () => {
  return useContext(ShoppingCartContext)
}

export const ShoppingCartProvider = ({ children }: ShoppingCartProviderProps) => {
    const [showCart, setshowCart] = useState<boolean>(() => false);
    const [cartItems, setcartItems] = useLocalStorage<CartItem[]>('CartItemsArray', []);
    const [totalPrice, settotalPrice] = useLocalStorage<number>('TotalPrice', 0);
    const [totalQuantities, settotalQuantities] = useLocalStorage<number>('TotalQuantities', 0);
    const [qty, setqty] = useState<number>(() => 1);
    // For Navbar Component to check if user login or not
    const [isLogin, setIsLogin] = useLocalStorage<boolean>('Login', false);
    // Login Component
    const [isLoginC, setisLoginC] = useState<boolean>(() => true);
    const [openLogin, setOpenLogin] = useState<boolean>(false);
    

    const incqty = () => setqty((prevqty) => prevqty + 1);
    const decqty = () => setqty((prevqty) => prevqty < 2 ? 1 : prevqty - 1);

    const onAdd = (product: ProductsType, quantity: number) => {
        const checkProductIncart = cartItems.find((item) => item.product._id === product._id);
        
        settotalPrice(prevtotalPrice => prevtotalPrice + product.price * quantity);
        settotalQuantities(prevtotalQuantities => prevtotalQuantities + quantity);

        if (checkProductIncart)
        {
            setcartItems(prevcartItems => prevcartItems.map(item => item.product._id === product._id ? { ...item, quantity: item.quantity + quantity } : item));
        }
        else
        {
            setcartItems(prevcartItems => [...prevcartItems, { product, quantity }]);
        }

        toast.success(`${qty} ${product.name} added to the cart.`);
    }

    const onRemove = (id: string) => {
        const found = cartItems.find((item) => item.product._id === id);
        setcartItems(prevcartItems => prevcartItems.filter(item => item.product._id !== id));
        if (found)
        {
            settotalPrice(prevtotalPrice => prevtotalPrice - found.product.price * found.quantity);
            settotalQuantities(prevtotalQuantities => prevtotalQuantities - found.quantity);
        }
    }

    const toggleCartItemQuanitity = (id: string, value: string) => {
        const found = cartItems.find((item) => item.product._id === id);

        if (found) {
            if (value === 'dec' && found.quantity > 1) {
                setcartItems(prevcartItems => prevcartItems.map(item => item.product._id === id ? { ...item, quantity: item.quantity - 1 } : item));
                settotalPrice(prevtotalPrice => prevtotalPrice - found.product.price);
                settotalQuantities(prevtotalQuantities => prevtotalQuantities - 1);
                // setqty((prevqty) => prevqty - 1)
            }
            else if (value === 'inc') {
                setcartItems(prevcartItems => prevcartItems.map(item => item.product._id === id ? { ...item, quantity: item.quantity + 1 } : item));
                settotalPrice(prevtotalPrice => prevtotalPrice + found.product.price);
                settotalQuantities(prevtotalQuantities => prevtotalQuantities + 1);
                // setqty((prevqty) => prevqty + 1)
            }
        }
    }


    const signUp = async (email: string, password: string) => {
        
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            toast.success('SignUp Successfully!');
            setisLoginC(true)
        }
        catch (err: any) {}
    }

    const login = async (email: string, password: string) => {
        try {
            await signInWithEmailAndPassword(auth, email, password)
            toast.success('Login Successfully!');
            setIsLogin(true);
        }
        catch (err: any) {}
    }

    const logout = () => {
        return signOut(auth);
    }

    return (
        <ShoppingCartContext.Provider
            value={{
                incqty,
                decqty,
                showCart,
                setshowCart,
                cartItems,
                setcartItems,
                totalPrice,
                settotalPrice,
                totalQuantities,
                settotalQuantities,
                qty,
                onAdd,
                onRemove,
                toggleCartItemQuanitity,
                signUp,
                login,
                logout,
                isLogin,
                isLoginC,
                setisLoginC,
                setOpenLogin,
                openLogin,
                setIsLogin
            }}
        >
            {children}
        </ShoppingCartContext.Provider>
    )
}