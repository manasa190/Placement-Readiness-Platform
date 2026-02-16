import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Code, Video, BarChart3, ChevronRight } from 'lucide-react';

const LandingPage = () => {
    const navigate = useNavigate();

    const features = [
        {
            title: "Practice Problems",
            description: "Solved carefully curated coding problems from top companies.",
            icon: <Code className="w-6 h-6 text-primary" />,
        },
        {
            title: "Mock Interviews",
            description: "Real-time interview simulations with AI and industry experts.",
            icon: <Video className="w-6 h-6 text-primary" />,
        },
        {
            title: "Track Progress",
            description: "Deep analytics to help you identify and bridge your skill gaps.",
            icon: <BarChart3 className="w-6 h-6 text-primary" />,
        },
    ];

    return (
        <div className="flex flex-col min-h-screen bg-[#F7F6F3]">
            {/* Hero Section */}
            <section className="flex-grow flex flex-col items-center justify-center text-center px-4 py-20 bg-white">
                <h1 className="text-5xl md:text-7xl font-serif text-[#111111] mb-6 tracking-tight">
                    Ace Your Placement
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mb-10 leading-relaxed">
                    Practice, assess, and prepare for your dream job with our comprehensive placement readiness platform.
                </p>
                <button
                    onClick={() => navigate('/dashboard')}
                    className="bg-primary hover:bg-[#7248e3] text-white px-8 py-4 rounded-md font-semibold text-lg flex items-center gap-2 transition-all transform hover:scale-105"
                >
                    Get Started <ChevronRight className="w-5 h-5" />
                </button>
            </section>

            {/* Features Grid */}
            <section className="py-20 px-4 max-w-7xl mx-auto w-full">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, idx) => (
                        <div key={idx} className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold text-[#111111] mb-3">{feature.title}</h3>
                            <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Footer */}
            <footer className="py-10 border-t border-gray-200 text-center text-gray-500 text-sm">
                <p>© {new Date().getFullYear()} Placement Readiness Platform. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default LandingPage;
