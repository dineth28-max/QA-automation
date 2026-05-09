import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaLeaf, FaSnowflake, FaBan, FaRecycle } from 'react-icons/fa';

const FeatureCard = ({ icon: Icon, title, desc, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        className="group relative flex flex-col justify-between p-8 bg-white/50 backdrop-blur-xl border border-white/40 rounded-[2.5rem] shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden"
    >
        <div className="absolute top-0 right-0 w-32 h-32 bg-mango/10 rounded-bl-[100px] transition-all group-hover:scale-150 duration-700" />

        <div className="relative z-10 w-20 h-20 bg-white rounded-2xl flex items-center justify-center mb-6 text-mango text-3xl shadow-sm group-hover:rotate-6 transition-transform duration-300">
            <Icon />
        </div>

        <div className="relative z-10">
            <h3 className="font-heading font-bold text-2xl mb-3 text-neutral-black tracking-tight">{title}</h3>
            <p className="text-neutral-black/70 text-base leading-relaxed">{desc}</p>
        </div>
    </motion.div>
);

const About = () => {
    const features = [
        { icon: FaLeaf, title: '100% Natural', desc: 'No shortcuts. Sourced directly from sustainable farms, straight to the bottle.' },
        { icon: FaSnowflake, title: 'Cold Pressed', desc: 'Extracted without heat to retain complete nutrient profile and raw flavor.' },
        { icon: FaBan, title: 'No Added Sugar', desc: 'Sweetened only by the fruit itself. Absolutely no preservatives or additives.' },
        { icon: FaRecycle, title: 'Sustainable', desc: 'Committed to the planet. 100% Recyclable and BPA-free plastic bottles.' },
    ];

    return (
        <section id="about" className="py-32 bg-neutral-gray relative overflow-hidden">
            {/* Decorative Background Text */}
            <div className="absolute top-20 left-0 w-full overflow-hidden opacity-[0.03] pointer-events-none">
                <h1 className="text-[20vw] font-heading font-bold whitespace-nowrap leading-none text-neutral-black">
                    PURE NATURE
                </h1>
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-mango font-bold tracking-[0.2em] uppercase text-sm mb-4">The Raw Difference</h2>
                        <h3 className="text-5xl md:text-7xl font-heading font-bold text-neutral-black leading-tight">
                            Cold-Pressed. <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-mango to-mango-dark">Never Heated.</span>
                        </h3>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-lg text-neutral-black/60 max-w-md pb-2"
                    >
                        We believe in the power of raw. Our juices are never heated, never pasteurized, and never compromised.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <FeatureCard key={index} {...feature} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default About;
