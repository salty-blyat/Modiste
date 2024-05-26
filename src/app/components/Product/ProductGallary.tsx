"use client"
import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const ProductGallery = ({ images }: { images: string[] }) => {
  return (
    <Carousel infiniteLoop autoPlay>
      {images.map((img, index) => (
        <div key={index} className="w-24 h-[30rem] md:h-[40rem]">
          <Image
            src={img || '../../../../public/defaultImage.jpg'}
            className="md:object-cover object-top object-cover"
            layout="fill"
            alt="Product"
          />
        </div>

      ))}
    </Carousel>
  );
};

export default ProductGallery;
