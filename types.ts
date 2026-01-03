
import { STRINGS } from './constants';

export enum Phase {
  Selection,
  Initial,
  Crafting,
  Final,
}

export type CraftData = {
  context: string;
  role: string;
  action: string;
  format: string;
  target: string;
};

export type Language = 'en' | 'es';

export type AnimationState = 
  | 'initial-enter'
  | 'initial-exit'
  | 'craft-enter'
  | 'craft-exit'
  | 'final-enter';

export type Theme = {
  light: string;
  medium: string;
  dark: string;
  textLight: string;
  textDark: string;
  character: string;
  category: string;
  promptFocus: string;
  image: string;
  examples: string[];
};

// Helper type to get the keys of the strings object, for strict typing of t() function
export type TranslationKeys = keyof typeof STRINGS.en;
