"use client";
import { ProductProps } from '@/app/Types/product';
import axios from 'axios';
import React, { ChangeEvent, ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { useAuthContext } from './auth';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import Cookies from 'js-cookie';

// Define the context type
interface AppContextType {
    openCartModal: boolean;
    productDetailModal: boolean;
    selectedOptions: string[];
    minPrice: number;
    maxPrice: number;
    sortOrder: string;
    isPromotion: boolean;
    cartItems: ProductProps[];
    handleToggleCartModal: () => void;
    handleCheckboxChange: (checkedValues: string[]) => void;
    handleMinPriceChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleMaxPriceChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleMenuClick: (e: { key: string }) => void;
    handlePromotionChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleToggleProductDetailModal: () => void;
    handleAddToCart: (item: ProductProps) => void;
    handleDecreaseCartItem: (item: ProductProps) => void;
    handleClearCartItem: () => void;
    handleCheckout: () => void;
    handleCloseCartModal: () => void;
}

// Create the AppContext
const AppContext = createContext<AppContextType | undefined>(undefined);

// Create the AppProvider component
export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { user } = useAuthContext();
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
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
            console.log('Loaded cart items from cookies:', savedCartItems);
            setCartItems(JSON.parse(savedCartItems));
        }
    }, []);

    // Update cookies and URL whenever cartItems changes or when cartItems are loaded from cookies
    // Update URL parameters only when there are items in the cart
    useEffect(() => {
        // Only update URL parameters if there are items in the cart
        if (cartItems.length > 0) {
            const params = new URLSearchParams(searchParams);
            params.delete('cart');

            cartItems.forEach(item => {
                params.append('cart', `${item.id}:${item.inCart}`);
            });

            router.replace(`${pathname}?${params.toString()}`, { shallow: true });
        } else {
            // If there are no items in the cart, remove the 'cart' parameter from the URL
            const params = new URLSearchParams(searchParams);
            params.delete('cart');

            router.replace(`${pathname}?${params.toString()}`, { shallow: true });
        }
    }, [cartItems, pathname, router, searchParams]);


    const handleAddToCart = (item: ProductProps) => {
        const existingItemIndex = cartItems.findIndex(cartItem => cartItem.id === item.id);
    
        if (existingItemIndex !== -1) {
            // If the item already exists in the cart, check if adding one more exceeds the stock
            const updatedCartItems = [...cartItems];
            const newItemCount = updatedCartItems[existingItemIndex].inCart + 1;
            if (newItemCount <= item.inStock) {
                updatedCartItems[existingItemIndex].inCart = newItemCount;
                setCartItems(updatedCartItems);
            } else {
                // If adding one more exceeds the stock, show an alert to the user
                alert("Cannot add more items. Maximum stock reached.");
            }
        } else {
            // If the item is not in the cart yet, check if adding one exceeds the stock
            if (1 <= item.inStock) {
                setCartItems(cartItems => [...cartItems, { ...item, inCart: 1 }]);
            } else {
                // If adding one exceeds the stock, show an alert to the user
                alert("Cannot add more items. Maximum stock reached.");
            }
        }
    };
    

    const handleClearCartItem = () => {
        setCartItems([]);
    };

    const handleDecreaseCartItem = (item: ProductProps) => {
        const existingItem = cartItems.find(cartItem => cartItem.id === item.id);

        if (existingItem) {
            if (existingItem.inCart > 1) {
                const updatedCartItems = cartItems.map(cartItem =>
                    cartItem.id === item.id
                        ? { ...cartItem, inCart: cartItem.inCart - 1 }
                        : cartItem
                );
                setCartItems(updatedCartItems);
            } else {
                const updatedCartItems = cartItems.filter(cartItem => cartItem.id !== item.id);
                setCartItems(updatedCartItems);
            }
        }
    };

    const handleCheckout = async () => {
        if (!user) {
            alert("Please login");
            return;
        }
        if (cartItems.length > 0 && user) {
            try {
                const requestBody = {
                    customerId: user.user_id,
                    products: cartItems
                };

                const response = await axios.post('http://localhost:3000/api/checkout', requestBody);

                console.log('Checkout successful:', response.data);
                handleClearCartItem();
                alert('success');

            } catch (error) {
                console.error('Error during checkout:', error);
            }
        }
    };

    const handleCheckboxChange = (checkedValues: string[]) => {
        setSelectedOptions(checkedValues);
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

    const handleToggleCartModal = () => {
        setOpenCartModal(prev => !prev);
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
        handleToggleCartModal,
        handleCheckboxChange,
        handleCloseCartModal,
        handleMinPriceChange,
        handleMaxPriceChange,
        handleMenuClick,
        handlePromotionChange,
        handleToggleProductDetailModal,
        handleAddToCart,
        handleDecreaseCartItem,
        handleClearCartItem,
        handleCheckout,
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
