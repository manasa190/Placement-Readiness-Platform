import React from 'react';

const PlaceholderPage = ({ title }) => (
    <div className="flex flex-col items-center justify-center h-full text-center">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
        <h1 className="text-3xl font-serif text-gray-800 mb-2">{title}</h1>
        <p className="text-gray-500">This module is currently under development.</p>
    </div>
);

export const Practice = () => <PlaceholderPage title="Practice Module" />;
export const Assessments = () => <PlaceholderPage title="Assessments Center" />;
export const Resources = () => <PlaceholderPage title="Learning Resources" />;
export const Profile = () => <PlaceholderPage title="User Profile" />;
