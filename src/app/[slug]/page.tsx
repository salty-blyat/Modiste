"use client";
import { StarFilled } from '@ant-design/icons';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Suspense, useEffect, useState } from 'react';
import Cart from '../components/Cart/cart';
import { useAppContext } from '../components/Context';
import Footer from '../components/Footer/footer';
import ProductDetailModal from '../components/Modals/productDetailModal';
import Navbar from '../components/Navbar/navbar';
import ProductGallery from '../components/Product/ProductGallary';

import Loading from '../Loading';
interface Params {
    slug: string;
}

interface ProductDetailsProps {
    params: Params;
}

const ProductDetails = ({ params }: ProductDetailsProps) => {
    const { slug } = params;
    const productId = parseInt(slug);  // Assuming 'slug' is a valid number for product ID  
    const [product, setProduct] = useState<any>(null); // Initialize product state
    const { cartItems, handleAddToCart } = useAppContext()
    const addToCart = () => {
        if (product) {
            const cartItem = {
                ...product,
                inCart: 1 // You can set the initial quantity here (e.g., always add 1) 
            };
            handleAddToCart(cartItem);
        }
    };
    useEffect(() => {
        const fetchProduct = async () => {

            const baseUrl = process.env.NEXT_PUBLIC_GET_PRODUCT;
            const url = `${baseUrl}${productId}`;
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.error('Error fetching product:', error);
                setProduct(null);
            }
        };

        fetchProduct();

    }, [productId]);

    if (!product) {
        return <Loading />; // Show loading state while fetching data
    }

    const totalInCart = cartItems
        .filter(item => item.id === productId) // Filter cart items for the current product ID
        .reduce((acc, item) => acc + (item.inCart || 0), 0);  // Sum the inCart values of the filtered items


    return (
        <>
            <Suspense fallback={<Loading />}>

                <Navbar />
                <div className="pt-[10rem] mx-4 flex flex-col items-center justify-center px-0 sm:px-5 md:px-10 lg:px-36 xl:flex-row xl:items-start xl:gap-12 xl:px-0 2xl:gap-24">
                    <motion.div
                        className="  relative flex h-full  justify-end overflow-hidden xl:w-[50%] 2xl:min-w-[50%]"
                    >
                        <ProductGallery images={product.image_url} />
                    </motion.div>

                    <div className="mt-5 flex flex-1 justify-between px-2">
                        <div>
                            <h2 className="mb-2 text-4xl font-semibold leading-none 2xl:text-5xl">
                                {product.name}
                            </h2>

                            <h3 className="mb-2 text-lg font-semibold leading-none text-zinc-600 2xl:text-2xl">
                                {product.prod_cate && `Category ID: ${product.category_name}`}
                            </h3>

                            <div className="flex items-center gap-1 text-lg">
                                <p className="mb-[-2px]">Rating: {product.reviews ? product.reviews : 'No reviews yet'}</p>
                                <StarFilled />
                                <button className="cursor-pointer text-base text-zinc-500 hover:underline" >
                                    (Show rates)
                                </button>
                            </div>

                            <h3 className="mt-10 text-3xl 2xl:text-4xl">{product.price.toFixed(2)} $</h3>

                            <div className="mt-7 flex flex-wrap gap-2">
                                {/* Assuming product variants will be added later */}
                            </div>

                            {/* <div className="mt-7 flex items-center gap-2">
                                <h4 className="text-xl font-semibold">Select size</h4>
                                <button className="mt-[2px] cursor-pointer text-zinc-500 hover:underline" >
                                    (Size guide)
                                </button>
                            </div> */}
                            <div className="mt-2 flex w-full flex-wrap gap-5">
                                {/* Assuming product sizes will be added later */}
                            </div>

                            <p className="mt-7 2xl:w-2/3">
                                {product.description} Lorem, ipsum dolor sit amet consectetur adipisicing elit. Est a autem molestiae vel commodi inventore repudiandae animi consectetur, sapiente quis laudantium necessitatibus laboriosam ex sed, ipsa reiciendis alias fuga unde.
                    
                            </p>

                            <span className='block'>
                                <ProductDetailModal detail={product.description} />
                            </span>

                            <button
                                className="btn mt-7 text-xl" onClick={addToCart}>
                                Add to cart
                            </button>
                            {totalInCart > 0 &&
                                <span className="text-sm text-gray-900 rounded-full ml-5">x {totalInCart}</span>
                            }

                            <div className="my-5 h-px w-full bg-zinc-300"></div>

                            <Link passHref href="/clothings" className="text-lg underline">
                                Shipping & Returns
                            </Link>
                        </div>
                    </div>
                </div >
                <Cart />

                <Footer />
            </Suspense>

        </>
    );
};

export default ProductDetails;
