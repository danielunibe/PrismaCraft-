

import { useState, useCallback, useMemo } from 'react';
import { Phase, CraftData, Language, AnimationState } from '../types';
import { STRINGS, INITIAL_CRAFT_DATA } from '../constants';
import { decomposePrompt } from '../services/geminiService';

/**
 * Hook personalizado que gestiona todo el estado y la lógica del flujo de la aplicación.
 * Centraliza el manejo de fases, datos, carga, errores y las acciones del usuario.
 * @param language - El idioma actual de la aplicación.
 * @returns Un objeto con el estado de la aplicación y los manejadores de eventos.
 */
export const usePromptWorkflow = (language: Language) => {
    const t = useMemo(() => STRINGS[language], [language]);

    const [phase, setPhase] = useState<Phase>(Phase.Selection);
    const [animationState, setAnimationState] = useState<AnimationState>('initial-enter');
    
    const [initialPrompt, setInitialPrompt] = useState('');
    const [craftData, setCraftData] = useState<CraftData>(INITIAL_CRAFT_DATA);
    const [finalPrompt, setFinalPrompt] = useState('');
    
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleGoToInitial = useCallback(() => {
        setPhase(Phase.Initial);
        setAnimationState('initial-enter');
    }, []);

    const handleAnalyze = useCallback(async (prompt: string) => {
        setIsLoading(true);
        setError(null);
        setInitialPrompt(prompt);
        const result = await decomposePrompt(prompt);
        setIsLoading(false);

        if (result) {
            setCraftData(result);
            setAnimationState('initial-exit');
            setTimeout(() => {
                setPhase(Phase.Crafting);
                setAnimationState('craft-enter');
            }, 750);
        } else {
            setError(t.error);
        }
    }, [t.error]);
    
    const handleCraftDataChange = useCallback((field: keyof CraftData, value: string) => {
        setCraftData(prev => ({ ...prev, [field]: value }));
    }, []);

    const handleGenerate = useCallback(() => {
        const generatedPrompt = `Context: ${craftData.context}\nRole: ${craftData.role}\nAction: ${craftData.action}\nFormat: ${craftData.format}\nTarget: ${craftData.target}`;
        setFinalPrompt(generatedPrompt);
        setAnimationState('craft-exit');
        setTimeout(() => {
            setPhase(Phase.Final);
            setAnimationState('final-enter');
        }, 1200); 
    }, [craftData]);

    const resetWorkflow = useCallback(() => {
        setPhase(Phase.Selection);
        setAnimationState('initial-enter');
        setInitialPrompt('');
        setCraftData(INITIAL_CRAFT_DATA);
        setFinalPrompt('');
        setIsLoading(false);
        setError(null);
    }, []);

    const handleGoBack = useCallback(() => {
        if (phase === Phase.Final) {
            setFinalPrompt('');
            setPhase(Phase.Crafting);
            setAnimationState('craft-enter');
        } else if (phase === Phase.Crafting) {
            setAnimationState('craft-exit');
            setTimeout(() => {
                setPhase(Phase.Initial);
                setAnimationState('initial-enter');
            }, 750);
        } else if (phase === Phase.Initial) {
            setAnimationState('initial-exit');
            setTimeout(() => {
                resetWorkflow();
            }, 750);
        }
    }, [phase, resetWorkflow]);

    return {
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
    };
};