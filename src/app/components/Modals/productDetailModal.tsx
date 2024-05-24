"use client";
import React from 'react';
import { Button, Modal } from 'antd';
import { useAppContext } from '../Context';

const ProductDetailModal = ({ detail }: { detail: string }) => {
    const { productDetailModal, handleToggleProductDetailModal } = useAppContext();

    
    return (
        <>
            <Button type="link" className='cursor-pointer text-xs text-zinc-500 underline p-0' onClick={handleToggleProductDetailModal}>
                <span className='underline'>View product details</span>
            </Button>
            <Modal
                open={productDetailModal}
                title={null}
                onOk={handleToggleProductDetailModal}
                onCancel={handleToggleProductDetailModal}
                footer={null}
            >
                <div className="relative max-w-[35rem] rounded-md bg-white p-10 pb-14">

                    <h1 className="text-center text-5xl font-bold leading-10">Product details</h1>
                    <h2 className="mt-2 mb-5 text-center text-2xl font-semibold text-zinc-700">Created with passion.</h2>
                    <p>{detail}</p>
                </div>
            </Modal>
        </>
    );
};

export default ProductDetailModal;
