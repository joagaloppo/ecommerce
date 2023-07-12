import { BiChevronRight as ArrowRight } from 'react-icons/bi';

interface RecommendedProps {
    children?: React.ReactNode;
}

const items = [
    {
        name: 'Distorsion',
        price: 2500,
        image: 'https://mukbarcelona.com/cdn/shop/products/WHYNOT.jpg?v=1678380427&width=500',
    },
    {
        name: 'Portrait',
        price: 2500,
        image: 'https://mukbarcelona.com/cdn/shop/files/drama.jpg?v=1687183309&width=500',
    },
    {
        name: 'Cherrybomb',
        price: 2500,
        image: 'https://mukbarcelona.com/cdn/shop/files/portrait.jpg?v=1687183475&width=400',
    },
    {
        name: 'Distorsion',
        price: 2500,
        image: 'https://mukbarcelona.com/cdn/shop/products/STICKERSYUPI.jpg?v=1679919056&width=500',
    },
    {
        name: 'Distorsion',
        price: 2500,
        image: 'https://mukbarcelona.com/cdn/shop/products/WHYNOT.jpg?v=1678380427&width=500',
    },
    {
        name: 'Portrait',
        price: 2500,
        image: 'https://mukbarcelona.com/cdn/shop/files/drama.jpg?v=1687183309&width=500',
    },
    {
        name: 'Cherrybomb',
        price: 2500,
        image: 'https://mukbarcelona.com/cdn/shop/files/portrait.jpg?v=1687183475&width=400',
    },
    {
        name: 'Distorsion',
        price: 2500,
        image: 'https://mukbarcelona.com/cdn/shop/products/STICKERSYUPI.jpg?v=1679919056&width=500',
    },
];

const Recommended: React.FC<RecommendedProps> = () => {
    return (
        <div className="p-4">
            <div className="flex flex-col justify-center gap-1">
                <div className="flex items-center gap-4">
                    <h1 className="text-2xl font-bold">Recomendados</h1>
                    <a
                        href="#"
                        className="text-primary flex items-center gap-0.5 rounded-full bg-pink-500 px-2 py-1 text-[10px] font-medium text-white underline-offset-2 hover:underline"
                    >
                        Ver todo <ArrowRight className="-mr-0.5 h-3 w-auto" />
                    </a>
                </div>
                <p className="text-sm font-normal text-gray-600">Otros productos que te pueden interesar!</p>
            </div>
            <div className="overflow-auto py-8">
                <div className="grid grid-cols-2 gap-4">
                    {items.map((item, index) => (
                        <div key={index} className="flex w-full flex-col gap-2">
                            <img src={item.image} alt={item.name} className="h-auto w-full" />
                            <div className="flex flex-col">
                                <h1 className="text-sm font-semibold">{item.name}</h1>
                                <p className="text-sm text-gray-500">${item.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Recommended;
