import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, PlayCircle } from 'lucide-react';

const HeroSection = () => {
    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#0A5330]">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-r from-[#052e1a] via-[#0A5330]/90 to-[#0A5330]/80 z-10" />
                <img
                    src="https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                    alt="Campus Background"
                    className="w-full h-full object-cover opacity-40"
                />
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 relative z-20 pt-20">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <span className="inline-block py-1 px-3 rounded-full bg-green-400/10 border border-green-400/20 text-green-300 text-sm font-semibold mb-6 backdrop-blur-sm">
                            Excellence in Education Since 2008
                        </span>
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
                            Empowering Future <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-emerald-100">
                                Leaders & Innovators
                            </span>
                        </h1>
                        <p className="text-xl text-green-100 mb-10 max-w-2xl mx-auto leading-relaxed font-light">
                            Join a community dedicated to academic excellence, cutting-edge research, and holistic development at Nagpur Institute of Technology.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                    >
                        <button className="group relative px-8 py-4 bg-white text-green-900 rounded-full font-bold text-lg shadow-lg shadow-green-900/20 hover:shadow-xl hover:scale-105 transition-all duration-300 overflow-hidden">
                            <span className="relative z-10 flex items-center gap-2">
                                Get Started <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-green-50 to-white opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>

                        <button className="group px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full font-semibold text-lg hover:bg-white/20 transition-all duration-300 flex items-center gap-3">
                            <PlayCircle className="w-6 h-6" />
                            <span>Virtual Tour</span>

                        </button>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 flex flex-col items-center gap-2"
            >
                <span className="text-xs uppercase tracking-widest">Scroll to Explore</span>
                <div className="w-0.5 h-12 bg-gradient-to-b from-white/50 to-transparent rounded-full" />
            </motion.div>
        </section>
    );
};

export default HeroSection;
