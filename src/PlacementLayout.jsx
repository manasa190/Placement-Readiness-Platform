import React from 'react';

const PlacementLayout = ({
    projectName = "Placement Readiness Platform",
    stepText = "Step 0 / 8",
    status = "Not Started",
    headline = "Strategic Placement Readiness",
    subtext = "Master your technical and behavioral skills for top-tier Indian tech companies.",
    primaryContent,
    secondaryContent,
    checklist = []
}) => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            backgroundColor: 'var(--color-bg)',
            color: 'var(--color-text)',
            fontFamily: 'var(--font-sans)',
            position: 'relative',
            paddingBottom: '80px' // Space for persistent footer
        }}>
            {/* Top Bar */}
            <div style={{
                height: '64px',
                backgroundColor: '#fff',
                borderBottom: '1px solid #E5E5E5',
                display: 'flex',
                alignItems: 'center',
                padding: '0 var(--spacing-lg)',
                justifyContent: 'space-between',
                position: 'sticky',
                top: 0,
                zIndex: 100
            }}>
                <div style={{ fontWeight: 700, fontSize: '1.125rem', color: 'var(--color-text)' }}>
                    {projectName}
                </div>
                <div style={{ fontSize: '0.875rem', fontWeight: 500, color: '#666' }}>
                    {stepText}
                </div>
                <div style={{
                    padding: '4px 12px',
                    borderRadius: '100px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    backgroundColor: status === 'Shipped' ? '#E8F5E9' : status === 'In Progress' ? '#FFF8E1' : '#F5F5F5',
                    color: status === 'Shipped' ? '#2E7D32' : status === 'In Progress' ? '#F57F17' : '#666',
                    border: `1px solid ${status === 'Shipped' ? '#2E7D3230' : status === 'In Progress' ? '#F57F1730' : '#66630'}`
                }}>
                    {status}
                </div>
            </div>

            {/* Context Header */}
            <div style={{
                padding: 'var(--spacing-xxl) var(--spacing-lg) var(--spacing-xl)',
                maxWidth: '1440px',
                margin: '0 auto',
                width: '100%'
            }}>
                <h1 style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '3.5rem',
                    marginBottom: 'var(--spacing-sm)',
                    letterSpacing: '-0.02em'
                }}>
                    {headline}
                </h1>
                <p style={{
                    fontSize: '1.25rem',
                    color: '#666',
                    maxWidth: '720px',
                    lineHeight: '1.6',
                    marginBottom: 0
                }}>
                    {subtext}
                </p>
            </div>

            {/* Main Workspace */}
            <div style={{
                maxWidth: '1440px',
                margin: '0 auto',
                width: '100%',
                padding: '0 var(--spacing-lg)',
                display: 'grid',
                gridTemplateColumns: 'minmax(0, 1fr) 400px',
                gap: 'var(--spacing-xl)',
                alignItems: 'start'
            }}>
                {/* Primary Workspace (70%) */}
                <div style={{ minWidth: 0 }}>
                    {primaryContent || (
                        <div className="card" style={{ minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <span style={{ color: '#999' }}>Primary Interaction Workspace</span>
                        </div>
                    )}
                </div>

                {/* Secondary Panel (30%) */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--spacing-lg)'
                }}>
                    {secondaryContent || (
                        <div className="card" style={{ backgroundColor: '#F9FAFB' }}>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: 'var(--spacing-md)' }}>Instructional Guide</h3>
                            <p style={{ fontSize: '0.9375rem', color: '#666', marginBottom: 'var(--spacing-lg)' }}>
                                This panel provides contextual guidance and executable prompts to accelerate your workflow.
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
                                <code>Build the core registration engine with OTP validation.</code>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                                <button className="btn-secondary" style={{ padding: '8px', fontSize: '0.75rem' }}>Copy Prompt</button>
                                <button className="btn-primary" style={{ padding: '8px', fontSize: '0.75rem' }}>Build</button>
                                <button className="btn-secondary" style={{ padding: '8px', fontSize: '0.75rem' }}>It Worked</button>
                                <button className="btn-secondary" style={{ padding: '8px', fontSize: '0.75rem' }}>Error</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Proof Footer */}
            <div style={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                height: '80px',
                backgroundColor: '#fff',
                borderTop: '2px solid var(--color-text)',
                display: 'flex',
                alignItems: 'center',
                padding: '0 var(--spacing-lg)',
                zIndex: 1000
            }}>
                <div style={{
                    maxWidth: '1440px',
                    margin: '0 auto',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--spacing-xl)'
                }}>
                    <div style={{ fontSize: '0.875rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Submission Verification
                    </div>
                    <div style={{ display: 'flex', gap: 'var(--spacing-lg)' }}>
                        {checklist.map((item, idx) => (
                            <label key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.875rem', fontWeight: 500 }}>
                                <input type="checkbox" className="proof-checkbox" />
                                {item}
                            </label>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlacementLayout;
