"use client"
import { ProductProps } from '@/app/Types/interfaces';
import { CloseSquareOutlined, MinusOutlined, PlusOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { useAppContext } from '../Context'; 
import ConfirmCartModal from './helper/confirmCartModal';



const Cart = () => {
    const { handleCloseCartModal, handleAddToCart, handleDecreaseCartItem, openCartModal, cartItems, handleToggleCartModal, handleClearCartItem, handleCheckout } = useAppContext();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const totalPrice = cartItems.reduce((total, item) => total + item.price, 0).toFixed(2)

    const handleAdd = (cartItem: ProductProps) => {
        handleAddToCart(cartItem);
    };

    const handleDecrement = (cartItem: ProductProps) => {
        handleDecreaseCartItem(cartItem);
    };
    const showModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleConfirmCheckout = () => {
        showModal();
    };
    return (
        <AnimatePresence>
            {openCartModal && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={handleCloseCartModal}
                    className="fixed top-0 left-0 z-20 flex h-full w-full justify-end bg-black/50"  >
                    {/* Cart content */}
                    <motion.div
                        onClick={(e) => e.stopPropagation()}
                        className="flex flex-col gap-7 bg-white p-5 sm:w-[32rem] sm:p-10 lg:w-[36rem]"
                        initial={{ x: 100, opacity: 0 }}
                        animate={{
                            x: 0,
                            y: 0,
                            scale: 1,
                            rotate: 0,
                            opacity: 1,
                            transition: {

                                ease: 'easeIn', // Apply ease-in easing curve
                                duration: 0.2 // Adjust the duration as needed
                            }
                        }}
                        exit={{
                            x: 100,
                            y: 0,
                            scale: 1,
                            rotate: 0,
                            opacity: 0,
                            transition: {

                                ease: 'easeOut', // Apply ease-in easing curve
                                duration: 0.2 // Adjust the duration as needed
                            }
                        }}
                    >
                        {/* Cart header */}
                        <div className="flex w-full items-center justify-between">
                            <div className="flex items-center gap-2">
                                <h1 className="text-xl font-semibold">
                                    Cart ({cartItems.reduce((total, item) => total + (item.inCart || 0), 0)})
                                </h1>
                                <button className="text-sm hover:underline" onClick={handleClearCartItem}>
                                    (Clear cart)
                                </button>
                            </div>

                            <button className="btn-icon">
                                <CloseSquareOutlined onClick={handleToggleCartModal} />
                            </button>
                        </div>

                        {/* Cart product list */}
                        <div className="overflow-overlay -mr-1 flex flex-1 flex-col gap-5 overflow-x-hidden p-1">
                            {/* Display cart products */}
                            {cartItems.map((item) => (
                                <div key={item.id} className="flex justify-between">
                                    <p className=' text-ellipsis line-clamp-1 mr-7'> {item.name}</p>
                                    <div className='flex items-center justify-center gap-x-3'>
                                        <Button onClick={() => handleDecrement(item)} className="flex items-center justify-center"> <MinusOutlined /></Button>
                                        <p>Qty: {item.inCart}</p>
                                        <Button onClick={() => handleAdd(item)} className="flex items-center justify-center">
                                            <PlusOutlined />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Cart footer */}
                        <div className="mb-2 flex w-full flex-col items-start justify-between sm:mb-0 sm:flex-row sm:items-center">
                            <h3 className="text-xl font-semibold">Total: ${totalPrice}</h3>
                            <h4>
                                Free shipping <ShoppingCartOutlined className="mb-[2px] inline" />
                            </h4>
                        </div>

                        {/* Checkout button */}
                        <button onClick={handleConfirmCheckout} className="btn block w-full text-center">
                            Checkout
                        </button>
                        <ConfirmCartModal isModalOpen={isModalOpen} closeModal={closeModal} />
                    </motion.div>
                </motion.div>
            )
            }
        </AnimatePresence >
    );
};

export default Cart;
