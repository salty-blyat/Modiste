"use client"
import { motion } from 'framer-motion';
import { StaticImageData } from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import MotionImage from './helper/MotionImage';


interface Props {
    title: string;
    linkTo: string;
    image: StaticImageData;
    handleClick: (e:string) => void;
}

const NavItem = ({ title, linkTo, image, handleClick }: Props) => {
    const [isHover, setIsHover] = useState(false);
    return (
        <div>
            <MotionImage isHover={isHover} image={image} title={title} />
            <Link href={linkTo} passHref>
                <motion.div
                    className="transition-all hover:underline"
                    onHoverStart={() => setIsHover(true)}
                    onHoverEnd={() => setIsHover(false)}
                    onClick={() =>handleClick}
                >
                    {title}
                </motion.div>
            </Link>
        </div>
    );
};

export default NavItem;
