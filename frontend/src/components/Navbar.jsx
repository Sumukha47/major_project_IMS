import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, GraduationCap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const navLinks = [
        { name: 'Home', path: 'https://nit.edu.in/#' },
        { name: 'About', path: 'https://nit.edu.in/about-us/' },
        { name: 'Courses', path: 'https://nit.edu.in/departments/' },
        { name: 'Admissions', path: 'https://nit.edu.in/b-tech-first-year-admission/' },
        { name: 'Contact', path: 'https://nit.edu.in/contact/' },
    ];

    return (
        <nav className="fixed w-full top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 transition-all duration-300">
            <div className="container mx-auto px-6">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="p-1.5 bg-green-50 rounded-xl group-hover:bg-green-100 transition-colors">
                            <img
                                src="/images/Nit_logo.png"
                                alt="NIT Nagpur Logo"
                                className="w-8 h-8 object-contain"
                            />
                        </div>
                        <span className="text-xl font-bold text-gray-900 tracking-tight">NIT Nagpur</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.path}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-600 hover:text-green-700 font-medium text-sm transition-colors relative group"
                            >
                                {link.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-600 transition-all group-hover:w-full"></span>
                            </a>
                        ))}
                        <button
                            className="bg-green-700 hover:bg-green-800 text-white px-6 py-2.5 rounded-full font-semibold text-sm transition-all shadow-lg shadow-green-700/20 hover:shadow-green-700/30 hover:-translate-y-0.5"
                            onClick={() => navigate('/login')}
                        >
                            Login Portal
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
                    >
                        <div className="container mx-auto px-6 py-6 flex flex-col gap-4">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.path}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-600 hover:text-green-700 font-medium py-2 border-b border-gray-50 last:border-0"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.name}
                                </a>
                            ))}
                            <button
                                className="bg-green-700 text-white px-5 py-3 rounded-xl font-semibold w-full mt-2 shadow-lg shadow-green-700/20"
                                onClick={() => {
                                    navigate('/login');
                                    setIsOpen(false);
                                }}
                            >
                                Login Portal
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
