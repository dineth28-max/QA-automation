import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Hero = () => {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const y2 = useTransform(scrollY, [0, 500], [0, -150]);

    return (
        <section className="relative w-full h-screen overflow-hidden bg-neutral-black">

            {/* Fullscreen Background Animation */}
            <div className="absolute inset-0 z-0 opacity-80">
                <ImageSequencePlayer />
                {/* Gradient Overlay for Readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-neutral-black/90" />
            </div>

            {/* Content */}
            <div className="relative z-10 w-full h-full flex flex-col justify-center items-center px-6">

                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center max-w-5xl mix-blend-overlay"
                    style={{ y: y1 }}
                >
                    <h1 className="text-[12vw] leading-[0.85] font-bold font-heading text-white tracking-tighter uppercase relative">
                        Raw <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-mango to-softYellow">Pressery</span>
                    </h1>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="mt-12 flex flex-col items-center gap-8"
                    style={{ y: y2 }}
                >
                    <p className="text-xl md:text-2xl text-white/80 font-light tracking-wide max-w-xl text-center backdrop-blur-sm bg-white/5 p-6 rounded-2xl border border-white/10 shadow-2xl">
                        Experience the untamed essence of Alphonso. <br />
                        <span className="text-mango font-medium">Cold-pressed. Pure. Infinite.</span>
                    </p>

                    <div className="flex gap-6">
                        <button className="group relative px-8 py-4 bg-white text-neutral-black font-bold rounded-full overflow-hidden transition-all hover:scale-105 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]">
                            <span className="relative z-10 uppercase tracking-widest text-sm">Shop Collection</span>
                            <div className="absolute inset-0 bg-mango transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
                        </button>
                    </div>
                </motion.div>

            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 flex flex-col items-center gap-2"
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
            >
                <span className="text-xs tracking-[0.3em] uppercase">Scroll</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-white/50 to-transparent" />
            </motion.div>
        </section>
    );
};

const ImageSequencePlayer = () => {
    const canvasRef = useRef(null);
    const [images, setImages] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Configuration
    const frameCount = 80;
    const fps = 30;

    // Generate file paths
    // Format: Smooth_cinamtic_transition_202601270953_ntxf_${index}.jpg
    // Note: filenames are 0 based, 3 digits, e.g. 000, 001, ..., 079
    useEffect(() => {
        const loadImages = async () => {
            const imagePromises = [];

            for (let i = 0; i < frameCount; i++) {
                const indexStr = i.toString().padStart(3, '0');
                const src = `/animation/Smooth_cinamtic_transition_202601270953_ntxf_${indexStr}.jpg`;

                const promise = new Promise((resolve) => {
                    const img = new Image();
                    img.src = src;
                    img.onload = () => resolve(img);
                    img.onerror = () => resolve(null);
                });
                imagePromises.push(promise);
            }

            const results = await Promise.all(imagePromises);
            setImages(results.filter(img => img !== null));
            setIsLoaded(true);
        };

        loadImages();
    }, []);

    useEffect(() => {
        if (!isLoaded || images.length === 0) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let frameIndex = 0;
        let lastTime = 0;
        const interval = 1000 / fps;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        const render = (currentTime) => {
            if (currentTime - lastTime > interval) {
                const img = images[frameIndex];
                if (img) {
                    // Draw image to cover the canvas (object-fit: cover equivalent)
                    const hRatio = canvas.width / img.width;
                    const vRatio = canvas.height / img.height;
                    const ratio = Math.max(hRatio, vRatio);

                    const centerShift_x = (canvas.width - img.width * ratio) / 2;
                    const centerShift_y = (canvas.height - img.height * ratio) / 2;

                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.drawImage(img, 0, 0, img.width, img.height,
                        centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
                }

                frameIndex = (frameIndex + 1) % images.length;
                lastTime = currentTime;
            }
            animationFrameId = requestAnimationFrame(render);
        };

        animationFrameId = requestAnimationFrame(render);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', resizeCanvas);
        };
    }, [isLoaded, images]);

    if (!isLoaded) return <div className="w-full h-full bg-neutral-black" />;

    return (
        <canvas
            ref={canvasRef}
            className="w-full h-full object-cover"
        />
    );
};

export default Hero;
