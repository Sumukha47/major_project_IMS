import HeroSection from './HeroSection';
import FeatureCards from './FeatureCards';

const Home = () => {
    return (
        <div className="bg-white min-h-screen">
            <HeroSection />
            <FeatureCards />

            {/* Footer Preview (Optional) */}
            <footer className="bg-gray-900 text-white py-12 border-t border-gray-800">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-gray-500">© {new Date().getFullYear()} Nagpur Institute of Technology. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default Home;
