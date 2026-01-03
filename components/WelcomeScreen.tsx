
import React, { memo, useRef, useState } from 'react';
import { Theme, Language } from '../types';
import { useInteractiveWelcome } from '../hooks/useInteractiveWelcome';
import LanguageSelector from './LanguageSelector';

type Props = {
    show: boolean;
    isExiting: boolean;
    onStart: () => void;
    currentTheme: Theme;
    language: Language;
    setLanguage: (lang: Language) => void;
    neumorphicStyles: React.CSSProperties;
    t: any;
};

const WelcomeScreen: React.FC<Props> = ({ 
    show, 
    isExiting, 
    onStart, 
    currentTheme, 
    language, 
    setLanguage, 
    neumorphicStyles, 
    t 
}) => {
    const [isButtonPressed, setIsButtonPressed] = useState(false);
    const { letterRefs } = useInteractiveWelcome(show && !isExiting);
    const text1 = "Prisma";
    const text2 = "Craft";

    if (!show) return null;

    return (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 z-20">
            <div className={`absolute top-4 right-4 sm:top-6 sm:right-6 z-20 transition-opacity duration-300 ${isExiting ? 'opacity-0' : 'opacity-100'}`}>
                <LanguageSelector 
                    selectedLang={language} 
                    onSelect={setLanguage} 
                    theme={currentTheme} 
                    neumorphicStyles={neumorphicStyles} 
                />
            </div>
            
            <h1 
                className="flex flex-col items-center font-['Montserrat'] font-bold mb-16 sm:mb-24" 
                style={{ color: currentTheme.textLight, lineHeight: 0.8 }}
            >
                <div className="flex">
                    {text1.split('').map((char, index) => (
                        <span
                            key={index}
                            ref={el => { if (letterRefs.current) letterRefs.current[index] = el; }}
                            className="inline-block text-[12vw] sm:text-[10vw] lg:text-[10rem]"
                            style={isExiting ? { animation: `fade-out-up 0.4s ease-in forwards ${index * 50}ms` } : {}}
                        >
                            {char}
                        </span>
                    ))}
                </div>
                <div className="flex">
                    {text2.split('').map((char, index) => (
                        <span
                            key={index + text1.length}
                            ref={el => { if (letterRefs.current) letterRefs.current[index + text1.length] = el; }}
                            className="inline-block text-[12vw] sm:text-[10vw] lg:text-[10rem]"
                            style={isExiting ? { animation: `fade-out-up 0.4s ease-in forwards ${(index + text1.length) * 50}ms` } : {}}
                        >
                            {char}
                        </span>
                    ))}
                </div>
            </h1>
            
            <div className={`transition-opacity duration-300 ${isExiting ? 'opacity-0' : 'opacity-100'}`}>
                    <button
                    onClick={onStart}
                    onMouseDown={() => setIsButtonPressed(true)}
                    onMouseUp={() => setIsButtonPressed(false)}
                    onMouseLeave={() => setIsButtonPressed(false)}
                    style={{ 
                        backgroundColor: currentTheme.medium, 
                        color: currentTheme.textLight,
                        boxShadow: isButtonPressed ? neumorphicStyles['--shadow-inner'] : neumorphicStyles['--shadow-outer'],
                        ...neumorphicStyles,
                    }}
                    className={`font-bold text-lg sm:text-xl py-4 px-8 sm:py-5 sm:px-12 md:py-6 md:px-16 rounded-[2rem] transition-all duration-200 ease-in-out ${!isButtonPressed && !isExiting ? 'animate-pulse-glow' : ''}`}
                    aria-label={t.welcomeHint}
                >
                    {t.welcomeHint}
                </button>
            </div>
        </div>
    );
};

export default memo(WelcomeScreen);
