

import { CraftData } from './types';

export const STRINGS = {
  en: {
    appName: "PrismaCraft",
    initialPhaseTitle: "What's your brilliant idea?",
    initialPhaseDescription: "Just share a thought or concept, and I'll help break it down into the CRAFT components for you to shape and perfect.",
    initialPhasePlaceholder: "e.g., 'Write a short story about a robot who discovers music'",
    analyzeButton: "Analyze",
    analyzingButton: "Analyzing...",
    craftPhaseTitle: "Refine each component",
    generateButton: "Generate Final Prompt",
    finalPhaseTitle: "Your masterpiece prompt",
    copyButton: "Copy",
    copiedButton: "Copied!",
    craftLabels: {
      context: "Context",
      role: "Role",
      action: "Action",
      format: "Format",
      target: "Target",
    },
    craftDescriptions: {
        context: "Background info & constraints",
        role: "The AI's persona",
        action: "What the AI should do",
        format: "The output structure",
        target: "The intended audience",
    },
    error: "An error occurred. Please try again.",
    welcomeHint: "Click to Start",
    nextButton: "Next",
    backButton: "Back",
  },
  es: {
    appName: "PrismaCraft",
    initialPhaseTitle: "¿Cuál es tu brillante idea?",
    initialPhaseDescription: "Comparte una idea o concepto, y te ayudaré a descomponerla en los componentes CRAFT para que la moldees y perfecciones.",
    initialPhasePlaceholder: "Ej: 'Escribe una historia corta sobre un robot que descubre la música'",
    analyzeButton: "Analizar",
    analyzingButton: "Analizando...",
    craftPhaseTitle: "Refina cada componente",
    generateButton: "Generar Prompt Final",
    finalPhaseTitle: "Tu prompt maestro",
    copyButton: "Copiar",
    copiedButton: "¡Copiado!",
    craftLabels: {
      context: "Contexto",
      role: "Rol",
      action: "Acción",
      format: "Formato",
      target: "Objetivo",
    },
     craftDescriptions: {
        context: "Info de fondo y restricciones (Background info & constraints)",
        role: "La persona de la IA (The AI's persona)",
        action: "Qué debe hacer la IA (What the AI should do)",
        format: "La estructura de salida (The output structure)",
        target: "La audiencia deseada (The intended audience)",
    },
    error: "Ocurrió un error. Por favor, inténtalo de nuevo.",
    welcomeHint: "Click para Empezar",
    nextButton: "Siguiente",
    backButton: "Atrás",
  },
};

export const INITIAL_CRAFT_DATA: CraftData = {
  context: '',
  role: '',
  action: '',
  format: '',
  target: '',
};

export const CRAFT_KEYS: (keyof CraftData)[] = ['context', 'role', 'action', 'format', 'target'];