"use client"
import { Image as ImgD } from 'antd';
import { useAuthContext } from '../components/Context/auth';
import Navbar from '../components/Navbar/navbar';
import Cart from '../components/Cart/cart';
import { Suspense } from 'react';
import Loading from '../Loading';
import Link from 'next/link';
import { CalendarOutlined, EditOutlined, UserOutlined } from '@ant-design/icons';


const Profile = () => {
    const { user } = useAuthContext();
    return (
        <>
            <Suspense fallback={<Loading />}>
                <Navbar />
                <Cart />

                <section className="transition-all mx-4 transform ease-in delay-100 mt-36 shadow-lg flex flex-col md:flex-row gap-4">
                    <div className="w-full md:w-1/4 mb-4 md:mb-0">
                        <div className="bg-white shadow rounded-lg p-4">
                            <div className="flex flex-col items-center space-y-4">
                                <Link href="#">
                                    <ImgD src={user?.img_url} className='rounded-lg' />
                                </Link>
                                <h1 className="text-xl font-semibold">Camila Smith</h1>
                                <p className="text-gray-600">deydey@theEmail.com</p>
                            </div>
                            <ul className="mt-4 space-y-2">
                                <li>
                                    <Link href="#" className="flex items-center p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                                        <UserOutlined className='pr-2' />
                                        <span>Profile</span>

                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="flex items-center p-2 text-gray-700 hover:bg-gray-50 rounded-lg">
                                        <CalendarOutlined className='pr-2' />
                                        <span>Recent Activity</span>
                                        <span className="ml-auto bg-yellow-400 text-white rounded-full px-2 py-1 text-xs">
                                            9
                                        </span>

                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="flex items-center p-2 text-gray-700 hover:bg-gray-50 rounded-lg">
                                        <EditOutlined className='pr-2' />
                                        <span>Edit profile</span>

                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="w-full md:w-3/4 h-full">
                        <div className="bg-white shadow rounded-lg p-4 mb-4">
                            <h1 className="text-xl font-semibold mb-4">Bio Graph</h1>
                            <div className="grid grid-cols-2 gap-4 font-semibold">
                                {/* Bio details */}
                                <p><span>Name:</span>{user?.user_name || "Name"}</p>
                                <p><span>Email:</span>{user?.email || 'email'}</p>
                                <p><span>Account Type:</span>{user?.user_role || 'type'}</p>
                            </div>
                        </div>
                    </div>
                </section>
            </Suspense>
            <Navbar />
            <Cart />

        </>
    );
};

export default Profile;
