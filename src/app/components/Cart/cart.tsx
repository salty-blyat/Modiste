"use client"
import { ProductProps } from '@/app/Types/interfaces';
import { CloseSquareOutlined, MinusOutlined, PlusOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Button, Drawer } from 'antd';
import { useState } from 'react';
import { useAppContext } from '../Context';
import ConfirmCartModal from './helper/confirmCartModal';



const Cart = () => {
    const { handleAddToCart, handleCloseCartModal, handleDecreaseCartItem, openCartModal, cartItems, handleClearCartItem } = useAppContext();
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
        <Drawer title={
            <div className="flex w-full items-center justify-between">
                <div className="flex items-baseline gap-2">
                    <h1 className="text-xl font-semibold">
                        Cart ({cartItems.reduce((total, item) => total + (item.inCart || 0), 0)})
                    </h1>
                    <button className="text-sm hover:underline" onClick={handleClearCartItem}>
                        (Clear cart)
                    </button>
                </div>
            </div>
        }
            onClose={handleCloseCartModal} open={openCartModal}>
            {/* Cart header */}
            <div className='flex flex-col justify-between h-full'>

                {/* Cart product list */}
                <div className="-mr-1 flex flex-1 flex-col gap-5 p-1">
                    {/* Display cart products */}
                    {cartItems.map((item) => (
                        <div key={item.id} className="flex justify-between items-center">
                            <p className=' text-ellipsis line-clamp-1 mr-7'> {item.name}</p>
                            <div className='flex items-center justify-center gap-x-3 text-nowrap'>
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

                <div className=" mb-2 flex w-full flex-col items-start justify-between sm:mb-0 sm:flex-row sm:items-center">
                    <h3 className="text-xl font-semibold">Total: ${totalPrice}</h3>
                    <h4>
                        Free shipping <ShoppingCartOutlined className="mb-[2px] inline" />
                    </h4>
                </div>

                {/* Checkout button */}
                <button onClick={handleConfirmCheckout} className="btn block w-full text-center">
                    Checkout
                </button>
            </div>
            <ConfirmCartModal isModalOpen={isModalOpen} closeModal={closeModal} />

        </Drawer>
    );
};

export default Cart;
