import React from 'react';
import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';

const TestimonialCard = ({ name, review, rating, delay }) => (
    <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay }}
        className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow border border-neutral-100 min-w-[300px] flex-shrink-0 md:flex-shrink"
    >
        <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-neutral-200 rounded-full mr-4 overflow-hidden">
                <img src={`https://ui-avatars.com/api/?name=${name}&background=F4A12E&color=fff`} alt={name} />
            </div>
            <div>
                <h4 className="font-bold text-neutral-black">{name}</h4>
                <div className="flex text-yellow-400 text-sm">
                    {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className={i < rating ? "text-mango" : "text-gray-300"} />
                    ))}
                </div>
            </div>
        </div>
        <p className="text-neutral-black/70 italic">"{review}"</p>
    </motion.div>
);

const Testimonials = () => {
    const reviews = [
        { name: "Sarah J.", review: "The mango juice is addiction! Tastes exactly like eating the fruit.", rating: 5 },
        { name: "Mike T.", review: "Love the cold-pressed quality. You can really taste the freshness.", rating: 5 },
        { name: "Emily R.", review: "Packaging is great and the delivery was super fast. My morning staple.", rating: 4 },
    ];

    return (
        <section className="py-24 bg-neutral-gray overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-heading font-bold text-neutral-black">What Our Sippers Say</h2>
                </motion.div>

                <div className="flex flex-col md:flex-row gap-6 justify-center">
                    {reviews.map((review, index) => (
                        <TestimonialCard key={index} {...review} delay={index * 0.2} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
