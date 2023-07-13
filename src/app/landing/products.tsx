'use client';

import items from '@/app/constants/items';
import Link from 'next/link';
import { BiChevronRight as ArrowRight } from 'react-icons/bi';

interface ProductsProps {
    children?: React.ReactNode;
}

const Products: React.FC<ProductsProps> = () => {
    return (
        <div className="p-4">
            <div className="flex flex-col justify-center gap-1">
                <div className="flex items-center gap-4">
                    <h1 className="text-2xl font-bold">Productos</h1>
                    <a
                        href="#"
                        className="text-primary flex items-center gap-0.5 rounded-full bg-pink-500 px-2 py-1 text-[10px] font-medium text-white focus:outline-none"
                    >
                        Ver todo <ArrowRight className="-mr-0.5 h-3 w-auto" />
                    </a>
                </div>
                <p className="text-sm font-normal text-gray-600">Todos los productos disponibles en Jetlag.</p>
            </div>
            <div className="overflow-auto pb-4 pt-8">
                <div className="grid grid-cols-2 gap-4">
                    {items.map((item, index) => (
                        <Link href={`/${item.slug}`} key={index}>
                            <div key={index} className="flex w-full flex-col gap-2">
                                <img src={item.image} alt={item.name} className="h-auto w-full" />
                                <div className="flex flex-col">
                                    <h1 className="text-sm font-semibold">{item.name}</h1>
                                    <p className="text-sm text-gray-500">${item.price}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Products;
