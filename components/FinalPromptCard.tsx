
import React, { useState, useEffect, memo } from 'react';
import { STRINGS } from '../constants';
import { Theme } from '../types';
import { shadeColor } from '../utils/colorUtils';

type Props = {
    prompt: string;
    t: typeof STRINGS.en;
    isEntering: boolean;
    theme: Theme;
};

const FinalPromptCard: React.FC<Props> = ({ prompt, t, isEntering, theme }) => {
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (copied) {
            const timer = setTimeout(() => setCopied(false), 2000);
            return () => clearTimeout(timer);
        }
    }, [copied]);

    const handleCopy = () => {
        navigator.clipboard.writeText(prompt);
        setCopied(true);
    };

    const baseColor = theme.light;
    const shadowColorDark = shadeColor(baseColor, -15);
    const shadowColorLight = shadeColor(baseColor, 15);
    
    // Inset shadow for the result box (cavity)
    const insetShadow = `inset 4px 4px 8px ${shadowColorDark}, -4px -4px 8px ${shadowColorLight}`;
    
    const cardClasses = `
        p-6 sm:p-8 rounded-[2rem]
        w-full max-w-3xl transition-all duration-500 ease-out
        ${isEntering ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
        shadow-2xl
    `;

    return (
        <div 
            className={cardClasses} 
            style={{ 
                backgroundColor: theme.light,
                transitionDelay: isEntering ? '400ms' : '0ms' 
            }}
        >
            <div className="text-center">
                <h2 className="text-2xl sm:text-3xl font-bold mb-2 font-['Montserrat']" style={{ color: theme.textDark }}>{t.finalPhaseTitle}</h2>
            </div>
            
            {/* Neumorphic Inset Well for the Prompt */}
            <pre 
                className="mt-6 w-full p-4 sm:p-6 rounded-3xl whitespace-pre-wrap font-sans text-left text-sm sm:text-base"
                style={{ 
                    backgroundColor: theme.light, 
                    color: theme.textDark, 
                    boxShadow: insetShadow,
                    border: 'none'
                }}
            >
                {prompt}
            </pre>
            
            <button
                onClick={handleCopy}
                className="mt-6 w-full font-bold py-3 px-6 rounded-2xl focus:outline-none transition-all duration-300 transform hover:scale-105 active:scale-95"
                style={{
                     backgroundColor: theme.dark,
                     color: theme.textLight,
                     boxShadow: `0 8px 16px -4px ${shadeColor(theme.dark, -30)}`
                }}
            >
                {copied ? t.copiedButton : t.copyButton}
            </button>
        </div>
    );
};

export default memo(FinalPromptCard);
