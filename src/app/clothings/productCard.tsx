import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ProductProps } from '../Types/interfaces';


const ProductCard = ({ item }: { item: ProductProps }) => {
    const { id, name, discount, price, image_url, category_name } = item;

    return (
        <motion.div className="h-max">
            <Link href={`/${id}`} className="block w-72 cursor-pointer overflow-hidden 2xl:w-96" passHref>
                <motion.div
                    transition={{
                        duration: 0.3,
                        ease: 'easeInOut',
                    }}
                    whileHover={{ scale: 1.07 }}
                >
                    {/* Accessing the first image URL */}
                    <Image
                        src={image_url[0] || '../../../public/defaultImage.jpg'} // Use the first image URL
                        alt="Product"
                        width={300}
                        height={300}
                        quality={75}
                        className="h-full w-full object-cover"
                    />
                </motion.div>
            </Link>

            <div className="mt-2 flex justify-between">
                <div>
                    <h4 className="-mb-1 text-lg">{name}</h4>
                    <h5 className="text-gray-500">{category_name}</h5>
                </div>
                <div className="text-right">
                    <h4 className="-mb-1 text-lg text-nowrap">$ {price.toFixed(2)}</h4>
                    {discount && (
                        <h5 className="text-gray-500 line-through">${discount}</h5>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;
