"use client"
import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const ProductGallery = ({ images }: { images: string[] }) => {
  return (
    <Carousel infiniteLoop autoPlay>
      {images.map((img, index) => (
        <div key={index} className="w-24 h-[40rem] object-cover">
          <Image
            src={img}
            className="object-cover"
            layout="fill"
            alt="Product"
          />
        </div>

      ))}
    </Carousel>
  );
};

export default ProductGallery;
