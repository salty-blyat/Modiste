"use client"
import { Modal } from 'antd';
import { useState } from 'react';
import FilterModal from './filterModal';

const Filter = () => {
    const [open, setOpen] = useState(false);

    const showModal = () => {
        setOpen(true);
    };
    const handleOk = () => {
        setOpen(false);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <>
            <button className='btn absolute top-[9.5rem] left-5 cursor-pointer p-2 px-4 transition-transform sm:left-10 xl:hidden' onClick={showModal}>
                Filter
            </button>
            <Modal
                open={open}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={(_) => (
                    <button onClick={handleCancel} className='btn cursor-pointer p-2 px-4 transition-transform sm:left-10 xl:hidden'>
                        Apply
                    </button>
                )}
            >
                <div className='mt-4'>
                    <FilterModal />
                </div>
            </Modal>

            <div className="hidden xl:block xl:w-48 xl:mr-5 2xl:mr-0 ">
                <div className='fixed fixed-top z-0'>
                <FilterModal />
                </div>
            </div>
        </>
    );
};

export default Filter;
