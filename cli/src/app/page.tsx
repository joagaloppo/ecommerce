'use client';

import Featured from '@/app/landing/featured';
import Products from '@/app/landing/products';
import Footer from '@/app/components/footer';
import Nav from '@/app/components/nav';
import ScrollUp from '@/app/utils/scrollUp';

const Page = () => {
    return (
        <>
            <ScrollUp />
            <Nav />
            <div className="h-[64px]" />
            <Featured />
            <Products />
            <Footer />
        </>
    );
};

export default Page;
