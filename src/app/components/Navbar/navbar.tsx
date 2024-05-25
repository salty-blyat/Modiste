"use client";
import { LogoutOutlined, PhoneOutlined, SettingOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Popover, Image as ImageDesign, Modal } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import kidImage from '../../../../public/collections/kid.webp';
import menImage from '../../../../public/collections/men.webp';
import unisexImage from '../../../../public/collections/unisex.webp';
import womenImage from '../../../../public/collections/women.webp';
import { useAppContext } from '../Context';
import { PopoverContent } from '../Popover/popover';
import NavItem from './navItem';
import { useAuthContext } from '../Context/auth';
import { useState } from 'react'; 


const Navbar = () => {
    const { user, logout } = useAuthContext();
    const { handleToggleCartModal, handleCheckboxChange, cartItems } = useAppContext();
    const totalInCart = cartItems.reduce((acc, item) => acc + (item.inCart || 0), 0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
        logout();
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const ProfileSetting = (
        <div className=' flex-col flex w-40 gap-y-3'>
            <Button className='text-left flex items-center gap-x-2' type='text'>
                <Link href={'/profile'} passHref>
                    <UserOutlined /> Profile
                </Link>
            </Button>
            <Button className='text-left flex items-center gap-x-2' type='text'>
                <Link href={'/setting'} passHref>
                    <SettingOutlined /> Setting
                </Link>
            </Button>
            <hr />
            <Button className='text-left flex items-center gap-x-2' type='text' onClick={showModal}>
                <LogoutOutlined /> Log out
            </Button>
        </div >
    );


    return (

        <section className="flex shadow-md flex-wrap fixed fixed-top z-10 bg-white top-0 left-0 right-0 mx-auto max-w-full">

            {/* Navbar */}
            <nav className="flex justify-between w-full">
                <div className="px-5 xl:px-12 py-6 flex w-full items-center">
                    <Link href="/" className="text-3xl font-bold font-heading" passHref>
                        MODISTE
                    </Link>
                    <Modal
                        title="Confirm"
                        open={isModalOpen}
                        onOk={handleOk}
                        onCancel={handleCancel}
                        okText="Confirm"
                        cancelText="Cancel"
                    >
                        <p>Are you sure you want to log out?</p>
                    </Modal>
                    <ul className="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12">
                        <NavItem
                            title="Men"
                            linkTo="/clothings"
                            image={menImage}
                            handleClick={() => handleCheckboxChange('Men')}
                        />
                        <NavItem
                            title="Women"
                            linkTo="/clothings"
                            image={womenImage}
                            handleClick={() => handleCheckboxChange('Woman')}
                        />
                        <NavItem
                            title="Kids"
                            linkTo="/clothings"
                            image={kidImage}
                            handleClick={() => handleCheckboxChange('Kids')}
                        />
                        <NavItem
                            title="Unisex"
                            linkTo="/clothings"
                            image={unisexImage}
                            handleClick={() => handleCheckboxChange('Unisex')}
                        />
                    </ul>

                    {/* Header Icons */}
                    <div className="hidden hover:cursor-pointer gap-x-3 xl:flex space-x-5 items-center relative">
                        <Link href="/contactus" passHref>
                            <PhoneOutlined className='text-xl p-2 transition-all ease-in transform hover:scale-110 hover:bg-gray-600 hover:text-white rounded-full' />
                        </Link>
                        {/* SVG Icon */}
                        <Popover content={PopoverContent} title="Cart" placement='bottomLeft'>
                            <ShoppingCartOutlined
                                className='text-2xl p-2 transition-all ease-in transform hover:scale-110 hover:bg-gray-600 hover:text-white rounded-full'
                                onClick={handleToggleCartModal}
                            />
                            {totalInCart > 0 &&
                                <div className='hover:cursor-pointer hidden xl:block absolute bottom-1 right-14'>
                                    <span className="bg-red-900 py-1 px-2 text-xs text-white rounded-full">{totalInCart}</span>
                                </div>
                            }
                        </Popover>
                        {user?.img_url ? (
                            <Link href="/profile" passHref>
                                <Popover placement="bottomLeft" content={ProfileSetting}>
                                    <Image className='rounded-full' src={user.img_url} alt={user.user_name} width={45} height={45} />
                                </Popover>
                            </Link>
                        ) : (
                            <Popover placement="bottomLeft" content={user ? ProfileSetting : <Button href='/login'>Sign in</Button>}>
                                {user ? (
                                    <Link className='bg-indigo-100 size-9 rounded-full' href="/profile" passHref>
                                        <ImageDesign src={user?.img_url} style={{ fontSize: "1.4rem" }} />
                                    </Link>
                                ) : (
                                    <Link href="/login" passHref>
                                        <UserOutlined className='text-xl p-2 transition-all ease-in transform hover:scale-110 hover:bg-gray-600 hover:text-white rounded-full' />
                                    </Link>
                                )}
                            </Popover>
                        )}
                    </div>
                </div>
                {/* Responsive navbar for small screen toggle */}
                <div className="xl:hidden flex gap-x-1 mr-6 items-center relative pr-6">
                    {/* Responsive Icon */}
                    <Link href="/contactus" passHref>
                        <PhoneOutlined className='text-xl p-2 transition-all ease-in transform hover:scale-110 hover:bg-gray-600 hover:text-white rounded-full' />
                    </Link>
                    <Popover content={PopoverContent} title="Cart" placement='bottomLeft'>
                        <ShoppingCartOutlined
                            className='text-2xl p-2 transition-all ease-in transform hover:scale-110 hover:bg-gray-600 hover:text-white rounded-full'
                            onClick={handleToggleCartModal}
                        />
                        {totalInCart > 0 &&
                            <div className='xl:hidden hover:cursor-pointer absolute bottom-6 right-12 '>
                                <span className="bg-red-900 py-1 px-2 text-xs text-white rounded-full">{totalInCart}</span>
                            </div>
                        }
                    </Popover>
                    {user?.img_url ? (
                        <Popover placement="bottomLeft" content={ProfileSetting} trigger='click'>
                            {/* <Link href="/profile" passHref> */}
                            <Image src={user?.img_url} alt={user.user_name} className='rounded-full' width={35} height={35} />
                            {/* </Link> */}
                        </Popover>
                    ) : (
                        <Popover placement="bottomLeft" content={user ? ProfileSetting : <Button href='/login'>Sign in</Button>}>
                            {user ? (
                                <Link className='bg-indigo-100 size-9 rounded-full' href="/profile" passHref>
                                    <ImageDesign src={user?.img_url} style={{ fontSize: "1.4rem" }} />
                                </Link>
                            ) : (
                                <Link href="/login" passHref>
                                    <UserOutlined className='text-xl p-2 transition-all ease-in transform hover:scale-110 hover:bg-gray-600 hover:text-white rounded-full' />
                                </Link>
                            )}
                        </Popover>
                    )}
                </div>
            </nav>
        </section >
    );
};

export default Navbar;
