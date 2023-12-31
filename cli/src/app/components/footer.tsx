'use client';

import { FaPinterest as Pinterest, FaInstagram as Instagram, FaTiktok as Tiktok } from 'react-icons/fa';

interface FooterProps {
    children?: React.ReactNode;
}

const Footer: React.FC<FooterProps> = () => {
    return (
        <>
            <hr />
            <footer className="mx-auto flex w-full max-w-screen-lg border-t px-4 py-12">
                <div className="mx-auto flex w-full flex-col gap-8">
                    <div className="flex w-full items-center justify-between">
                        <img src="/jetlag.png" alt="Jetlag" className="mx-auto h-10 w-auto" />
                        <div className="flex w-full items-center justify-end gap-4">
                            <Instagram className="h-6 w-auto text-gray-600" />
                            <Tiktok className="h-6 w-auto text-gray-600" />
                            <Pinterest className="h-6 w-auto text-gray-600" />
                        </div>
                    </div>
                    <div className="flex w-full items-start justify-between">
                        <ul className="text-md text-left font-normal">
                            <li className="text-gray-600">Todos los productos</li>
                            <li className="text-gray-600">Los mas vendidos</li>
                            <li className="text-gray-600">Nuevos productos</li>
                            <li className="text-gray-600">Nuestras marcas</li>
                        </ul>
                        <ul className="text-md text-right">
                            <li className="text-gray-600">Sobre Jetlag</li>
                            <li className="text-gray-600">Contactanos</li>
                            <li className="text-gray-600">Tu privacidad</li>
                            <li className="text-gray-600">Terminos de uso</li>
                        </ul>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;
