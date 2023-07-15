'use client';

import items from '@/app/constants/popular';
import Link from 'next/link';
import clsx from 'clsx';
import { BiChevronRight as ArrowRight } from 'react-icons/bi';

interface FeaturedProps {
    children?: React.ReactNode;
}

const Skeleton = () => {
    return (
        <>
            {Array.from(Array(3).keys()).map((_, i) => (
                <div key={i} className="pointer-events-none flex flex-col gap-2">
                    <div className="h-[220px] w-[220px] animate-pulse bg-gray-200" />
                    <div className="flex flex-col gap-2">
                        <div className="h-[16px] w-[160px] animate-pulse bg-gray-200" />
                        <div className="h-[16px] w-[80px] animate-pulse bg-gray-200" />
                    </div>
                </div>
            ))}
        </>
    );
};

const Featured: React.FC<FeaturedProps> = () => {
    return (
        <div className="mx-auto max-w-screen-lg p-4">
            <div className="flex flex-col justify-center gap-1">
                <div className="flex items-center gap-4">
                    <h1 className="text-2xl font-bold">Lo más pedido</h1>
                    <Link
                        href="#"
                        className={clsx(
                            'flex items-center gap-0.5',
                            'rounded-md px-2 py-1 text-[10px]',
                            'bg-pink-500  font-medium text-white',
                            'hover:ring-4 hover:ring-pink-200',
                            'focus:outline-none focus:ring-8 focus:ring-pink-200',
                            'active:ring-8 active:ring-pink-200',
                            'transition-all duration-300 ease-in-out'
                        )}
                    >
                        Ver más <ArrowRight className="-mr-0.5 h-3 w-auto" />
                    </Link>
                </div>
                <p className="text-sm font-normal text-gray-600">Los productos más pedidos por nuestros clientes.</p>
            </div>
            <div className="overflow-auto pb-4 pt-8">
                <div className="flex w-max gap-4">
                    {items && items.length ? (
                        items.map((item, index) => (
                            <Link href={`/${item.slug}`} key={index}>
                                <div key={index} className="flex w-[220px] flex-col gap-2">
                                    <img src={item.image} alt={item.name} className="h-auto w-auto" />
                                    <div className="flex flex-col">
                                        <h1 className="text-sm font-semibold">{item.name}</h1>
                                        <p className="text-sm text-gray-500">${item.price}</p>
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <Skeleton />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Featured;
