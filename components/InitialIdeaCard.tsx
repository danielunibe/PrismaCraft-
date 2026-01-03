
import React, { useState, memo } from 'react';
import { STRINGS } from '../constants';
import { Theme } from '../types';
import { shadeColor } from '../utils/colorUtils';

type Props = {
    onAnalyze: (prompt: string) => void;
    isLoading: boolean;
    t: typeof STRINGS.en;
    isEntering: boolean;
    isExiting: boolean;
    theme: Theme;
    icon: React.ReactNode;
};

const InitialIdeaCard: React.FC<Props> = ({ onAnalyze, isLoading, t, isEntering, isExiting, theme, icon }) => {
    const [prompt, setPrompt] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (prompt.trim() && !isLoading) {
            onAnalyze(prompt);
        }
    };

    const handleChipClick = (example: string) => {
        setPrompt(example);
        setIsFocused(true);
    };

    const cardClasses = `
        p-5 sm:p-8 rounded-[2rem]
        transition-all duration-700 ease-in-out w-full max-w-2xl
        ${isEntering ? 'animate-stretch-flex-in' : ''}
        ${isExiting ? 'transform scale-50 opacity-0 -translate-y-[200%]' : 'transform scale-100 opacity-100'}
        flex flex-col relative overflow-hidden
    `;

    const baseColor = theme.medium;
    const shadowColorDark = shadeColor(baseColor, -20);
    const shadowColorLight = shadeColor(baseColor, 20);
    
    // Neumorphic Shadows
    const outerShadow = `15px 15px 30px ${shadowColorDark}, -15px -15px 30px ${shadowColorLight}`;
    const insetShadow = `inset 4px 4px 8px ${shadowColorDark}, -4px -4px 8px ${shadowColorLight}`;
    const focusInsetShadow = `inset 6px 6px 12px ${shadeColor(baseColor, -30)}, inset -6px -6px 12px ${shadeColor(baseColor, 10)}`;
    const chipShadow = `4px 4px 8px ${shadowColorDark}, -4px -4px 8px ${shadowColorLight}`;
    const chipActiveShadow = `inset 2px 2px 4px ${shadowColorDark}, inset -2px -2px 4px ${shadowColorLight}`;
    
    // Icon Container
    const iconContainerShadow = `6px 6px 12px ${shadowColorDark}, -6px -6px 12px ${shadowColorLight}`;

    // Button styling
    const buttonBaseColor = theme.dark;
    
    const isEnglish = t.analyzeButton === "Analyze";
    const placeholderText = theme.examples && theme.examples.length > 0
        ? `${isEnglish ? 'e.g.,' : 'Ej:'} "${theme.examples[0]}"`
        : t.initialPhasePlaceholder;
    
    return (
        <div 
            className={cardClasses} 
            style={{ 
                backgroundColor: baseColor,
                boxShadow: outerShadow
            }}
        >
            <div className="relative z-10 flex flex-col items-center">
                
                {/* Header Section */}
                <div className="flex flex-col items-center mb-4 sm:mb-8 w-full">
                    {/* Visual Continuity: Medium-Large Icon (Scaled down from previous giant size to prevent cut-off) */}
                    <div 
                        className="w-24 h-24 sm:w-40 sm:h-40 rounded-[1.5rem] sm:rounded-[2.5rem] flex items-center justify-center mb-4 sm:mb-6 transform transition-transform duration-500 hover:scale-105 overflow-hidden border-4 border-opacity-10 border-white"
                        style={{ 
                            backgroundColor: theme.light,
                            boxShadow: iconContainerShadow,
                        }}
                    >
                        {icon}
                    </div>
                    
                    <h2 
                        className="text-xl sm:text-3xl font-bold font-['Montserrat'] mb-2 text-center drop-shadow-sm tracking-tight" 
                        style={{ color: theme.textLight }}
                    >
                        {t.initialPhaseTitle}
                    </h2>
                    <p 
                        className="text-sm sm:text-base text-center max-w-lg font-medium leading-relaxed px-2" 
                        style={{ color: theme.textLight, opacity: 0.95 }}
                    >
                        {t.initialPhaseDescription}
                    </p>
                </div>

                {/* Form Section */}
                <form onSubmit={handleSubmit} className="w-full">
                    <div 
                        className={`relative rounded-2xl sm:rounded-3xl transition-all duration-300 ${isFocused ? 'transform scale-[0.995]' : ''}`}
                        style={{
                            backgroundColor: baseColor,
                            boxShadow: isFocused ? focusInsetShadow : insetShadow
                        }}
                    >
                        <textarea
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            placeholder={placeholderText}
                            className="w-full h-28 sm:h-44 p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-transparent focus:outline-none resize-none text-base sm:text-lg leading-relaxed font-medium"
                            style={{ 
                                color: theme.textLight,
                                '--placeholder-color': theme.textLight,
                            } as React.CSSProperties}
                            disabled={isLoading}
                        />
                         <style>{`
                            textarea::placeholder {
                                color: var(--placeholder-color) !important;
                                opacity: 0.7 !important;
                                font-style: italic;
                            }
                        `}</style>
                    </div>
                    
                    {theme.examples && theme.examples.length > 0 && (
                         <div className="w-full mt-4 overflow-x-auto pb-2 no-scrollbar">
                             <div className="flex space-x-2 sm:justify-center px-1">
                                {theme.examples.map((example, idx) => (
                                    <button
                                        key={idx}
                                        type="button"
                                        onClick={() => handleChipClick(example)}
                                        className="whitespace-nowrap px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 active:scale-95 flex-shrink-0"
                                        style={{
                                            backgroundColor: baseColor,
                                            color: theme.textLight,
                                            boxShadow: chipShadow,
                                            border: '1px solid rgba(255,255,255,0.1)'
                                        }}
                                        onMouseDown={(e) => e.currentTarget.style.boxShadow = chipActiveShadow}
                                        onMouseUp={(e) => e.currentTarget.style.boxShadow = chipShadow}
                                        onMouseLeave={(e) => e.currentTarget.style.boxShadow = chipShadow}
                                    >
                                        ✨ {example}
                                    </button>
                                ))}
                             </div>
                         </div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading || !prompt.trim()}
                        className="mt-5 sm:mt-8 w-full font-bold font-['Montserrat'] py-3 sm:py-4 px-6 rounded-xl sm:rounded-2xl focus:outline-none transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed shadow-lg relative overflow-hidden group"
                        style={{ 
                            backgroundColor: buttonBaseColor,
                            color: theme.textLight,
                            boxShadow: `0 8px 20px -6px ${shadeColor(buttonBaseColor, -30)}`,
                        }}
                    >
                        <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />
                        
                        <span className="flex items-center justify-center gap-2 text-base sm:text-xl tracking-wide relative z-10">
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    {t.analyzingButton}
                                </>
                            ) : (
                                t.analyzeButton
                            )}
                        </span>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default memo(InitialIdeaCard);
