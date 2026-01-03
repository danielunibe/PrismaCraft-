import React, { memo } from 'react';
import { Language, Theme } from '../types';

type Props = {
    selectedLang: Language;
    onSelect: (lang: Language) => void;
    theme: Theme;
    neumorphicStyles: React.CSSProperties;
};

const LanguageSelector: React.FC<Props> = ({ selectedLang, onSelect, theme, neumorphicStyles }) => {
    const languages: { id: Language; label: string }[] = [
        { id: 'en', label: 'EN' },
        { id: 'es', label: 'ES' },
    ];

    return (
        <div 
            className="flex items-center p-1.5 rounded-2xl space-x-1"
            style={{ 
                backgroundColor: theme.medium,
                boxShadow: neumorphicStyles['--shadow-inner'] as string, // Inset track
            }}
        >
            {languages.map(({ id, label }) => {
                const isSelected = selectedLang === id;
                return (
                    <button
                        key={id}
                        onClick={() => onSelect(id)}
                        className={`px-3 py-1.5 rounded-xl text-sm font-semibold transition-all duration-200 ease-in-out`}
                        style={{
                            backgroundColor: theme.medium,
                            color: theme.textLight,
                            opacity: isSelected ? 1 : 0.6,
                            // If selected, we can make it flat or slightly pressed. If not, it can be flat.
                            // Neumorphic switch style: Active is elevated (outset), inactive is flat.
                            boxShadow: isSelected 
                                ? neumorphicStyles['--shadow-outer'] as string 
                                : 'none', 
                            transform: isSelected ? 'scale(1.05)' : 'scale(1)'
                        }}
                    >
                        {label}
                    </button>
                )
            })}
        </div>
    );
};

export default memo(LanguageSelector);