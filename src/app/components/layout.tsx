interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <section className="w-full bg-white">
            <div className="mx-auto max-w-screen-xl px-4">
                <div className="py-6">{children}</div>
            </div>
        </section>
    );
};

export default Layout;
