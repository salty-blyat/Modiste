"use client"
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import defaultImage from '../../../../public/defaultImage.jpg'

interface Props {
    right?: boolean;
    title: string;
    subtitle: string;
    image: StaticImageData;
    href: string;
    handleClick: (e: string) => void;
}

const Collection = ({ right = false, title, subtitle, image, href, handleClick }: Props) => {
    return (
        <div className={`flex ${right ? 'flex-row-reverse self-end' : ''} -mb-8 h-96 gap-4 sm:gap-8 `}>
            <div className="h-72 sm:h-80 w-48 sm:w-64 xl:h-auto xl:w-80 relative">
                <Image
                    src={image || defaultImage} // Use image directly as src
                    alt={title}
                    className='object-cover'
                    layout="fill" // Make sure to include layout if necessary
                />
            </div>
            <div className={`mt-10 flex flex-col ${right ? 'items-end text-right' : 'items-start text-left'}`}>
                <h2 className="-mb-2 text-3xl font-bold sm:text-5xl">{title}</h2>
                <h3 className="w-2/3 text-sm">{subtitle}</h3>
                <Link href={href} className="btn mt-2 w-max" passHref onClick={() => handleClick(title)}>
                    Explore
                </Link>
            </div>
        </div>
    );
};

export default Collection;
