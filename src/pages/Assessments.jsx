import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { analyzeJD } from '../utils/analyzer';
import { AlertTriangle } from 'lucide-react';

const Assessments = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        company: '',
        role: '',
        jdText: ''
    });
    const [loading, setLoading] = useState(false);

    const handleAnalyze = (e) => {
        e.preventDefault();
        if (!formData.jdText) return;

        setLoading(true);

        setTimeout(() => {
            const results = analyzeJD(formData.company, formData.role, formData.jdText);

            const history = JSON.parse(localStorage.getItem('placementHistory') || '[]');
            localStorage.setItem('placementHistory', JSON.stringify([results, ...history]));
            localStorage.setItem('lastPlacementResult', JSON.stringify(results));

            setLoading(false);
            navigate('/placement/results');
        }, 1200);
    };

    const isShortJD = formData.jdText.length > 0 && formData.jdText.length < 200;

    return (
        <div className="max-w-4xl mx-auto py-8">
            <Card>
                <CardHeader>
                    <CardTitle className="text-3xl font-serif">Job Description Analysis</CardTitle>
                    <CardDescription>
                        Paste the job description below to generate a tailored preparation plan and round mapping.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleAnalyze} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">Company Name</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Google, Microsoft, StartupX"
                                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                    value={formData.company}
                                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">Target Role</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Full Stack Developer"
                                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                    value={formData.role}
                                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Full Job Description *</label>
                            <textarea
                                rows={12}
                                placeholder="Paste the JD text here..."
                                className={`w-full px-4 py-3 border rounded-md focus:ring-2 outline-none transition-all resize-none
                  ${isShortJD ? 'border-amber-300 focus:ring-amber-200' : 'border-gray-200 focus:ring-primary/20'}
                `}
                                value={formData.jdText}
                                onChange={(e) => setFormData({ ...formData, jdText: e.target.value })}
                                required
                            />
                            {isShortJD && (
                                <div className="flex items-center gap-2 text-amber-600 text-sm mt-1 animate-pulse">
                                    <AlertTriangle className="w-4 h-4" />
                                    This JD is too short to analyze deeply. Paste full JD for better output.
                                </div>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={loading || !formData.jdText || formData.jdText.length < 10}
                            className={`w-full py-4 rounded-md text-white font-bold text-lg transition-all
                ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-[#7248e3] active:scale-[0.98] shadow-lg shadow-primary/20'}
              `}
                        >
                            {loading ? "Analyzing Skills..." : "Run Strategic Analysis"}
                        </button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default Assessments;
