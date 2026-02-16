import React, { useEffect, useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { Rocket, CheckCircle } from 'lucide-react';

const PRPShip = () => {
    const navigate = useNavigate();
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem('prp_test_checklist');
        if (saved) {
            const checklist = JSON.parse(saved);
            const passed = Object.values(checklist).filter(v => v).length === 10;
            setIsComplete(passed);
        }
    }, []);

    if (!isComplete && localStorage.getItem('prp_test_checklist')) {
        return <Navigate to="/placement/07-test" replace />;
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center p-6 px-12">
            <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-10 text-green-600 animate-bounce">
                <Rocket className="w-12 h-12" />
            </div>
            <h1 className="text-5xl font-serif text-gray-900 mb-6">Ready for Zero-G</h1>
            <p className="text-xl text-gray-500 max-w-xl mb-12 leading-relaxed">
                Your build has passed all 10 integrity tests. The Placement Readiness Platform is validated and prepared for its final mission.
            </p>
            <button
                onClick={() => navigate('/placement/proof')}
                className="bg-primary text-white px-10 py-4 rounded-xl font-bold text-lg shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-3"
            >
                Confirm Readiness <CheckCircle className="w-5 h-5" />
            </button>
        </div>
    );
};

export default PRPShip;
