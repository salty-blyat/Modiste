"use client"
import { motion } from 'framer-motion';
import Image from 'next/image';
import heroImg from '../../../../public/heroimg.webp';


export default function Hero() {

    return (
        <div className='mt-32 py-40 px-6'>
            <h1 className='text-5xl md:text-6xl xl:text-extra font-extrabold xl:-mt-12 -mt-5 md:-mt-8'>Shop with us</h1>
            <Image 
                src={heroImg}
                alt="hero img"
                className="h-full w-full object-cover object-center"
                priority
            />
        </div>
    );
}
