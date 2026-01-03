
import React, { memo } from 'react';
import { Theme } from '../types';
import { shadeColor } from '../utils/colorUtils';

type Props = {
    label: string;
    description: string;
    value: string;
    onChange: (value: string) => void;
    theme: Theme;
};

const CraftCard: React.FC<Props> = ({ label, description, value, onChange, theme }) => {
    
    // We use theme.light as the base for the card content area
    const baseColor = theme.light;
    const shadowColorDark = shadeColor(baseColor, -15);
    const shadowColorLight = shadeColor(baseColor, 10);
    
    // Deep inset shadow for the cavity effect
    const insetShadow = `inset 4px 4px 8px ${shadowColorDark}, -4px -4px 8px ${shadowColorLight}`;
    
    const textColor = theme.textDark;
    
    return (
        <div className="w-full h-full flex flex-col relative overflow-hidden p-1.5 sm:p-2 rounded-xl transition-transform duration-200">
            <label className="block mb-0.5 font-bold font-['Montserrat'] text-sm sm:text-base relative z-10" style={{ color: theme.textLight }}>
                {label}
            </label>
            <p className="text-xs mb-1.5 relative z-10 leading-tight" style={{ color: theme.textLight, opacity: 0.85 }}>{description}</p>
            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full flex-grow h-20 sm:h-32 p-3 rounded-xl focus:outline-none transition-all duration-300 resize-none text-sm sm:text-base relative z-10 border-none leading-relaxed font-medium"
                style={{ 
                    backgroundColor: baseColor, 
                    color: textColor,
                    boxShadow: insetShadow, // Neumorphic Inset
                    '--scrollbar-thumb-color': shadeColor(baseColor, -20),
                    '--scrollbar-thumb-border-color': baseColor,
                } as React.CSSProperties}
            />
        </div>
    );
};

export default memo(CraftCard);
