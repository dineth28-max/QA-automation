import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaPaperPlane } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-neutral-black text-white pt-20 pb-10 rounded-t-[40px] mt-10">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">

                {/* Brand */}
                <div>
                    <div className="text-2xl font-bold font-heading tracking-tighter mb-6">
                        RAW <span className="text-mango">Pressery</span>
                    </div>
                    <p className="text-neutral-gray text-sm leading-relaxed mb-6">
                        Nature's finest, bottled for you. Cold-pressed, 100% natural, and absolutely delicious.
                    </p>
                    <div className="flex space-x-4">
                        <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-mango transition-colors">
                            <FaFacebookF />
                        </a>
                        <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-mango transition-colors">
                            <FaInstagram />
                        </a>
                        <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-mango transition-colors">
                            <FaTwitter />
                        </a>
                    </div>
                </div>

                {/* Links */}
                <div>
                    <h4 className="font-bold text-lg mb-6">Shop</h4>
                    <ul className="space-y-3 text-neutral-gray text-sm">
                        <li><a href="#" className="hover:text-mango transition-colors">All Products</a></li>
                        <li><a href="#" className="hover:text-mango transition-colors">Bundles</a></li>
                        <li><a href="#" className="hover:text-mango transition-colors">Subscription</a></li>
                        <li><a href="#" className="hover:text-mango transition-colors">Gift Cards</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold text-lg mb-6">Company</h4>
                    <ul className="space-y-3 text-neutral-gray text-sm">
                        <li><a href="#" className="hover:text-mango transition-colors">Our Story</a></li>
                        <li><a href="#" className="hover:text-mango transition-colors">Sustainability</a></li>
                        <li><a href="#" className="hover:text-mango transition-colors">Careers</a></li>
                        <li><a href="#" className="hover:text-mango transition-colors">Contact Us</a></li>
                    </ul>
                </div>

                {/* Newsletter */}
                <div>
                    <h4 className="font-bold text-lg mb-6">Stay Fresh</h4>
                    <p className="text-neutral-gray text-sm mb-4">Subscribe for updates and exclusive offers.</p>
                    <div className="flex bg-white/10 rounded-full p-1 pl-4 focus-within:ring-2 focus-within:ring-mango transition-all">
                        <input
                            type="email"
                            placeholder="Your email"
                            className="bg-transparent border-none outline-none text-white w-full text-sm placeholder-white/50"
                        />
                        <button className="bg-mango text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-mango-dark transition-colors">
                            <FaPaperPlane size={14} />
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-white/10 text-center text-neutral-gray text-xs">
                &copy; {new Date().getFullYear()} RAW Pressery. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
