"use client";
import { DownOutlined } from '@ant-design/icons';
import { Checkbox, Dropdown, Menu } from 'antd';
import React from 'react';
import { motion, useCycle } from 'framer-motion';
import { useAppContext } from '../Context';

const FilterModal = () => {
    const {
        selectedOptions,
        minPrice,
        maxPrice,
        sortOrder,
        isPromotion,
        handleCheckboxChange,
        handleMinPriceChange,
        handleMaxPriceChange,
        handleMenuClick,
        handlePromotionChange,
    } = useAppContext();

    const options = [
        { label: <span className="text-base font-normal">Men</span>, value: 'Men' },
        { label: <span className="text-base font-normal">Women</span>, value: 'Woman' },
        { label: <span className="text-base font-normal">Kids</span>, value: 'Kids' },
        { label: <span className="text-base font-normal">Unisex</span>, value: 'Unisex' },
    ];

    const items = [
        { key: 'Default', label: 'Default' },
        { key: 'Low to High', label: 'Price: Low to High' },
        { key: 'High to Low', label: 'Price: High to Low' },
        { key: 'A...Z', label: 'A...Z' },
        { key: 'Z...A', label: 'Z...A' },
    ];

    const menu = (
        <Menu items={items} onClick={handleMenuClick} />
    );
    const [rotate, cycleRotate] = useCycle(90, 0);

    return (
        <>
            <Dropdown overlay={menu} trigger={['click']} className="hover:cursor-pointer mb-3" onOpenChange={cycleRotate}>
                <div className='text-2xl font-semibold' onClick={(e) => e.preventDefault()}>
                    <p className='mb-3'>Sort by</p>
                    <p className='text-xl flex justify-between items-center font-medium border rounded-lg px-5'>
                        <span>{sortOrder}</span>
                        <motion.div animate={{ rotate: rotate }}>
                            <DownOutlined className='scale-90 text-zinc-900' />
                        </motion.div>
                    </p>
                </div>
            </Dropdown>

            <hr />

            <div className='text-2xl font-semibold my-3'>
                Gender
                <Checkbox.Group className="flex flex-col my-3 text-base" options={options} value={selectedOptions} onChange={handleCheckboxChange} />
            </div>

            <hr />

            <div className='text-2xl font-semibold my-3'>
                Price
            </div>
            <Checkbox checked={isPromotion} onChange={handlePromotionChange}>
                <span className='text-base'>Promotion</span>
            </Checkbox>

            <div className="flex gap-x-5 my-3">
                <div className="flex flex-col items-center">
                    <label className="text-base" htmlFor="minPrice">Min Price</label>
                    <input id="minPrice" type="number" value={minPrice} onChange={handleMinPriceChange} className="text-center w-20 outline-1 border-1 border rounded-sm" />
                </div>
                <div className="flex flex-col items-center">
                    <label className="text-base" htmlFor="maxPrice">Max Price</label>
                    <input id="maxPrice" type="number" value={maxPrice} onChange={handleMaxPriceChange} className="text-center w-20 outline-1 border-1 border rounded-sm" />
                </div>
            </div>
            <hr />
        </>
    );
};

export default FilterModal;
