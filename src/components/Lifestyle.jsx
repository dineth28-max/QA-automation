import React from 'react';
import { motion } from 'framer-motion';

const Lifestyle = () => {
    // Using a specific high-quality Unsplash image for lifestyle
    const bgImage = "https://images.unsplash.com/photo-1543599538-a6c4f6cc5c05?auto=format&fit=crop&w=1920&q=80"; // Bright juice/lifestyle image

    return (
        <section className="relative w-full h-[60vh] flex items-center justify-center overflow-hidden">
            {/* Background Image Parallax/Fixed */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-fixed"
                style={{ backgroundImage: `url(${bgImage})` }}
            >
                <div className="absolute inset-0 bg-black/40" /> {/* Overlay */}
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative z-10 text-center text-white px-6"
            >
                <h2 className="text-5xl md:text-7xl font-heading font-bold mb-4 drop-shadow-lg">Drink Clean. Live Fresh.</h2>
                <p className="text-lg md:text-2xl font-light tracking-wide mb-8">Fuel your day with the goodness of nature.</p>
                <button className="bg-mango text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-mango-dark hover:scale-105 transition-all">
                    Join the Movement
                </button>
            </motion.div>
        </section>
    );
};

export default Lifestyle;
