import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { PlayCircle, Target, Calendar } from 'lucide-react';

const data = [
    { subject: 'DSA', A: 75, fullMark: 100 },
    { subject: 'System Design', A: 60, fullMark: 100 },
    { subject: 'Communication', A: 80, fullMark: 100 },
    { subject: 'Resume', A: 85, fullMark: 100 },
    { subject: 'Aptitude', A: 70, fullMark: 100 },
];

const OverallReadiness = ({ score = 72 }) => {
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 100) * circumference;

    return (
        <Card className="flex flex-col items-center justify-center py-10">
            <div className="relative w-40 h-40">
                <svg className="w-full h-full transform -rotate-90">
                    <circle
                        cx="80"
                        cy="80"
                        r={radius}
                        stroke="#e5e7eb"
                        strokeWidth="8"
                        fill="transparent"
                    />
                    <circle
                        cx="80"
                        cy="80"
                        r={radius}
                        stroke="hsl(245, 58%, 51%)"
                        strokeWidth="8"
                        fill="transparent"
                        strokeDasharray={circumference}
                        style={{
                            strokeDashoffset: offset,
                            transition: 'stroke-dashoffset 1.5s ease-in-out',
                        }}
                        strokeLinecap="round"
                    />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-bold text-gray-800">{score}</span>
                    <span className="text-xs text-gray-500 font-medium">/ 100</span>
                </div>
            </div>
            <div className="mt-4 text-center">
                <p className="text-sm font-semibold text-gray-600">Readiness Score</p>
            </div>
        </Card>
    );
};

const Dashboard = () => {
    return (
        <div className="space-y-8 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Readiness Score */}
                <div className="space-y-8">
                    <OverallReadiness />

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                                <PlayCircle className="w-5 h-5 text-primary" />
                                Continue Practice
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex justify-between items-center mb-4">
                                <div>
                                    <h4 className="font-bold text-gray-800">Dynamic Programming</h4>
                                    <p className="text-sm text-gray-500">3/10 problems completed</p>
                                </div>
                                <button className="bg-primary hover:bg-[#7248e3] text-white px-4 py-2 rounded text-sm font-semibold transition-colors">
                                    Continue
                                </button>
                            </div>
                            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                                <div className="bg-primary h-full w-[30%]" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Skill Breakdown Radar Chart */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Skill Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                                <PolarGrid stroke="#e5e7eb" />
                                <PolarAngleAxis dataKey="subject" tick={{ fill: '#666', fontSize: 12 }} />
                                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                <Radar
                                    name="Skills"
                                    dataKey="A"
                                    stroke="hsl(245, 58%, 51%)"
                                    fill="hsl(245, 58%, 51%)"
                                    fillOpacity={0.6}
                                />
                            </RadarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Weekly Goals */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <Target className="w-5 h-5 text-primary" />
                            Weekly Goals
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="mb-6">
                            <div className="flex justify-between text-sm font-medium mb-2">
                                <span>Problems Solved</span>
                                <span className="text-primary">12/20 this week</span>
                            </div>
                            <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                                <div className="bg-primary h-full w-[60%]" />
                            </div>
                        </div>
                        <div className="flex justify-between">
                            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                                <div key={day} className="flex flex-col items-center gap-2">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold ${i < 4 ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400'
                                        }`}>
                                        {day[0]}
                                    </div>
                                    <span className="text-[10px] text-gray-500 font-medium">{day}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Upcoming Assessments */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-primary" />
                            Upcoming Assessments
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[
                                { title: "DSA Mock Test", time: "Tomorrow, 10:00 AM", tag: "Mock" },
                                { title: "System Design Review", time: "Wed, 2:00 PM", tag: "Live" },
                                { title: "HR Interview Prep", time: "Friday, 11:00 AM", tag: "Strategy" }
                            ].map((item, idx) => (
                                <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
                                    <div>
                                        <h5 className="font-bold text-gray-800">{item.title}</h5>
                                        <p className="text-xs text-gray-500 mt-1">{item.time}</p>
                                    </div>
                                    <span className="text-[10px] uppercase tracking-wider font-black px-2 py-1 bg-white border border-gray-200 rounded text-gray-400">
                                        {item.tag}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Dashboard;
