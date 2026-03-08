import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Users, Award, Globe, Zap, Shield } from 'lucide-react';

const features = [
    {
        icon: BookOpen,
        title: "World-Class Curriculum",
        description: "Industry-aligned courses designed to prepare students for global challenges.",
        color: "bg-blue-50 text-blue-600"
    },
    {
        icon: Users,
        title: "Expert Faculty",
        description: "Learn from distinguished professors and industry leaders dedicated to mentorship.",
        color: "bg-green-50 text-green-600"
    },
    {
        icon: Award,
        title: "Research Excellence",
        description: "State-of-the-art labs and funding for groundbreaking student research.",
        color: "bg-purple-50 text-purple-600"
    },
    {
        icon: Globe,
        title: "Global Connections",
        description: "Partnerships with top international universities for exchange programs.",
        color: "bg-orange-50 text-orange-600"
    },
    {
        icon: Zap,
        title: "Innovation Hub",
        description: "Incubation center to support student startups and entrepreneurial ventures.",
        color: "bg-yellow-50 text-yellow-600"
    },
    {
        icon: Shield,
        title: "Safe Campus",
        description: "24/7 security and a supportive environment for all students.",
        color: "bg-red-50 text-red-600"
    }
];

const FeatureCards = () => {
    return (
        <section className="py-24 bg-[#F8F9FA]">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose NIT Nagpur?</h2>
                    <p className="text-lg text-gray-600">We provide a holistic educational experience that goes beyond the classroom.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group"
                        >
                            <div className={`w-14 h-14 rounded-xl ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                <feature.icon size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-700 transition-colors">{feature.title}</h3>
                            <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeatureCards;
