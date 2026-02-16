import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PlacementHome from './pages/LandingPage';
import DashboardShell from './components/DashboardShell';
import PlacementDashboard from './pages/Dashboard';
import Assessments from './pages/Assessments';
import Results from './pages/Results';
import History from './pages/History';
import PRPTestChecklist from './pages/TestChecklist';
import PRPShip from './pages/Ship';
import PRPProof from './pages/Proof';
import { Practice, Resources, Profile } from './pages/Placeholders';
import './index.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<PlacementHome />} />
                <Route path="/placement" element={<Navigate to="/" replace />} />
                <Route path="/" element={<DashboardShell />}>
                    <Route path="dashboard" element={<PlacementDashboard />} />
                    <Route path="practice" element={<Practice />} />
                    <Route path="assessments" element={<Assessments />} />
                    <Route path="results" element={<Results />} />
                    <Route path="history" element={<History />} />
                    <Route path="07-test" element={<PRPTestChecklist />} />
                    <Route path="08-ship" element={<PRPShip />} />
                    <Route path="proof" element={<PRPProof />} />
                    <Route path="resources" element={<Resources />} />
                    <Route path="profile" element={<Profile />} />
                </Route>
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
}

export default App;
