'use client';

import Featured from '@/app/landing/featured';
import Products from '@/app/landing/products';
import Footer from '@/app/components/footer';
import Nav from '@/app/components/nav';

const Page = () => {
    return (
        <>
            <Nav />
            <div className="h-[70px]" />
            <Featured />
            <Products />
            <Footer />
        </>
    );
};

export default Page;
