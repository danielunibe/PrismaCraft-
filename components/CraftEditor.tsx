
import React, { useState, memo } from 'react';
import { CraftData, AnimationState, Theme } from '../types';
import { STRINGS, CRAFT_KEYS } from '../constants';
import CraftCard from './CraftCard';
import { shadeColor } from '../utils/colorUtils';

type Props = {
    craftData: CraftData;
    onDataChange: (field: keyof CraftData, value: string) => void;
    onGenerate: () => void;
    t: typeof STRINGS.en;
    animationState: AnimationState;
    theme: Theme;
};

const CraftEditor: React.FC<Props> = ({ craftData, onDataChange, onGenerate, t, animationState, theme }) => {
    const isEntering = animationState === 'craft-enter';
    const isExiting = animationState === 'craft-exit';

    const [isButtonPressed, setIsButtonPressed] = useState(false);

    const baseColor = theme.medium;
    const shadowColorDark = shadeColor(baseColor, -20);
    const shadowColorLight = shadeColor(baseColor, 20);
    const outerShadow = `12px 12px 24px ${shadowColorDark}, -12px -12px 24px ${shadowColorLight}`;
    const buttonShadow = `8px 8px 16px ${shadeColor(baseColor, -20)}, -8px -8px 16px ${shadeColor(baseColor, 20)}`;
    const buttonInnerShadow = `inset 8px 8px 16px ${shadeColor(baseColor, -20)}, inset -8px -8px 16px ${shadeColor(baseColor, 20)}`;
    
    const containerClasses = `
      absolute w-full max-w-4xl p-3 sm:p-6 rounded-[2rem]
      transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]
      ${isEntering ? 'animate-stretch-flex-in' : ''}
      ${isExiting ? 'transform scale-50 opacity-0' : 'transform scale-100 opacity-100'}
    `;

    return (
        <div 
            className={containerClasses}
            style={{ 
                backgroundColor: baseColor,
                boxShadow: outerShadow,
            }}
        >
            <div className="text-center mb-3 sm:mb-6">
                <h2 className="text-xl sm:text-3xl font-bold font-['Montserrat'] mb-1" style={{ color: theme.textLight }}>{t.craftPhaseTitle}</h2>
                 <div className="flex justify-center items-center space-x-4 sm:space-x-8 font-['Montserrat'] font-bold text-base sm:text-xl" style={{ color: theme.textLight, opacity: 0.5 }}>
                    <span>C</span>
                    <span>R</span>
                    <span>A</span>
                    <span>F</span>
                    <span>T</span>
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6">
                {CRAFT_KEYS.map((key, index) => (
                    <div 
                      key={key} 
                      className={`animate-fade-in-up`}
                      style={{ animationDelay: `${50 + index * 50}ms` }}
                    >
                         <CraftCard
                            label={t.craftLabels[key]}
                            description={t.craftDescriptions[key]}
                            value={craftData[key]}
                            onChange={(value) => onDataChange(key, value)}
                            theme={theme}
                        />
                    </div>
                ))}
            </div>

            <button
                onClick={onGenerate}
                onMouseDown={() => setIsButtonPressed(true)}
                onMouseUp={() => setIsButtonPressed(false)}
                onMouseLeave={() => setIsButtonPressed(false)}
                className="mt-5 sm:mt-8 w-full font-bold py-3 px-6 rounded-xl sm:rounded-2xl focus:outline-none transition-all duration-300 transform hover:scale-105"
                style={{ 
                    backgroundColor: baseColor,
                    color: theme.textLight,
                    boxShadow: isButtonPressed ? buttonInnerShadow : buttonShadow,
                }}
            >
                {t.generateButton}
            </button>
        </div>
    );
};

export default memo(CraftEditor);
