import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaShoppingCart, FaSearch, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: 'Shop', href: '#shop' },
        { name: 'Our Story', href: '#about' },
        { name: 'Flavors', href: '#flavors' },
        { name: 'Subscription', href: '#subscription' },
    ];

    return (
        <nav className="fixed w-full z-50 top-0 left-0 bg-white/10 backdrop-blur-md border-b border-white/20">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                {/* Logo */}
                <div className="text-2xl font-bold font-heading text-neutral-black tracking-tighter cursor-pointer">
                    RAW <span className="text-mango">Pressery</span>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-8 items-center">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-neutral-black font-medium hover:text-mango transition-colors duration-300"
                        >
                            {link.name}
                        </a>
                    ))}
                </div>

                {/* Icons */}
                <div className="hidden md:flex space-x-6 items-center">
                    <FaSearch className="text-xl cursor-pointer hover:text-mango transition-colors" />
                    <div className="relative cursor-pointer hover:text-mango transition-colors">
                        <FaShoppingCart className="text-xl" />
                        <span className="absolute -top-2 -right-2 bg-mango text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                            2
                        </span>
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden text-2xl cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <FaTimes /> : <FaBars />}
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="md:hidden absolute top-16 left-0 w-full bg-white shadow-lg flex flex-col items-center py-6 space-y-6 z-40"
                >
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-lg font-medium text-neutral-black hover:text-mango"
                            onClick={() => setIsOpen(false)}
                        >
                            {link.name}
                        </a>
                    ))}
                </motion.div>
            )}
        </nav>
    );
};

export default Navbar;
