import React from 'react';
import { LucideIcon } from 'lucide-react';

interface DashboardCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    status?: 'success' | 'warning' | 'error' | 'neutral';
}

const statusColors = {
    success: 'text-green-500',
    warning: 'text-yellow-500',
    error: 'text-red-500',
    neutral: 'text-gray-500'
};

export function DashboardCard({ title, value, icon: Icon, status = 'neutral' }:
    DashboardCardProps) {
    return (
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-gray-700 transition all">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider">{title}</h3>
                <Icon className={`${statusColors[status]} w-5 h-5`} />
            </div>
            <div className="text-3xl font-bold text-white font-mono">{value}</div>
        </div>
    );
}
