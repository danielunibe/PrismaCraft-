
import React, { memo } from 'react';
import { Phase, Theme } from '../types';
import { shadeColor } from '../utils/colorUtils';

type BreadcrumbIcon = {
    id: string;
    icon: React.ReactNode;
    content: string;
};

type Props = {
    icons: BreadcrumbIcon[];
    phase: Phase;
    theme: Theme;
};

const BreadcrumbTrail: React.FC<Props> = ({ icons, phase, theme }) => {
    const isVisible = phase === Phase.Crafting || phase === Phase.Final;
    const baseColor = theme.dark;
    const shadowColorDark = shadeColor(baseColor, -20);
    const shadowColorLight = shadeColor(baseColor, 20);
    const neumorphicShadow = `4px 4px 8px ${shadowColorDark}, -4px -4px 8px ${shadowColorLight}`;

    return (
        <div className="h-20 sm:h-24 w-full flex items-center justify-center">
            <div className={`flex items-center space-x-2 sm:space-x-3 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                {icons.map((item, index) => (
                    <div 
                        key={item.id}
                        className={`relative group transition-all duration-500 ease-out transform ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
                        style={{transitionDelay: `${index * 100}ms`}}
                    >
                        <div 
                            className="h-12 w-12 sm:h-14 sm:w-14 rounded-xl flex items-center justify-center font-bold text-lg sm:text-xl"
                            style={{ 
                                backgroundColor: baseColor, 
                                color: theme.textLight,
                                boxShadow: neumorphicShadow,
                            }}
                        >
                            {item.icon}
                        </div>
                        <div 
                            className="absolute bottom-full mb-2 w-64 max-w-[80vw] p-2 text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none left-1/2 -translate-x-1/2 z-20"
                            style={{ backgroundColor: theme.dark, color: theme.textLight }}
                        >
                            {item.content}
                            <div 
                                className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-4"
                                style={{ borderTopColor: theme.dark }}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default memo(BreadcrumbTrail);
