import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { CheckCircle2, Circle, AlertCircle, Info, RefreshCcw } from 'lucide-react';

const PRPTestChecklist = () => {
    const navigate = useNavigate();
    const [checklist, setChecklist] = useState({
        jdRequired: false,
        shortJDWarning: false,
        skillsGrouping: false,
        roundMappingDynamic: false,
        scoreDeterministic: false,
        liveScoreUpdate: false,
        changesPersist: false,
        historyWorks: false,
        exportCorrect: false,
        noConsoleErrors: false
    });

    useEffect(() => {
        const saved = localStorage.getItem('prp_test_checklist');
        if (saved) setChecklist(JSON.parse(saved));
    }, []);

    const toggleItem = (key) => {
        const updated = { ...checklist, [key]: !checklist[key] };
        setChecklist(updated);
        localStorage.setItem('prp_test_checklist', JSON.stringify(updated));
    };

    const resetChecklist = () => {
        const reset = Object.keys(checklist).reduce((acc, key) => ({ ...acc, [key]: false }), {});
        setChecklist(reset);
        localStorage.setItem('prp_test_checklist', JSON.stringify(reset));
    };

    const passedCount = Object.values(checklist).filter(v => v).length;
    const isComplete = passedCount === 10;

    const testItems = [
        { key: 'jdRequired', label: 'JD required validation works', hint: 'Try to submit without a JD.' },
        { key: 'shortJDWarning', label: 'Short JD warning shows for <200 chars', hint: 'Type a few words and check if it warns you.' },
        { key: 'skillsGrouping', label: 'Skills extraction groups correctly', hint: 'Check if React is under Web and Java is under Languages.' },
        { key: 'roundMappingDynamic', label: 'Round mapping changes based on company + skills', hint: 'Enter Amazon vs a Startup and check the timeline.' },
        { key: 'scoreDeterministic', label: 'Score calculation is deterministic', hint: 'Same JD should yield the same base score.' },
        { key: 'liveScoreUpdate', label: 'Skill toggles update score live', hint: 'Toggle a skill on Results page and watch the circle.' },
        { key: 'changesPersist', label: 'Changes persist after refresh', hint: 'Toggle skills, refresh, and ensure state is kept.' },
        { key: 'historyWorks', label: 'History saves and loads correctly', hint: 'Navigate to History and reload an entry.' },
        { key: 'exportCorrect', label: 'Export buttons copy correct content', hint: 'Copy questions and paste into notepad to verify.' },
        { key: 'noConsoleErrors', label: 'No console errors on core pages', hint: 'Press F12 and check for red error text.' }
    ];

    return (
        <div className="max-w-4xl mx-auto py-12 px-6">
            <div className="flex justify-between items-start mb-10">
                <div>
                    <h1 className="text-4xl font-serif text-gray-900 mb-2">Build Verification</h1>
                    <p className="text-gray-500">Placement Readiness Platform — 10-Point Checklist</p>
                </div>
                <div className="text-right">
                    <div className={`text-3xl font-bold ${isComplete ? 'text-green-600' : 'text-gray-900'}`}>
                        {passedCount} / 10 passed
                    </div>
                    {!isComplete && (
                        <div className="text-sm font-semibold text-primary mt-1 flex items-center justify-end gap-1">
                            <AlertCircle className="w-4 h-4" />
                            Fix issues before shipping.
                        </div>
                    )}
                </div>
            </div>

            <Card className="mb-8">
                <CardContent className="divide-y divide-gray-100 p-0">
                    {testItems.map((item) => (
                        <div key={item.key} className="flex items-center justify-between p-5 hover:bg-gray-50 transition-colors group">
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => toggleItem(item.key)}
                                    className={`transition-colors ${checklist[item.key] ? 'text-green-600' : 'text-gray-300'}`}
                                >
                                    {checklist[item.key] ? <CheckCircle2 className="w-8 h-8" /> : <Circle className="w-8 h-8" />}
                                </button>
                                <div>
                                    <div className={`text-lg font-medium ${checklist[item.key] ? 'text-gray-900' : 'text-gray-600'}`}>
                                        {item.label}
                                    </div>
                                    <div className="text-xs text-gray-400 mt-1 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Info className="w-3 h-3" />
                                        {item.hint}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>

            <div className="flex gap-4 justify-center">
                <button
                    onClick={resetChecklist}
                    className="flex items-center gap-2 px-6 py-3 border rounded-xl font-bold text-gray-600 hover:bg-gray-50 transition-all"
                >
                    <RefreshCcw className="w-4 h-4" />
                    Reset checklist
                </button>
                <button
                    disabled={!isComplete}
                    onClick={() => navigate('/placement/08-ship')}
                    className={`px-8 py-3 rounded-xl font-bold text-white transition-all
                        ${isComplete ? 'bg-primary shadow-lg shadow-primary/20 hover:scale-105' : 'bg-gray-300 cursor-not-allowed'}
                    `}
                >
                    Proceed to Ship
                </button>
            </div>
        </div>
    );
};

export default PRPTestChecklist;
