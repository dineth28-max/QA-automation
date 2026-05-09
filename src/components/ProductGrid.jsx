import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaPlus } from 'react-icons/fa';

const ProductCard = ({ name, price, benefits, gradient, image, i }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.1 }}
            className="group relative h-[500px] w-full rounded-[3rem] overflow-hidden cursor-pointer"
        >
            {/* Background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-90 transition-all duration-700 group-hover:scale-110`} />

            {/* Texture Overlay */}
            <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-between p-10 text-white">
                <div>
                    <h3 className="text-4xl font-heading font-bold mb-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">{name}</h3>
                    <p className="text-lg font-light opacity-80 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">{benefits}</p>
                </div>

                {/* Real Product Image */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-auto">
                    <img
                        src={image}
                        alt={name}
                        className="w-full h-full object-contain drop-shadow-2xl group-hover:-rotate-12 group-hover:scale-110 transition-transform duration-700 ease-[0.16,1,0.3,1] rounded-2xl"
                    />
                </div>

                <div className="flex items-center justify-between translate-y-10 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                    <span className="text-3xl font-bold">{price}</span>
                    <button className="bg-white text-neutral-black w-14 h-14 rounded-full flex items-center justify-center hover:bg-neutral-black hover:text-white transition-colors duration-300">
                        <FaPlus size={20} />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

const ProductGrid = () => {
    const products = [
        {
            name: 'Alphonso Mango',
            price: '$5.99',
            benefits: 'Energy & Immunity',
            gradient: 'from-orange-400 via-amber-300 to-yellow-200',
            image: 'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=600&q=80'
        },
        {
            name: 'Pomegranate',
            price: '$6.49',
            benefits: 'Antioxidant Rich',
            gradient: 'from-rose-500 via-pink-500 to-red-400',
            image: 'https://images.unsplash.com/photo-1637500984883-820893309a4d?auto=format&fit=crop&w=600&q=80'
        },
        {
            name: 'Guava Chili',
            price: '$5.49',
            benefits: 'Vitamin C Boost',
            gradient: 'from-emerald-400 via-teal-300 to-green-200',
            image: 'https://images.unsplash.com/photo-1520138980385-263a0e695d73?auto=format&fit=crop&w=600&q=80'
        },
        {
            name: 'Valencia Orange',
            price: '$5.99',
            benefits: 'Pure Sunshine',
            gradient: 'from-orange-500 via-orange-400 to-yellow-400',
            image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?auto=format&fit=crop&w=600&q=80'
        },
    ];

    return (
        <section id="flavors" className="py-40 bg-white rounded-t-[3rem] -mt-20 relative z-20">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-24">
                    <motion.h2
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="text-6xl md:text-8xl font-heading font-bold text-neutral-black tracking-tighter"
                    >
                        Flavor <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-mango to-mango-dark">Spectrum.</span>
                    </motion.h2>

                    <button className="hidden md:block px-8 py-3 border border-neutral-black rounded-full font-bold uppercase tracking-widest hover:bg-neutral-black hover:text-white transition-all text-sm">
                        View All Products
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {products.map((product, index) => (
                        <ProductCard key={index} {...product} i={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProductGrid;
