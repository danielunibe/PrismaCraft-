import React, { memo } from 'react';

const LightbulbIconComponent: React.FC<{className?: string; style?: React.CSSProperties}> = ({ className, style }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} style={style} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
);
export const LightbulbIcon = memo(LightbulbIconComponent);

const CraftLogoComponent: React.FC<{className?: string}> = ({ className }) => (
    <svg 
        viewBox="0 0 100 100" 
        className={className}
        xmlns="http://www.w3.org/2000/svg"
    >
        <circle cx="50" cy="50" r="45" fill="white" />
    </svg>
);
export const CraftLogo = memo(CraftLogoComponent);

const ChevronLeftIconComponent: React.FC<{className?: string; style?: React.CSSProperties}> = ({ className, style }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} style={style} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
);
export const ChevronLeftIcon = memo(ChevronLeftIconComponent);

const ChevronRightIconComponent: React.FC<{className?: string; style?: React.CSSProperties}> = ({ className, style }) => (
     <svg xmlns="http://www.w3.org/2000/svg" className={className} style={style} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
);
export const ChevronRightIcon = memo(ChevronRightIconComponent);
