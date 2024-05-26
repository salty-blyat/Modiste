'use client'
import { ArrowLeftOutlined, MinusOutlined, PlusOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useState } from 'react';
import { ProductProps } from '../Types/interfaces';
import ConfirmCartModal from '../components/Cart/helper/confirmCartModal';
import { useAppContext } from '../components/Context';
import Navbar from '../components/Navbar/navbar';
import Link from 'next/link';
import Successmodal from '../components/Modals/successModal';

const CartPage = () => {
    const {
        handleAddToCart,
        handleDecreaseCartItem,
        cartItems,
        handleClearCartItem,
    } = useAppContext();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const totalPrice = cartItems.reduce((total, item) => total + item.price * (item.inCart || 1), 0).toFixed(2);

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
        <> 
            <Navbar />
            {/* Cart content */}
            <div className="mt-20 flex flex-col gap-7 h-full p-5  sm:p-10 w-full">
                {/* Cart header */}
                <div className="flex w-full items-center justify-between ">
                    <div className='flex items-center gap-x-2'>
                        <Link href={'/'}>
                            <ArrowLeftOutlined className='p-2 hover:bg-slate-400 rounded-full' />
                        </Link>
                        <h1 className="text-xl font-semibold items-center gap-2">
                            Cart ({cartItems.reduce((total, item) => total + (item.inCart || 0), 0)})
                        </h1>
                    </div>
                    <button className="text-sm hover:underline" onClick={handleClearCartItem}>
                        (Clear cart)
                    </button>
                </div>

                {/* Cart product list */}
                <div className="-mr-1 flex flex-1 flex-col gap-5 overflow-x-hidden p-1">
                    {/* Display cart products */}
                    {cartItems.map((item) => (
                        <div key={item.id} className="flex justify-between">
                            <p className="text-ellipsis line-clamp-1 mr-7">{item.name}</p>
                            <div className="flex items-center justify-center gap-x-3">
                                <Button onClick={() => handleDecrement(item)} className="flex items-center justify-center">
                                    <MinusOutlined />
                                </Button>
                                <p>Qty: {item.inCart}</p>
                                <Button onClick={() => handleAdd(item)} className="flex items-center justify-center">
                                    <PlusOutlined />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Cart footer */}
                <div className='fixed bottom-10 right-10 left-10'>
                    <div className="mb-2 flex flex-col items-start justify-between sm:mb-0 sm:flex-row sm:items-center">
                        <h3 className="text-xl font-semibold">Total: ${totalPrice}</h3>
                        <h4>
                            Free shipping <ShoppingCartOutlined className="mb-[2px] inline" />
                        </h4>
                    </div>

                    {/* Checkout button */}
                    <button onClick={handleConfirmCheckout} className="btn w-full block text-center">
                        Checkout
                    </button>
                </div>
                <ConfirmCartModal isModalOpen={isModalOpen} closeModal={closeModal} />
            </div>
        </>
    );
};

export default CartPage;
