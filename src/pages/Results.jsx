import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { CheckCircle, AlertCircle, Download, Copy, ArrowRight, Save, Building2, Briefcase, Info } from 'lucide-react';

const Results = () => {
    const navigate = useNavigate();
    const [data, setData] = useState(null);

    useEffect(() => {
        const saved = localStorage.getItem('lastPlacementResult');
        if (saved) {
            setData(JSON.parse(saved));
        } else {
            navigate('/placement/assessments');
        }
    }, [navigate]);

    if (!data) return null;

    const toggleSkill = (skill) => {
        const newConf = { ...data.skillConfidenceMap };
        const current = newConf[skill] || 'practice';
        const next = current === 'know' ? 'practice' : 'know';
        newConf[skill] = next;

        // Fixed scoring logic based on confidence map
        const baseScore = data.baseScore;
        const adjustments = Object.values(newConf).reduce((acc, status) => {
            return acc + (status === 'know' ? 2 : -2);
        }, 0);

        const newScore = Math.min(Math.max(baseScore + adjustments, 0), 100);

        const updatedData = {
            ...data,
            skillConfidenceMap: newConf,
            finalScore: newScore,
            updatedAt: new Date().toISOString()
        };

        setData(updatedData);
        localStorage.setItem('lastPlacementResult', JSON.stringify(updatedData));

        const history = JSON.parse(localStorage.getItem('placementHistory') || '[]');
        const newHistory = history.map(h => h.id === data.id ? updatedData : h);
        localStorage.setItem('placementHistory', JSON.stringify(newHistory));
    };

    const copyToClipboard = (text, msg) => {
        navigator.clipboard.writeText(text).then(() => alert(msg));
    };

    const downloadTxt = () => {
        const content = `Analysis: ${data.company} - ${data.role}\nScore: ${data.finalScore}\n\nQuestions:\n${data.questions.join('\n')}`;
        const element = document.createElement("a");
        const file = new Blob([content], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = `Prep_${data.company}.txt`;
        element.click();
    };

    const weakSkills = Object.values(data.extractedSkills).flat()
        .filter(s => (data.skillConfidenceMap[s] || 'practice') === 'practice')
        .slice(0, 3);

    return (
        <div className="max-w-6xl mx-auto py-8 space-y-8 pb-32">
            {/* Header & Score */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-serif text-gray-900 mb-2">Analysis Results</h1>
                    <p className="text-gray-500">{data.role} at <span className="text-primary font-semibold">{data.company || "Target Company"}</span></p>
                </div>
                <div className="bg-white border rounded-2xl p-6 shadow-sm flex items-center gap-6">
                    <div className="relative w-24 h-24 text-primary">
                        <svg className="w-full h-full transform -rotate-90">
                            <circle cx="48" cy="48" r="40" stroke="#f3f4f6" strokeWidth="8" fill="transparent" />
                            <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent"
                                strokeDasharray={251.2} strokeDashoffset={251.2 * (1 - data.finalScore / 100)}
                                strokeLinecap="round" className="transition-all duration-700 ease-out" />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center font-bold text-xl text-gray-900">{data.finalScore}%</div>
                    </div>
                    <div>
                        <div className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Live Readiness</div>
                        <div className="text-sm text-gray-600">Dynamic score tracking</div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">

                    {/* Company Intel Card */}
                    {data.company && (
                        <Card className="border-l-4 border-l-primary">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Building2 className="w-5 h-5 text-primary" />
                                    Company Intel
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <div className="text-xs font-bold text-gray-400 uppercase mb-1">Scale</div>
                                    <div className="font-semibold text-gray-800">{data.companyIntel.size}</div>
                                </div>
                                <div>
                                    <div className="text-xs font-bold text-gray-400 uppercase mb-1">Industry</div>
                                    <div className="font-semibold text-gray-800">{data.companyIntel.industry}</div>
                                </div>
                                <div>
                                    <div className="text-xs font-bold text-gray-400 uppercase mb-1">Hiring Focus</div>
                                    <div className="font-semibold text-gray-800">{data.companyIntel.focus}</div>
                                </div>
                            </CardContent>
                            <div className="px-6 py-2 bg-gray-50 text-[10px] text-gray-400 text-right">
                                Demo Mode: Company intel generated heuristically.
                            </div>
                        </Card>
                    )}

                    {/* Round Mapping Timeline */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Briefcase className="w-5 h-5 text-primary" />
                                Strategic Round Mapping
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-8 relative before:absolute before:left-4 before:top-2 before:bottom-0 before:w-0.5 before:bg-gray-100">
                                {data.roundMapping.map((round, idx) => (
                                    <div key={idx} className="relative pl-12">
                                        <div className="absolute left-2.5 top-1.5 w-3.5 h-3.5 rounded-full bg-primary border-4 border-white shadow-sm ring-1 ring-primary/20" />
                                        <h4 className="font-bold text-gray-900">{round.roundTitle}</h4>
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {round.focusAreas.map(f => (
                                                <span key={f} className="px-2 py-0.5 bg-gray-50 text-[10px] font-bold text-gray-500 rounded border border-gray-100 uppercase tracking-wider">{f}</span>
                                            ))}
                                        </div>
                                        <p className="text-sm text-gray-500 mt-2 italic flex items-start gap-2 bg-blue-50/50 p-2 rounded">
                                            <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                                            {round.whyItMatters}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Skills Assessment */}
                    <Card>
                        <CardHeader><CardTitle>Skills Assessment</CardTitle></CardHeader>
                        <CardContent className="space-y-6">
                            {Object.entries(data.extractedSkills).map(([cat, skills]) => skills.length > 0 && (
                                <div key={cat}>
                                    <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">{cat}</h4>
                                    <div className="flex flex-wrap gap-3">
                                        {skills.map(skill => {
                                            const isKnow = data.skillConfidenceMap[skill] === 'know';
                                            return (
                                                <button key={skill} onClick={() => toggleSkill(skill)}
                                                    className={`px-4 py-2 rounded-full border text-sm font-medium transition-all flex items-center gap-2
                            ${isKnow ? 'bg-green-50 border-green-200 text-green-700' : 'bg-white border-gray-200 text-gray-600 hover:border-primary/50'}
                          `}>
                                                    {isKnow ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                                                    {skill}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar content */}
                <div className="space-y-8">
                    <Card className="bg-primary text-white border-none shadow-xl shadow-primary/20">
                        <CardHeader>
                            <CardTitle className="text-white">Export Prep</CardTitle>
                            <CardDescription className="text-primary-foreground/70">Single file prepared.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <button onClick={downloadTxt} className="w-full flex items-center justify-between p-3 bg-white/10 hover:bg-white/20 rounded-md transition-all text-sm font-bold">
                                Download TXT <Download className="w-4 h-4" />
                            </button>
                            <button onClick={() => copyToClipboard(getFullText(data), "Copied full details")} className="w-full flex items-center justify-between p-3 bg-white/10 hover:bg-white/20 rounded-md transition-all text-sm font-bold">
                                Copy Checklist <Copy className="w-4 h-4" />
                            </button>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Action Bar */}
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-4xl px-4 z-50">
                <div className="bg-[#111] text-white p-6 rounded-2xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 border border-white/10">
                    <div className="flex items-center gap-6">
                        <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-primary"><Save className="w-6 h-6" /></div>
                        <div>
                            <div className="text-[10px] font-black text-primary uppercase tracking-widest mb-1">Next Step</div>
                            <p className="text-sm text-gray-300">Polish <span className="text-white font-bold">{weakSkills.join(', ') || 'foundation'}</span>. Score targets 100%.</p>
                        </div>
                    </div>
                    <button onClick={() => navigate('/placement/history')} className="bg-white text-black px-6 py-3 rounded-xl font-bold hover:bg-gray-200 transition-all">History</button>
                </div>
            </div>
        </div>
    );
};

const getFullText = (d) => `Company: ${d.company}\nPlan: 7 Days to Success\nQuestions:\n${d.questions.join('\n')}`;

export default Results;
