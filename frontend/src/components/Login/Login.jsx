import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Shield, GraduationCap, Mail, Lock, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
    const navigate = useNavigate();
    const [role, setRole] = useState('student');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { login } = useAuth();
    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const result = await login(email, password, role);
            if (result.success) {
                // Navigate based on role
                switch (result.role) {
                    case 'admin':
                        navigate('/admin/dashboard');
                        break;
                    case 'teacher':
                        navigate('/teacher/dashboard');
                        break;
                    case 'student':
                        navigate('/student/dashboard');
                        break;
                    default:
                        navigate('/');
                }
            } else {
                setError(result.message);
            }
        } catch (err) {
            setError('An unexpected error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    const roles = [
        { id: 'student', label: 'Student', icon: GraduationCap, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' },
        { id: 'teacher', label: 'Teacher', icon: User, color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-200' },
        { id: 'admin', label: 'Admin', icon: Shield, color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-200' },
    ];

    return (
        <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center p-4 font-sans">
            <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="max-w-6xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[650px]"
            >

                {/* Left Side - Image & Branding */}
                <div className="w-full md:w-1/2 relative overflow-hidden bg-green-900 flex flex-col justify-between p-12 text-white">
                    {/* Background Image & Overlay */}
                    <div className="absolute inset-0 z-0">
                        <img
                            src="https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                            alt="Campus"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-green-900/95 via-green-800/90 to-emerald-900/80 mix-blend-multiply" />
                    </div>

                    {/* Content */}
                    <div className="relative z-10">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex items-center gap-3 mb-12"
                        >
                            <div className="bg-white/10 p-2.5 rounded-xl backdrop-blur-md border border-white/20 shadow-lg">
                                <img
                                    src="/images/Nit_logo.png"
                                    alt="NIT Logo"
                                    className="w-10 h-10 object-contain"
                                    onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block' }}
                                />
                                <GraduationCap className="w-10 h-10 hidden" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold tracking-wide">NIT Nagpur</h2>
                                <p className="text-xs text-green-200 uppercase tracking-wider">Est. 2008</p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            <h1 className="text-5xl font-bold mb-6 leading-tight">
                                Welcome to the <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-200 to-emerald-100">
                                    Digital Campus
                                </span>
                            </h1>
                            <p className="text-lg text-green-100/90 leading-relaxed max-w-md">
                                Your gateway to academic excellence. Manage your classes, attendance, and resources in one seamless platform.
                            </p>
                        </motion.div>
                    </div>

                    <div className="relative z-10 text-sm text-green-200/60 flex justify-between items-end">
                        <p>© {new Date().getFullYear()} NIT Nagpur</p>
                        <div className="flex gap-4">
                            <a href="#" className="hover:text-white transition-colors">Privacy</a>
                            <a href="#" className="hover:text-white transition-colors">Terms</a>
                        </div>
                    </div>
                </div>

                {/* Right Side - Login Form */}
                <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center bg-white relative">
                    <div className="max-w-md mx-auto w-full">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="mb-10"
                        >
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">Sign In</h2>
                            <p className="text-gray-500">Select your role to access your dashboard</p>
                        </motion.div>

                        {/* Role Selector */}
                        <div className="grid grid-cols-3 gap-4 mb-10">
                            {roles.map((r, index) => (
                                <motion.button
                                    key={r.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 + (index * 0.1) }}
                                    onClick={() => setRole(r.id)}
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`relative flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all duration-300 ${role === r.id
                                        ? `${r.border} ${r.bg} shadow-lg`
                                        : 'border-gray-100 bg-white hover:border-gray-200 hover:bg-gray-50'
                                        }`}
                                >
                                    {role === r.id && (
                                        <div className="absolute top-2 right-2 text-green-600">
                                            <CheckCircle2 size={16} fill="currentColor" className="text-white" />
                                        </div>
                                    )}
                                    <r.icon className={`w-7 h-7 mb-3 transition-colors ${role === r.id ? r.color : 'text-gray-400'}`} />
                                    <span className={`text-sm font-semibold transition-colors ${role === r.id ? 'text-gray-900' : 'text-gray-500'}`}>
                                        {r.label}
                                    </span>
                                </motion.button>
                            ))}
                        </div>

                        <form onSubmit={handleLogin} className="space-y-6">
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.7 }}
                                className="space-y-6"
                            >
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-600 transition-colors w-5 h-5" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none transition-all peer placeholder-transparent"
                                        placeholder="Email"
                                        id="email"
                                        required
                                    />
                                    <label
                                        htmlFor="email"
                                        className="absolute left-12 -top-2.5 bg-white px-2 text-xs font-medium text-gray-500 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-green-600 peer-focus:text-xs"
                                    >
                                        Official Email ID
                                    </label>
                                </div>

                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-600 transition-colors w-5 h-5" />
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none transition-all peer placeholder-transparent"
                                        placeholder="Password"
                                        id="password"
                                        required
                                    />
                                    <label
                                        htmlFor="password"
                                        className="absolute left-12 -top-2.5 bg-white px-2 text-xs font-medium text-gray-500 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-green-600 peer-focus:text-xs"
                                    >
                                        Password
                                    </label>
                                </div>
                            </motion.div>

                            <AnimatePresence>
                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-100"
                                    >
                                        <AlertCircle size={16} />
                                        {error}
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.8 }}
                                className="flex items-center justify-between text-sm"
                            >
                                <label className="flex items-center gap-2 cursor-pointer group">
                                    <div className="relative flex items-center">
                                        <input type="checkbox" className="peer sr-only" />
                                        <div className="w-5 h-5 border-2 border-gray-300 rounded peer-checked:bg-green-600 peer-checked:border-green-600 transition-all"></div>
                                        <CheckCircle2 size={12} className="absolute left-1 top-1 text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                                    </div>
                                    <span className="text-gray-500 group-hover:text-gray-700 transition-colors">Remember me</span>
                                </label>
                                <a href="#" className="text-green-600 hover:text-green-700 font-semibold hover:underline decoration-2 underline-offset-4 transition-all">
                                    Forgot Password?
                                </a>
                            </motion.div>

                            <motion.button
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.9 }}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-green-600/20 flex items-center justify-center gap-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed group"
                            >
                                {isLoading ? (
                                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        Sign In <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </motion.button>
                        </form>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
