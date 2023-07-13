'use client';

import items from '@/app/constants/popular';
import Link from 'next/link';
import { BiChevronRight as ArrowRight } from 'react-icons/bi';

interface FeaturedProps {
    children?: React.ReactNode;
}

const Featured: React.FC<FeaturedProps> = () => {
    return (
        <div className="p-4">
            <div className="flex flex-col justify-center gap-1">
                <div className="flex items-center gap-4">
                    <h1 className="text-2xl font-bold">Lo más pedido</h1>
                    <a
                        href="#"
                        className="text-primary flex items-center gap-0.5 rounded-full bg-pink-500 px-2 py-1 text-[10px] font-medium text-white focus:outline-none"
                    >
                        Ver más <ArrowRight className="-mr-0.5 h-3 w-auto" />
                    </a>
                </div>
                <p className="text-sm font-normal text-gray-600">Los productos más pedidos por nuestros clientes.</p>
            </div>
            <div className="overflow-auto pb-4 pt-8">
                <div className="flex w-max">
                    {items.map((item, index) => (
                        <Link href={`/${item.slug}`} key={index}>
                            <div key={index} className="flex w-[220px] flex-col gap-2">
                                <img src={item.image} alt={item.name} className="h-auto w-auto" />
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

export default Featured;
