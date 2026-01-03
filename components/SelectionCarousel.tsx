
import React, { memo, useState } from 'react';
import { THEMES } from '../themes';
import { Theme } from '../types';
import { ChevronLeftIcon, ChevronRightIcon } from './icons';
import { shadeColor } from '../utils/colorUtils';

type Props = {
    currentIndex: number;
    setIndex: (i: number) => void;
    currentTheme: Theme;
    dimensions: any;
    dragOffset: number;
    isDragging: boolean;
    dragHandlers: any;
    onNav: (direction: 'next' | 'prev') => void;
    onSelect: () => void;
    handleWheel: (e: React.WheelEvent) => void;
    t: any;
    neumorphicStyles: any;
};

const SelectionCarousel: React.FC<Props> = ({
    currentIndex,
    setIndex,
    currentTheme,
    dimensions,
    dragOffset,
    isDragging,
    dragHandlers,
    onNav,
    onSelect,
    handleWheel,
    t,
    neumorphicStyles
}) => {
    const [nextButtonPressed, setNextButtonPressed] = useState(false);

    return (
        <div 
            className="absolute inset-0 flex flex-col transition-all duration-500 ease-in-out opacity-100 scale-100 z-10"
        >
            <div 
                className="relative w-full flex-grow flex items-center justify-center overflow-hidden min-h-0 py-2 sm:py-6"
                onWheel={handleWheel}
            >
                <button onClick={() => onNav('prev')} className="absolute left-1 sm:left-4 z-20 p-2 rounded-full transition-transform hover:scale-110 active:scale-95 opacity-60 hover:opacity-100 backdrop-blur-sm sm:backdrop-blur-none" aria-label="Previous">
                    <ChevronLeftIcon className="w-6 h-6 sm:w-10 sm:h-10" style={{ color: currentTheme.textLight }} />
                </button>

                <div 
                    className="w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing"
                    {...dragHandlers}
                >
                    <div className="w-full" style={{ height: `${dimensions.cardHeight * dimensions.scale}px` }}>
                        <div
                            className="flex h-full items-center" 
                            style={{
                                gap: `${dimensions.gap}px`,
                                transition: isDragging ? 'none' : 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                                transform: `translateX(calc(50% - ${dimensions.cardWidth / 2}px - ${currentIndex * (dimensions.cardWidth + dimensions.gap)}px + ${dragOffset}px))`
                            }}
                        >
                            {THEMES.map((theme, i) => {
                                const isCenter = currentIndex === i;
                                const cardBackgroundColor = isCenter ? theme.medium : currentTheme.medium;
                                const cardTextColor = isCenter ? theme.textLight : currentTheme.textLight;
                                
                                return (
                                    <div 
                                        key={i} 
                                        className="flex-shrink-0 flex items-center justify-center p-2 transition-transform duration-300"
                                        style={{ 
                                            width: `${dimensions.cardWidth}px`,
                                            height: `${dimensions.cardHeight}px`,
                                            transform: isCenter ? `scale(${dimensions.scale})` : 'scale(1)',
                                            opacity: isCenter ? 1 : 0.7,
                                        }}
                                    >
                                    <div 
                                        className={`relative w-full h-full text-center transition-all duration-500 ease-in-out transition-shadow duration-150 rounded-[2rem] sm:rounded-[3rem] overflow-hidden`}
                                        style={{ 
                                            backgroundColor: cardBackgroundColor, 
                                            color: cardTextColor,
                                            boxShadow: isCenter ? `8px 8px 16px ${shadeColor(cardBackgroundColor, -20)}, -8px -8px 16px ${shadeColor(cardBackgroundColor, 20)}` : 'none',
                                        }}
                                    >
                                        {isCenter ? (
                                            <div className={`absolute inset-0 flex flex-col items-center p-4 sm:p-6 transition-opacity duration-500 animate-fade-in-up h-full`}>
                                                <h3 className="font-['Montserrat'] font-bold text-xl sm:text-2xl mt-1 flex-shrink-0 tracking-wide" style={{ color: theme.textLight }}>
                                                    {theme.category}
                                                </h3>
                                                
                                                {/* Image Container - Drastically reduced for mobile to fit text */}
                                                <div 
                                                    className="
                                                        w-full aspect-square max-w-[10rem] sm:max-w-[14rem] lg:max-w-[18rem]
                                                        rounded-[1.5rem] flex items-center justify-center flex-shrink-0 my-3 sm:my-5 overflow-hidden shadow-inner
                                                    " 
                                                    style={{ backgroundColor: theme.light }}
                                                >
                                                    <img 
                                                        src={theme.image} 
                                                        alt={theme.character} 
                                                        className="w-full h-full object-cover object-center"
                                                        style={{ transform: 'scale(1.15)' }}
                                                    />
                                                </div>
                                                
                                                <div className="w-full flex flex-col items-center flex-grow min-h-0 justify-between">
                                                    <div className="flex-grow flex items-center justify-center w-full px-1 overflow-hidden">
                                                        <p className="font-sans font-medium text-sm sm:text-base text-center leading-snug line-clamp-4">{theme.promptFocus}</p>
                                                    </div>

                                                    <div className="flex-shrink-0 pt-3 pb-1">
                                                        <button
                                                            onClick={onSelect}
                                                            onMouseDown={() => setNextButtonPressed(true)}
                                                            onMouseUp={() => setNextButtonPressed(false)}
                                                            onMouseLeave={() => setNextButtonPressed(false)}
                                                            style={{
                                                                backgroundColor: currentTheme.medium,
                                                                color: currentTheme.textLight,
                                                                boxShadow: nextButtonPressed ? neumorphicStyles['--shadow-inner'] : neumorphicStyles['--shadow-outer'],
                                                            }}
                                                            className="font-bold font-['Montserrat'] text-sm sm:text-base py-3 px-8 sm:px-10 rounded-xl transition-all duration-150 transform hover:scale-105 active:scale-95"
                                                        >
                                                            {t.nextButton}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="absolute inset-0 flex items-center justify-center opacity-60">
                                                <div 
                                                    className="
                                                        w-[70%] aspect-square
                                                        rounded-[2rem] flex items-center justify-center overflow-hidden grayscale contrast-125
                                                    " 
                                                    style={{ backgroundColor: theme.light }}
                                                >
                                                     <img 
                                                        src={theme.image} 
                                                        alt={theme.character} 
                                                        className="w-full h-full object-cover opacity-60 object-center"
                                                        style={{ transform: 'scale(1.15)' }}
                                                    />
                                                </div>
                                            </div>
                                        )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                 <button onClick={() => onNav('next')} className="absolute right-1 sm:right-4 z-20 p-2 rounded-full transition-transform hover:scale-110 active:scale-95 opacity-60 hover:opacity-100 backdrop-blur-sm sm:backdrop-blur-none" aria-label="Next">
                    <ChevronRightIcon className="w-6 h-6 sm:w-10 sm:h-10" style={{ color: currentTheme.textLight }} />
                </button>
            </div>

            {/* Pagination */}
            <div className="flex-shrink-0 w-full flex justify-center pb-6 sm:pb-8 pt-0 z-20 pointer-events-none">
                <div 
                    className="flex items-center space-x-2 sm:space-x-3 px-4 sm:px-5 py-2 rounded-full pointer-events-auto"
                    style={{ 
                        backgroundColor: currentTheme.medium,
                        boxShadow: neumorphicStyles['--shadow-inner'],
                    }}
                >
                    {THEMES.map((_, i) => {
                        const isActive = currentIndex === i;
                        return (
                            <div 
                                key={i}
                                className={`rounded-full transition-all duration-300 cursor-pointer ${isActive ? 'w-2.5 h-2.5 sm:w-4 sm:h-4' : 'w-1.5 h-1.5 sm:w-2 sm:h-2'}`}
                                style={{ 
                                    backgroundColor: isActive ? currentTheme.textLight : currentTheme.dark,
                                    opacity: isActive ? 1 : 0.4,
                                    boxShadow: isActive 
                                        ? `0 0 8px ${currentTheme.textLight}` 
                                        : 'none'
                                }}
                                onClick={() => setIndex(i)}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default memo(SelectionCarousel);
