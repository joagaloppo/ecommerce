import Link from 'next/link';
import { BiChevronRight as ArrowRight } from 'react-icons/bi';

interface FeaturedProps {
    children?: React.ReactNode;
}

const items = [
    {
        name: 'Funda Distorsion - Pink',
        price: 2500,
        image: 'https://mukbarcelona.com/cdn/shop/files/distorsion_8a396539-5071-4d48-a057-07724763c47e.jpg?v=1688399135&width=600',
    },
    {
        name: 'Funda Portrait - Pink',
        price: 2500,
        image: 'https://mukbarcelona.com/cdn/shop/files/portraitpinkcopia.jpg?v=1688399449&width=400',
    },
    {
        name: 'Funda Cherrybomb - Pink',
        price: 2500,
        image: 'https://mukbarcelona.com/cdn/shop/files/cherrybomb.jpg?v=1687182950&width=400',
    },
    {
        name: 'Funda Distorsion - Pink',
        price: 2500,
        image: 'https://mukbarcelona.com/cdn/shop/files/distorsion_8a396539-5071-4d48-a057-07724763c47e.jpg?v=1688399135&width=600',
    },
];

const Featured: React.FC<FeaturedProps> = () => {
    return (
        <div className="p-4">
            <div className="flex flex-col justify-center gap-1">
                <div className="flex items-center gap-4">
                    <h1 className="text-2xl font-bold">Lo más pedido</h1>
                    <a
                        href="#"
                        className="text-primary flex items-center gap-0.5 rounded-full bg-pink-500 px-2 py-1 text-[10px] font-medium text-white underline-offset-2 hover:underline"
                    >
                        Ver más <ArrowRight className="-mr-0.5 h-3 w-auto" />
                    </a>
                </div>
                <p className="text-sm font-normal text-gray-600">Los productos más pedidos por nuestros clientes.</p>
            </div>
            <div className="overflow-auto py-8">
                <div className="flex w-max">
                    {items.map((item, index) => (
                        <Link href={`/1`} key={index}>
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
