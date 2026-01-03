
import React, { useState, useMemo } from 'react';
import { Phase, Language } from './types';
import { CRAFT_KEYS } from './constants';
import { THEMES } from './themes';
import InitialIdeaCard from './components/InitialIdeaCard';
import CraftEditor from './components/CraftEditor';
import FinalPromptCard from './components/FinalPromptCard';
import BreadcrumbTrail from './components/BreadcrumbTrail';
import WelcomeScreen from './components/WelcomeScreen';
import SelectionCarousel from './components/SelectionCarousel';
import { LightbulbIcon, ChevronLeftIcon } from './components/icons';
import { usePromptWorkflow } from './hooks/usePromptWorkflow';
import { useCarousel } from './hooks/useCarousel';
import ErrorBoundary from './components/ErrorBoundary';
import { shadeColor } from './utils/colorUtils';

const App: React.FC = () => {
    // UI State
    const [showWelcome, setShowWelcome] = useState(true);
    const [isExitingWelcome, setIsExitingWelcome] = useState(false);
    const [isReturningHome, setIsReturningHome] = useState(false);
    const [isBackButtonPressed, setIsBackButtonPressed] = useState(false);
    const [language, setLanguage] = useState<Language>('es');

    // Business Logic Hooks
    const totalSlides = THEMES.length;
    const { 
        index: carouselIndex, 
        setIndex: setCarouselIndex, 
        dimensions,
        handleCarouselNav, 
        handleWheel,
        isDragging,
        dragOffset,
        dragHandlers
    } = useCarousel(totalSlides, Phase.Selection); // Actually phase is managed below, but we pass Selection assumption for wheel

    const currentTheme = THEMES[carouselIndex];

    const {
        t,
        phase,
        animationState,
        initialPrompt,
        craftData,
        finalPrompt,
        isLoading,
        error,
        handleGoToInitial,
        handleGoBack,
        handleAnalyze,
        handleCraftDataChange,
        handleGenerate,
        resetWorkflow,
    } = usePromptWorkflow(language);

    // Navigation Handlers
    const handleStart = () => {
        setIsExitingWelcome(true);
        setTimeout(() => setShowWelcome(false), 1000);
    };

    const handleGoHome = () => {
        setIsReturningHome(true);
        setTimeout(() => {
            setShowWelcome(true);
            setIsExitingWelcome(false);
            resetWorkflow();
            setIsReturningHome(false);
        }, 1000);
    };

    const handleBackPress = () => {
        phase === Phase.Selection ? handleGoHome() : handleGoBack();
    };

    // Memoized Styles
    const neumorphicStyles = useMemo(() => {
        const baseColor = currentTheme.medium;
        const shadowColorDark = shadeColor(baseColor, -20);
        const shadowColorLight = shadeColor(baseColor, 20);
        return {
            '--shadow-outer': `8px 8px 16px ${shadowColorDark}, -8px -8px 16px ${shadowColorLight}`,
            '--shadow-outer-pulse': `10px 10px 20px ${shadowColorDark}, -10px -10px 20px ${shadowColorLight}`,
            '--shadow-inner': `inset 8px 8px 16px ${shadowColorDark}, inset -8px -8px 16px ${shadowColorLight}`,
            '--shadow-inner-small': `inset 4px 4px 8px ${shadowColorDark}, inset -4px -4px 8px ${shadowColorLight}`,
        } as React.CSSProperties;
    }, [currentTheme]);

    const breadcrumbIcons = useMemo(() => {
        const icons: { id: string, icon: React.ReactNode, content: string }[] = [];
        if (phase > Phase.Selection) {
            icons.push({ id: 'idea', icon: <LightbulbIcon />, content: initialPrompt });
        }
        if (phase === Phase.Final) {
            CRAFT_KEYS.forEach(key => {
                icons.push({ id: key, icon: key.charAt(0).toUpperCase(), content: `${t.craftLabels[key]}: ${craftData[key]}` });
            });
        }
        return icons;
    }, [phase, initialPrompt, craftData, t.craftLabels]);

    const selectedIcon = useMemo(() => (
        <img src={currentTheme.image} alt={currentTheme.category} className="w-full h-full object-cover transform scale-125" />
    ), [currentTheme]);

    return (
        <div className={`min-h-screen w-full relative overflow-hidden transition-all duration-1000 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${!showWelcome ? 'bg-gray-50' : ''}`} 
             style={{ backgroundColor: showWelcome ? currentTheme.medium : 'rgb(249 250 251)' }}>
            
            <div 
              className={`absolute transition-all duration-1000 ease-[cubic-bezier(0.34,1.56,0.64,1)] sm:rounded-[2rem] overflow-hidden ${showWelcome ? 'inset-0' : 'inset-0 sm:inset-5'}`}
              style={{ backgroundColor: currentTheme.medium }}
            >
                <WelcomeScreen 
                    show={showWelcome}
                    isExiting={isExitingWelcome}
                    onStart={handleStart}
                    currentTheme={currentTheme}
                    language={language}
                    setLanguage={setLanguage}
                    neumorphicStyles={neumorphicStyles}
                    t={t}
                />
                
                <div className={`w-full h-full flex flex-col transition-opacity duration-500 relative z-10 ${showWelcome || isReturningHome ? 'opacity-0 pointer-events-none' : 'opacity-100 delay-500'}`}>
                    {/* Header */}
                    <header className="relative z-30 flex-shrink-0 flex items-center justify-between px-6 py-4 pt-8 sm:pt-6">
                        <button
                            onClick={handleBackPress}
                            onMouseDown={() => setIsBackButtonPressed(true)}
                            onMouseUp={() => setIsBackButtonPressed(false)}
                            onMouseLeave={() => setIsBackButtonPressed(false)}
                            className="p-3 rounded-full transition-all duration-200 ease-in-out"
                            style={{ backgroundColor: currentTheme.medium, boxShadow: isBackButtonPressed ? neumorphicStyles['--shadow-inner'] : neumorphicStyles['--shadow-outer'] }}
                            aria-label="Go back"
                        >
                            <ChevronLeftIcon className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: currentTheme.textLight }} />
                        </button>
                        <h1 className="font-['Montserrat'] font-bold text-lg sm:text-2xl tracking-tight" style={{ color: currentTheme.textLight }}>{t.appName}</h1>
                        <div className="w-11 h-11 sm:w-12 sm:h-12"></div>
                    </header>

                    {/* Main Content Area */}
                    <div className="relative flex-grow w-full overflow-hidden">
                        
                        {/* Phase 1: Selection */}
                        <div className={`absolute inset-0 flex flex-col transition-all duration-500 ease-in-out ${phase === Phase.Selection ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-95 pointer-events-none z-0'}`}>
                             <SelectionCarousel 
                                currentIndex={carouselIndex}
                                setIndex={setCarouselIndex}
                                currentTheme={currentTheme}
                                dimensions={dimensions}
                                dragOffset={dragOffset}
                                isDragging={isDragging}
                                dragHandlers={dragHandlers}
                                onNav={handleCarouselNav}
                                handleWheel={handleWheel}
                                onSelect={handleGoToInitial}
                                t={t}
                                neumorphicStyles={neumorphicStyles}
                             />
                        </div>

                        {/* Phase 2, 3, 4: Workflow */}
                        <div className={`absolute inset-0 flex flex-col pt-4 sm:pt-8 transition-all duration-500 ease-in-out ${phase > Phase.Selection ? 'opacity-100 scale-100 z-20' : 'opacity-0 scale-105 pointer-events-none z-0'}`}>
                            <BreadcrumbTrail icons={breadcrumbIcons} phase={phase} theme={currentTheme} />
                            <main className="flex-grow w-full flex items-center justify-center relative px-4 pb-8 sm:px-6 sm:pb-12 min-h-0 overflow-y-auto">
                                <ErrorBoundary>
                                    <div className={`transition-all duration-700 ease-in-out w-full max-w-2xl ${phase === Phase.Initial ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                                        <InitialIdeaCard
                                            onAnalyze={handleAnalyze}
                                            isLoading={isLoading}
                                            t={t}
                                            isEntering={animationState === 'initial-enter'}
                                            isExiting={animationState === 'initial-exit'}
                                            theme={currentTheme}
                                            icon={selectedIcon}
                                        />
                                    </div>
                                    {phase === Phase.Crafting && (
                                        <CraftEditor
                                            craftData={craftData}
                                            onDataChange={handleCraftDataChange}
                                            onGenerate={handleGenerate}
                                            t={t}
                                            animationState={animationState}
                                            theme={currentTheme}
                                        />
                                    )}
                                    {phase === Phase.Final && (
                                        <FinalPromptCard
                                            prompt={finalPrompt}
                                            t={t}
                                            isEntering={animationState === 'final-enter'}
                                            theme={currentTheme}
                                        />
                                    )}
                                    {error && <div className="absolute bottom-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">{error}</div>}
                                </ErrorBoundary>
                            </main>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
