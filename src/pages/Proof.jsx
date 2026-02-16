import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '../components/ui/Card';
import { CheckCircle2, Circle, Globe, Github, ExternalLink, Copy, Trophy } from 'lucide-react';

const PRPProof = () => {
    const [links, setLinks] = useState({
        lovable: '',
        github: '',
        deployed: ''
    });
    const [testsPassed, setTestsPassed] = useState(false);
    const [isShipped, setIsShipped] = useState(false);

    useEffect(() => {
        // Check checklist status
        const savedChecklist = localStorage.getItem('prp_test_checklist');
        if (savedChecklist) {
            setTestsPassed(Object.values(JSON.parse(savedChecklist)).filter(v => v).length === 10);
        }

        // Check links
        const savedLinks = localStorage.getItem('prp_final_submission');
        if (savedLinks) setLinks(JSON.parse(savedLinks));

        // Check shipped status
        const shipped = localStorage.getItem('prp_shipped_status');
        if (shipped === 'true') setIsShipped(true);
    }, []);

    const handleChange = (key, val) => {
        const updated = { ...links, [key]: val };
        setLinks(updated);
        localStorage.setItem('prp_final_submission', JSON.stringify(updated));
    };

    const validateUrl = (url) => {
        try {
            return url.startsWith('http://') || url.startsWith('https://');
        } catch { return false; }
    };

    const allLinksValid = validateUrl(links.lovable) && validateUrl(links.github) && validateUrl(links.deployed);
    const canShip = allLinksValid && testsPassed;

    const handleFinalShip = () => {
        if (canShip) {
            setIsShipped(true);
            localStorage.setItem('prp_shipped_status', 'true');
        }
    };

    const copyFinalSubmission = () => {
        const text = `Placement Readiness Platform — Final Submission

Lovable Project: ${links.lovable}
GitHub Repository: ${links.github}
Live Deployment: ${links.deployed}

Core Capabilities:
- JD skill extraction (deterministic)
- Round mapping engine
- 7-day prep plan
- Interactive readiness scoring
- History persistence`;

        navigator.clipboard.writeText(text).then(() => alert("Submission copied to clipboard!"));
    };

    const steps = [
        { id: 1, name: "Heuristic Search Engine", status: "Completed" },
        { id: 2, name: "SaaS Design System", status: "Completed" },
        { id: 3, name: "JD Intelligence layer", status: "Completed" },
        { id: 4, name: "Strategic Round Mapping", status: "Completed" },
        { id: 5, name: "Interactive Skill Assessment", status: "Completed" },
        { id: 6, name: "Dynamic Scoring", status: "Completed" },
        { id: 7, name: "Persistence & History", status: "Completed" },
        { id: 8, name: "Final Build Verification", status: testsPassed ? "Completed" : "Pending" }
    ];

    return (
        <div className="max-w-6xl mx-auto py-12 px-6">
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-4xl font-serif text-gray-900 mb-2">Final Proof</h1>
                    <p className="text-gray-500 italic">Project 2: Placement Readiness Platform</p>
                </div>
                <div className={`px-4 py-2 rounded-full font-bold text-sm uppercase tracking-wider
                    ${isShipped ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}
                `}>
                    Status: {isShipped ? 'Shipped' : 'In Progress'}
                </div>
            </div>

            {isShipped && (
                <div className="bg-white border-2 border-green-600 rounded-2xl p-10 mb-12 text-center shadow-2xl shadow-green-100 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                    <Trophy className="w-16 h-16 text-green-600 mx-auto mb-6" />
                    <h2 className="text-3xl font-serif text-gray-900 mb-4">You built a real product.</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Not a tutorial. Not a clone. <br />
                        A structured tool that solves a real problem. <br /><br />
                        <strong>This is your proof of work.</strong>
                    </p>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <Card>
                    <CardHeader>
                        <CardTitle>Step Completion Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {steps.map(step => (
                            <div key={step.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <span className="font-semibold text-gray-700">{step.id}. {step.name}</span>
                                <span className={`text-xs font-bold uppercase ${step.status === 'Completed' ? 'text-green-600' : 'text-amber-600'}`}>
                                    {step.status}
                                </span>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Artifact Inputs</CardTitle>
                            <CardDescription>Required for final shipment status</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-600 flex items-center gap-2">
                                    <Globe className="w-4 h-4" /> Lovable Project Link
                                </label>
                                <input
                                    type="url"
                                    value={links.lovable}
                                    onChange={e => handleChange('lovable', e.target.value)}
                                    placeholder="https://lovable.dev/..."
                                    className={`w-full px-4 py-2 border rounded-md outline-none focus:ring-1 
                                        ${links.lovable && !validateUrl(links.lovable) ? 'border-red-400 focus:ring-red-400' : 'border-gray-200 focus:ring-primary'}
                                    `}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-600 flex items-center gap-2">
                                    <Github className="w-4 h-4" /> GitHub Repository Link
                                </label>
                                <input
                                    type="url"
                                    value={links.github}
                                    onChange={e => handleChange('github', e.target.value)}
                                    placeholder="https://github.com/..."
                                    className={`w-full px-4 py-2 border rounded-md outline-none focus:ring-1 
                                        ${links.github && !validateUrl(links.github) ? 'border-red-400 focus:ring-red-400' : 'border-gray-200 focus:ring-primary'}
                                    `}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-600 flex items-center gap-2">
                                    <ExternalLink className="w-4 h-4" /> Deployed URL
                                </label>
                                <input
                                    type="url"
                                    value={links.deployed}
                                    onChange={e => handleChange('deployed', e.target.value)}
                                    placeholder="https://..."
                                    className={`w-full px-4 py-2 border rounded-md outline-none focus:ring-1 
                                        ${links.deployed && !validateUrl(links.deployed) ? 'border-red-400 focus:ring-red-400' : 'border-gray-200 focus:ring-primary'}
                                    `}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex flex-col gap-4">
                        <button
                            disabled={!canShip || isShipped}
                            onClick={handleFinalShip}
                            className={`w-full py-4 rounded-xl font-bold text-white shadow-xl transition-all
                                ${canShip && !isShipped ? 'bg-primary shadow-primary/20 hover:scale-105 active:scale-95' : 'bg-gray-300 cursor-not-allowed'}
                            `}
                        >
                            {isShipped ? 'PROJECT SHIPPED' : 'FINAL SHIP'}
                        </button>
                        <button
                            onClick={copyFinalSubmission}
                            className="w-full py-3 bg-white border border-gray-200 text-gray-600 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-50 transition-all font-sans"
                        >
                            <Copy className="w-4 h-4" /> Copy Final Submission
                        </button>
                        {!testsPassed && (
                            <p className="text-center text-xs text-primary font-semibold">* Complete Test Checklist to enable Ship.</p>
                        )}
                        {testsPassed && !allLinksValid && (
                            <p className="text-center text-xs text-primary font-semibold">* Provide all 3 valid artifact links to enable Ship.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PRPProof;
