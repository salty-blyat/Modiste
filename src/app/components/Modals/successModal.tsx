'use client'
import React from 'react'
import { Modal } from 'antd';


interface SuccessModalProps {
    visible: boolean;
    onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ visible, onClose }) => {
    console.log(visible)
    return (
        <Modal
            open={visible}
            onCancel={onClose} 
            footer={null}
        >
            <div className="my-8 text-center">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-16 shrink-0 fill-[#333] inline"
                    viewBox="0 0 512 512"
                >
                    {/* SVG path */}
                </svg>
                <h4 className="text-2xl text-[#333] font-semibold mt-6">
                    Successfully accepted!
                </h4>
                <p className="text-sm text-gray-500 mt-4">
                    Et leo, enim in non sed quis sed. Auctor natoque auctor risus amet quis
                    mauris. Interdum et nisi, pellentesque id lectus. Ut bibendum
                    pellentesque arcu luctus sapien.
                </p>
            </div>
            <button
                type="button"
                className="px-6 py-2.5 min-w-[150px] w-full rounded text-white text-sm font-semibold border-none outline-none bg-[#333] hover:bg-[#222]"
                onClick={onClose}>
                Got it
            </button>
        </Modal>
    );
};

export default SuccessModal;
