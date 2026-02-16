import React from 'react';

export const Card = ({ children, title, subtitle, style = {} }) => (
    <div className="card" style={{ ...style }}>
        {title && <h3 style={{ fontSize: '1.25rem', marginBottom: '4px' }}>{title}</h3>}
        {subtitle && <p style={{ fontSize: '0.875rem', color: '#666', marginBottom: 'var(--spacing-md)' }}>{subtitle}</p>}
        {children}
    </div>
);

export const PromptBox = ({ prompt, onCopy }) => (
    <div style={{
        backgroundColor: '#fff',
        border: '1px solid #E5E5E5',
        borderRadius: '4px',
        padding: '12px',
        fontFamily: 'monospace',
        fontSize: '0.8125rem',
        color: '#333',
        marginBottom: 'var(--spacing-md)',
        position: 'relative'
    }}>
        <div style={{ fontSize: '0.625rem', fontWeight: 700, textTransform: 'uppercase', color: '#999', marginBottom: '8px' }}>
            Copyable Prompt
        </div>
        <code>{prompt}</code>
        <button
            onClick={() => {
                navigator.clipboard.writeText(prompt);
                if (onCopy) onCopy();
            }}
            style={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                background: 'none',
                border: 'none',
                color: 'var(--color-accent)',
                fontSize: '0.75rem',
                cursor: 'pointer',
                textTransform: 'none',
                padding: '4px',
                letterSpacing: 0
            }}
        >
            Copy
        </button>
    </div>
);

export const MilestoneProgress = ({ label, percentage }) => (
    <div style={{ marginBottom: 'var(--spacing-md)' }}>
        <div style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '8px', display: 'flex', justifyContent: 'space-between' }}>
            <span>{label}</span>
            <span>{percentage}%</span>
        </div>
        <div style={{
            height: '6px',
            backgroundColor: '#EEE',
            borderRadius: '3px',
            overflow: 'hidden'
        }}>
            <div style={{
                height: '100%',
                width: `${percentage}%`,
                backgroundColor: 'var(--color-accent)',
                transition: 'width 0.4s ease-in-out'
            }}></div>
        </div>
    </div>
);
