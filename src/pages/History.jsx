import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Clock, ExternalLink, Trash2, Search, AlertCircle } from 'lucide-react';

const History = () => {
    const navigate = useNavigate();
    const [history, setHistory] = useState([]);
    const [search, setSearch] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        try {
            const saved = localStorage.getItem('placementHistory');
            if (saved) {
                const parsed = JSON.parse(saved);
                // Validating data structure of entries (strict schema check)
                const valid = parsed.filter(item => item.id && item.company !== undefined && item.finalScore !== undefined);
                if (valid.length < parsed.length) {
                    setError("One saved entry couldn't be loaded. Create a new analysis.");
                }
                setHistory(valid);
            }
        } catch (e) {
            setError("History data corrupted. Starting fresh.");
            setHistory([]);
        }
    }, []);

    const deleteEntry = (id, e) => {
        e.stopPropagation();
        const newHistory = history.filter(h => h.id !== id);
        setHistory(newHistory);
        localStorage.setItem('placementHistory', JSON.stringify(newHistory));
    };

    const openEntry = (entry) => {
        localStorage.setItem('lastPlacementResult', JSON.stringify(entry));
        navigate('/placement/results');
    };

    const filtered = history.filter(h =>
        h.company.toLowerCase().includes(search.toLowerCase()) ||
        h.role.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="max-w-5xl mx-auto py-8 space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-4xl font-serif text-gray-900 mb-2">Analysis History</h1>
                    <p className="text-gray-500">Stability and consistency in your preparation records.</p>
                </div>
                <div className="relative w-full md:w-80">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search company or role..."
                        className="w-full pl-10 pr-4 py-2 border rounded-full focus:ring-2 focus:ring-primary/20 outline-none"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            {error && (
                <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg flex items-center gap-3 text-amber-700 text-sm">
                    <AlertCircle className="w-5 h-5" />
                    {error}
                </div>
            )}

            {filtered.length === 0 ? (
                <Card className="flex flex-col items-center justify-center py-20 text-center">
                    <Clock className="w-12 h-12 text-gray-300 mb-4" />
                    <CardTitle className="text-gray-400">No matching records</CardTitle>
                    <button onClick={() => navigate('/placement/assessments')} className="mt-4 text-primary font-bold hover:underline">
                        Analyze New JD →
                    </button>
                </Card>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {filtered.map((entry) => (
                        <div
                            key={entry.id}
                            onClick={() => openEntry(entry)}
                            className="group bg-white border rounded-xl p-5 flex flex-col md:flex-row items-center justify-between gap-6 cursor-pointer hover:border-primary/50 hover:shadow-lg transition-all"
                        >
                            <div className="flex items-center gap-6 w-full md:w-auto">
                                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center font-bold text-primary shrink-0">
                                    {entry.finalScore}%
                                </div>
                                <div className="min-w-0">
                                    <h3 className="font-bold text-lg text-gray-900 truncate">{entry.role || "Untitled Role"}</h3>
                                    <div className="flex items-center gap-3 text-sm text-gray-500">
                                        <span className="font-medium text-primary uppercase text-[10px] tracking-widest">{entry.company || "Unknown"}</span>
                                        <span className="text-gray-300">•</span>
                                        <span>{new Date(entry.createdAt).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <button onClick={(e) => deleteEntry(entry.id, e)} className="p-2 text-gray-300 hover:text-red-500 transition-colors">
                                    <Trash2 className="w-5 h-5" />
                                </button>
                                <div className="p-2 text-primary group-hover:translate-x-1 transition-transform">
                                    <ExternalLink className="w-5 h-5" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default History;
