import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* About */}
                    <div>
                        <h3 className="text-white text-lg font-bold mb-6">About NIT</h3>
                        <p className="text-gray-400 leading-relaxed mb-6">
                            Nagpur Institute of Technology is a premier institution dedicated to excellence in technical education and research.
                        </p>
                        <div className="flex gap-4">
                            <SocialIcon icon={<Facebook size={20} />} />
                            <SocialIcon icon={<Twitter size={20} />} />
                            <SocialIcon icon={<Instagram size={20} />} />
                            <SocialIcon icon={<Linkedin size={20} />} />
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white text-lg font-bold mb-6">Quick Links</h3>
                        <ul className="space-y-3">
                            <FooterLink to="https://nit.edu.in/about-us/">About Us</FooterLink>
                            <FooterLink to="https://nit.edu.in/departments/">Courses</FooterLink>
                            <FooterLink to="https://nit.edu.in/b-tech-first-year-admission/">Admissions</FooterLink>
                            <FooterLink to="https://alumni.nit.edu.in">Placements</FooterLink>
                            <FooterLink to="https://nit.edu.in/contact/">Contact Us</FooterLink>
                        </ul>
                    </div>

                    {/* Departments */}
                    <div>
                        <h3 className="text-white text-lg font-bold mb-6">Departments</h3>
                        <ul className="space-y-3">
                            <FooterLink to="https://nit.edu.in/computer-science-engineering/">Computer Science</FooterLink>
                            <FooterLink to="https://nit.edu.in/information-technology/">Information Technology</FooterLink>
                            <FooterLink to="https://nit.edu.in/electrical-engineering/">Electronics & Comm.</FooterLink>
                            <FooterLink to="https://nit.edu.in/mechanical-engineering/">Mechanical Engineering</FooterLink>
                            <FooterLink to="https://nit.edu.in/civil-engineering/">Civil Engineering</FooterLink>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-white text-lg font-bold mb-6">Contact Info</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-green-500 mt-1" />
                                <span>Survey No. 13/2, Mahurzari, Katol Road, Nagpur - 441501</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-green-500" />
                                <span>+91 123 456 7890</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-green-500" />
                                <span>info@nit.edu.in</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-gray-500">
                        © {new Date().getFullYear()} Nagpur Institute of Technology. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-sm text-gray-500">
                        <Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link to="#" className="hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

const SocialIcon = ({ icon }) => (
    <a href="https://nit.edu.in/#" className="bg-gray-800 p-2 rounded-lg hover:bg-green-600 hover:text-white transition-all">
        {icon}
    </a>
);

const FooterLink = ({ to, children }) => (
    <li>
        <Link to={to} className="hover:text-green-400 transition-colors block">
            {children}
        </Link>
    </li>
);

export default Footer;
