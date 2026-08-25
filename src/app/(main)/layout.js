import Footer from '@/components/Footer';
import Navbar from '@/components/NavBar';
import React from 'react';

const MainLayout = ({ children }) => {
    return (
        <div>
            <main>
                <Navbar />
                {children}
                <Footer />
            </main>
        </div>
    );
};

export default MainLayout;