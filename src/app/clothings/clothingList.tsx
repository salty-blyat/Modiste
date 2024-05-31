import React, { useEffect, useState } from 'react';
import { ProductProps } from '../Types/interfaces';
import { useAppContext } from '../components/Context';
import Filter from '../components/Filter/filter';
import ProductCard from './productCard';
import Loading from '../Loading';
import { BeatLoader } from 'react-spinners';
import ReactMemo from 'react-dom'; // Import ReactMemo

const ClothingList: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState<ProductProps[]>([]);
    const { minPrice, maxPrice, sortOrder, selectedOptions, isPromotion } = useAppContext();

    const fetchProducts = async () => {
        try {
            const url = process.env.NEXT_PUBLIC_GET_PRODUCT;
            if (!url) {
                throw new Error('The product API URL is not defined');
            }

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data: ProductProps[] = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();

    }, []);



    if (loading) {
        return <Loading />;
    }

    const filteredProducts = products.filter(product => {
        const categoryFilter = selectedOptions.length === 0 || selectedOptions.includes(product.category_name);
        const priceFilter = product.price >= minPrice && product.price <= maxPrice;
        const promotionFilter = !isPromotion || product.discount; // Assuming products have an `isPromotion` field
        return categoryFilter && priceFilter && promotionFilter;
    });

    const sortedProducts = filteredProducts.sort((a, b) => {
        switch (sortOrder) {
            case 'Low to High':
                return a.price - b.price;
            case 'High to Low':
                return b.price - a.price;
            case 'A...Z':
                return a.name.localeCompare(b.name);
            case 'Z...A':
                return b.name.localeCompare(a.name);
            default:
                return 0;
        }
    });

    return (
        <div className="pt-[13rem] min-h-full px-3 sm:px-10 xl:px-24 2xl:px-48 relative mt-4 flex w-full">
            <Filter />
            <div className="relative grid flex-1 grid-cols-[repeat(auto-fit,18rem)] justify-center gap-7 2xl:grid-cols-[repeat(auto-fit,24rem)]">
                {sortedProducts.length > 0 ? (
                    sortedProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            item={product}
                        />
                    ))
                ) : (
                    <div className='flex items-center font-semibold flex-col gap-y-2 h-screen pt-[40%]'><BeatLoader color='rgb(0,0,0)' /> Loading</div>
                )}
            </div>
        </div>
    );
};

export default React.memo(ClothingList); // Wrap the component with React.memo()
