"use client";
import { ProductProps } from '@/app/Types/interfaces';
import axios from 'axios';
import Cookies from 'js-cookie';
import React, { ChangeEvent, Dispatch, ReactNode, SetStateAction, createContext, useContext, useEffect, useState } from 'react';
import { useAuthContext } from './auth';

// Define the context type
// Ensure the 'handleCheckboxChange' function in the AppContextType interface
interface AppContextType {
    openCartModal: boolean;
    productDetailModal: boolean;
    selectedOptions: string[];
    minPrice: number;
    maxPrice: number;
    sortOrder: string;
    isPromotion: boolean;
    cartItems: ProductProps[];
    handleOpenCartModal: () => void;
    handleCloseCartModal: () => void;
    handleCheckboxChange: (checkedValues: string | string[]) => void;
    handleMinPriceChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleMaxPriceChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleMenuClick: (e: { key: string }) => void;
    handlePromotionChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleToggleProductDetailModal: () => void;
    handleAddToCart: (item: ProductProps) => void;
    handleDecreaseCartItem: (item: ProductProps) => void;
    handleClearCartItem: () => void;
    handleCheckout: () => void | string | Promise<any>;
}

// Define the context
const AppContext = createContext<AppContextType | undefined>(undefined);

// Implement the AppProvider component
export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { user } = useAuthContext();

    const [cartItems, setCartItems] = useState<ProductProps[]>([]);
    const [openCartModal, setOpenCartModal] = useState(false);
    const [productDetailModal, setProductDetailModal] = useState(false);
    const [isPromotion, setIsPromotion] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    const [minPrice, setMinPrice] = useState<number>(1);
    const [maxPrice, setMaxPrice] = useState<number>(10000);

    const [sortOrder, setSortOrder] = useState<string>('Default');

    // Load cart items from cookies on component mount
    useEffect(() => {
        const savedCartItems = Cookies.get('cartItems');
        if (savedCartItems) {
            setCartItems(JSON.parse(savedCartItems));
        }
    }, []);


    // Update the cart items in cookies
    const updateCartItemsInCookies = (items: ProductProps[]) => {
        Cookies.set('cartItems', JSON.stringify(items), { expires: 7 }); // Set cookies to expire in 7 days
    };

    const handleAddToCart = (item: ProductProps) => {
        const existingItemIndex = cartItems.findIndex(cartItem => cartItem.id === item.id);
        if (existingItemIndex !== -1) {
            const updatedCartItems = [...cartItems];
            const newItemCount = (updatedCartItems[existingItemIndex].inCart || 0) + 1;
            if (newItemCount <= (item.inStock || 0)) {
                updatedCartItems[existingItemIndex].inCart = newItemCount;
                setCartItems(updatedCartItems);
                updateCartItemsInCookies(updatedCartItems); // Update cookies
            } else {
                alert("Cannot add more items. Maximum stock reached.");
            }
        } else {
            if (1 <= (item.inStock || 0)) {
                const updatedCartItems = [...cartItems, { ...item, inCart: 1 }];
                setCartItems(updatedCartItems);
                updateCartItemsInCookies(updatedCartItems); // Update cookies
            } else {
                alert("Cannot add more items. Maximum stock reached.");
            }
        }
    };

    const handleClearCartItem = () => {
        setCartItems([]);
        Cookies.remove('cartItems');
    };

    const handleDecreaseCartItem = (item: ProductProps) => {
        const existingItem = cartItems.find(cartItem => cartItem.id === item.id);
        if (existingItem) {
            if ((existingItem.inCart || 0) > 1) {
                const updatedCartItems = cartItems.map(cartItem =>
                    cartItem.id === item.id
                        ? { ...cartItem, inCart: (cartItem.inCart || 0) - 1 }
                        : cartItem
                );
                setCartItems(updatedCartItems);
                updateCartItemsInCookies(updatedCartItems); // Update cookies
            } else {
                const updatedCartItems = cartItems.filter(cartItem => cartItem.id !== item.id);
                setCartItems(updatedCartItems);
                updateCartItemsInCookies(updatedCartItems); // Update cookies
            }
        }
    };

    const handleCheckout = async () => {
        if (!user) {
            alert("Please login");
            return 'fail'; // Return 'fail' if user is not logged in
        }

        if (cartItems.length > 0 && user) {
            const url = process.env.NEXT_PUBLIC_CHECKOUT;

            if (!url) {
                console.error('NEXT_PUBLIC_CHECKOUT environment variable is not defined.');
                alert('Checkout URL is not defined. Please contact support.');
                return 'fail';
            }

            try {
                const requestBody = {
                    customerId: user.user_id,
                    products: cartItems
                };

                const response = await axios.post(url, requestBody).then(res => res.data)
                handleClearCartItem();

                if (response.message === 'Stock decremented, purchases incremented, and cart updated successfully') {
                    return true; // Return true on success
                } else {
                    return false; // Return false on failure
                }

            } catch (error) {
                alert('Error during checkout. Please try again.');
            }
        }
    };

    // Updated handleCheckboxChange function
    const handleCheckboxChange = (checkedValues: string | string[]) => {
        const values = Array.isArray(checkedValues) ? checkedValues : [checkedValues];
        setSelectedOptions(values);
    };

    const handleMinPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
        setMinPrice(Number(e.target.value));
    };

    const handleMaxPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
        setMaxPrice(Number(e.target.value));
    };

    const handleMenuClick = (e: { key: string }) => {
        setSortOrder(e.key);
    };

    const handlePromotionChange = (e: ChangeEvent<HTMLInputElement>) => {
        setIsPromotion(e.target.checked);
    };

    const handleOpenCartModal = () => {
        setOpenCartModal(true);
    };

    const handleCloseCartModal = () => {
        setOpenCartModal(false);
    };

    const handleToggleProductDetailModal = () => {
        setProductDetailModal(prev => !prev);
    };

    const contextValue: AppContextType = {
        openCartModal,
        productDetailModal,
        selectedOptions,
        minPrice,
        maxPrice,
        sortOrder,
        isPromotion,
        cartItems,
        handleCheckboxChange,
        handleOpenCartModal,
        handleCloseCartModal,
        handleMinPriceChange,
        handleMaxPriceChange,
        handleMenuClick,
        handlePromotionChange,
        handleToggleProductDetailModal,
        handleAddToCart,
        handleDecreaseCartItem,
        handleClearCartItem,
        handleCheckout
    };

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
};

// Export a custom hook to consume the AppContext
export const useAppContext = (): AppContextType => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};
