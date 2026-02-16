import React, { useState } from 'react';
import PlacementLayout from './PlacementLayout';

const PlacementHome = () => {
    const [progress, setProgress] = useState(0);

    const primaryContent = (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
            <div className="card">
                <h2 style={{ fontSize: '1.75rem', marginBottom: 'var(--spacing-md)' }}>Platform Overview</h2>
                <p>Welcome to the Placement Readiness Platform. This module is designed to help you prepare for technical interviews and aptitude tests through structured learning paths and real-world simulations.</p>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: 'var(--spacing-md)',
                    marginTop: 'var(--spacing-lg)'
                }}>
                    <div style={{ padding: 'var(--spacing-md)', backgroundColor: '#F9FAFB', borderRadius: '4px', border: '1px solid #E5E5E5' }}>
                        <div style={{ fontWeight: 600, marginBottom: '4px' }}>Technical Prep</div>
                        <p style={{ fontSize: '0.875rem', color: '#666', marginBottom: 0 }}>Data Structures, Algorithms, and System Design.</p>
                    </div>
                    <div style={{ padding: 'var(--spacing-md)', backgroundColor: '#F9FAFB', borderRadius: '4px', border: '1px solid #E5E5E5' }}>
                        <div style={{ fontWeight: 600, marginBottom: '4px' }}>Behavioral Training</div>
                        <p style={{ fontSize: '0.875rem', color: '#666', marginBottom: 0 }}>Soft skills, body language, and HR interview strategies.</p>
                    </div>
                    <div style={{ padding: 'var(--spacing-md)', backgroundColor: '#F9FAFB', borderRadius: '4px', border: '1px solid #E5E5E5' }}>
                        <div style={{ fontWeight: 600, marginBottom: '4px' }}>Mock Assessments</div>
                        <p style={{ fontSize: '0.875rem', color: '#666', marginBottom: 0 }}>Simulated tests from top Indian tech companies.</p>
                    </div>
                </div>
            </div>

            <div className="card">
                <h3 style={{ marginBottom: 'var(--spacing-md)' }}>Get Started</h3>
                <p>Select a module from the secondary panel to begin your readiness journey. Each step is designed to be completed in sequence.</p>
                <button className="btn-primary" onClick={() => alert('Module system coming soon.')}>Initialize Baseline Assessment</button>
            </div>
        </div>
    );

    const secondaryContent = (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
            <div className="card" style={{ backgroundColor: '#F9FAFB' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: 'var(--spacing-md)' }}>Instructional Guide</h3>
                <p style={{ fontSize: '0.9375rem', color: '#666', marginBottom: 'var(--spacing-lg)' }}>
                    Start by setting up your profile and choosing your target companies. This will customize your learning path.
                </p>

                <div style={{
                    backgroundColor: '#fff',
                    border: '1px solid #E5E5E5',
                    borderRadius: '4px',
                    padding: '12px',
                    fontFamily: 'monospace',
                    fontSize: '0.8125rem',
                    color: '#333',
                    marginBottom: 'var(--spacing-lg)',
                    position: 'relative'
                }}>
                    <div style={{ fontSize: '0.625rem', fontWeight: 700, textTransform: 'uppercase', color: '#999', marginBottom: '8px' }}>
                        Copyable Prompt
                    </div>
                    <code>Setup placement profile and target roles.</code>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    <button className="btn-secondary" style={{ padding: '8px', fontSize: '0.75rem' }}>Copy Prompt</button>
                    <button className="btn-primary" style={{ padding: '8px', fontSize: '0.75rem' }}>Build</button>
                </div>
            </div>

            <div className="card">
                <h4 style={{ fontSize: '1rem', marginBottom: 'var(--spacing-sm)' }}>Milestone Progress</h4>
                <div style={{
                    height: '8px',
                    backgroundColor: '#EEE',
                    borderRadius: '4px',
                    overflow: 'hidden',
                    marginBottom: 'var(--spacing-sm)'
                }}>
                    <div style={{
                        height: '100%',
                        width: '0%',
                        backgroundColor: 'var(--color-accent)',
                        transition: 'width 0.3s ease'
                    }}></div>
                </div>
                <div style={{ fontSize: '0.75rem', color: '#999', display: 'flex', justifyContent: 'space-between' }}>
                    <span>Module 1: Fundamentals</span>
                    <span>0%</span>
                </div>
            </div>
        </div>
    );

    return (
        <PlacementLayout
            stepText="Step 1 / 8"
            status="In Progress"
            primaryContent={primaryContent}
            secondaryContent={secondaryContent}
            checklist={['UI Built', 'Logic Working', 'Test Passed', 'Deployed']}
        />
    );
};

export default PlacementHome;
