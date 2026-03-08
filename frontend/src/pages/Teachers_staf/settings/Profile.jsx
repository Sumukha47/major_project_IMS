import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Camera, Save, Shield, Building } from 'lucide-react';
import { toast } from 'react-toastify';

const Profile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [profileImage, setProfileImage] = useState(null);
    const [formData, setFormData] = useState({
        fullName: 'Dr. Sarah Wilson',
        role: 'Senior Professor',
        email: 'sarah.wilson@nit.edu.in',
        phone: '+91 98765 12345',
        department: 'Computer Science',
        location: 'Nagpur, Maharashtra',
        bio: 'Passionate educator with 10+ years of experience in teaching Data Structures and Algorithms. Committed to student success.'
    });

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsEditing(false);
        // Here you would typically make an API call to update the profile
        console.log('Profile updated:', formData);
        toast.success("Profile updated successfully");
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            {/* Header Section */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-xl font-bold text-gray-900 tracking-tight">Personal Information</h2>
                    <p className="text-sm text-gray-500 mt-1">Manage your personal details</p>
                </div>
                <button
                    onClick={() => isEditing ? handleSubmit({ preventDefault: () => { } }) : setIsEditing(true)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${isEditing
                        ? 'bg-green-600 text-white hover:bg-green-700 shadow-lg shadow-green-600/20'
                        : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                        }`}
                >
                    {isEditing ? (
                        <>
                            <Save size={16} />
                            Save Changes
                        </>
                    ) : (
                        'Edit Profile'
                    )}
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Left Column - Profile Avatar */}
                <div className="md:col-span-1 flex flex-col items-center">
                    <div className="relative mb-4 group">
                        <div className="w-40 h-40 rounded-full border-4 border-white shadow-xl overflow-hidden bg-gray-100 flex items-center justify-center relative z-10">
                            {profileImage ? (
                                <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <User size={64} className="text-gray-400" />
                            )}
                        </div>
                        {isEditing && (
                            <label className="absolute bottom-2 right-2 bg-green-600 text-white p-2.5 rounded-full cursor-pointer hover:bg-green-700 transition-colors shadow-md z-20">
                                <Camera size={18} />
                                <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                            </label>
                        )}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{formData.fullName}</h3>
                    <span className="text-sm text-blue-600 font-medium bg-blue-50 px-3 py-1 rounded-full mt-2">{formData.role}</span>
                </div>

                {/* Right Column - Form */}
                <div className="md:col-span-2">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Full Name</label>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all outline-none disabled:bg-gray-50 disabled:text-gray-500"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Role (Read Only)</label>
                                <input
                                    type="text"
                                    name="role"
                                    value={formData.role}
                                    disabled={true}
                                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all outline-none disabled:bg-gray-50 disabled:text-gray-500"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Phone Number</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all outline-none disabled:bg-gray-50 disabled:text-gray-500"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Department</label>
                                <input
                                    type="text"
                                    name="department"
                                    value={formData.department}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all outline-none disabled:bg-gray-50 disabled:text-gray-500"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Location</label>
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all outline-none disabled:bg-gray-50 disabled:text-gray-500"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Bio</label>
                            <textarea
                                name="bio"
                                value={formData.bio}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                                rows="4"
                                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all outline-none disabled:bg-gray-50 disabled:text-gray-500 resize-none"
                            ></textarea>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;
