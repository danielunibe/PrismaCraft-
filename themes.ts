import { Theme } from './types';

export const THEMES: Theme[] = [
  // 1. VISUAL - Cangrejo
  { 
    light: '#FFCDD2', 
    medium: '#E53935', 
    dark: '#C62828', 
    textLight: '#FFCDD2',
    textDark: '#5C0A0A',
    character: 'Cangrejo', 
    category: 'VISUAL',
    promptFocus: 'Genera descripciones detalladas para imágenes, logos o interfaces de usuario.',
    image: 'https://i.imgur.com/R3lPgy8.png',
    examples: ['Un logo minimalista para una cafetería espacial', 'Un paisaje cyberpunk bajo la lluvia neón', 'Diseño UI para una app de meditación']
  },
  // 2. TEXTO - Pollito
  { 
    light: '#F9E79F', 
    medium: '#D1A01F', 
    dark: '#9A7616', 
    textLight: '#F9E79F',
    textDark: '#423608',
    character: 'Pollito', 
    category: 'TEXTO',
    promptFocus: 'Escribe el artículo, la publicidad o el contenido escrito que necesitas.',
    image: 'https://i.imgur.com/gr28pPG.png',
    examples: ['Un post de LinkedIn viral sobre IA', 'Un poema sobre el olor a lluvia', 'Un correo de ventas persuasivo']
  },
  // 3. VIDEO - Guepardo
  { 
    light: '#FFE0B2', 
    medium: '#FF6F00', 
    dark: '#E65100', 
    textLight: '#FFE0B2',
    textDark: '#3E1A00',
    character: 'Guepardo', 
    category: 'VIDEO',
    promptFocus: 'Planea la filmación, el guion y el storyboard de una animación.',
    image: 'https://i.imgur.com/EPHdTVo.png',
    examples: ['Guion para un TikTok de 30s sobre cocina', 'Storyboard para un corto de terror', 'Intro cinemática para canal de YouTube']
  },
  // 4. AUDIO - Delfín
  { 
    light: '#BBDEFB', 
    medium: '#1E88E5', 
    dark: '#0D47A1', 
    textLight: '#BBDEFB',
    textDark: '#0D263D',
    character: 'Delfín', 
    category: 'AUDIO',
    promptFocus: 'Inventa música ambiental, una canción o efectos de sonido para tu proyecto.',
    image: 'https://i.imgur.com/NRjDzUL.png',
    examples: ['Una canción pop estilo años 80', 'Efectos de sonido para un videojuego retro', 'Meditación guiada con sonidos del mar']
  },
  // 5. CÓDIGO - Pulpo
  { 
    light: '#C5CAE9', 
    medium: '#3949AB', 
    dark: '#1A237E', 
    textLight: '#C5CAE9',
    textDark: '#0F1340',
    character: 'Pulpo', 
    category: 'CÓDIGO',
    promptFocus: 'Diseña la receta (instrucciones) para que una función se ejecute sola.',
    image: 'https://i.imgur.com/yYgO2hr.png',
    examples: ['Un componente React para un carrusel', 'Un script de Python para analizar datos', 'Consulta SQL para usuarios activos']
  },
  // 6. IDEAR - Cuervo
  { 
    light: '#FFCCBC', 
    medium: '#D84315', 
    dark: '#BF360C', 
    textLight: '#FFCCBC',
    textDark: '#4A2511',
    character: 'Cuervo', 
    category: 'IDEAR',
    promptFocus: 'Obtén ideas nuevas, frescas y originales para iniciar cualquier proyecto.',
    image: 'https://i.imgur.com/KLbXtEZ.png',
    examples: ['10 nombres para una marca de ropa ecológica', 'Ideas de regalos para un arquitecto', 'Temas para un podcast de tecnología']
  },
  // 7. NARRATIVA - Lobito
  { 
    light: '#DCEDC8', 
    medium: '#7CB342', 
    dark: '#33691E', 
    textLight: '#F1F8E9',
    textDark: '#1B5E20',
    character: 'Lobito', 
    category: 'NARRATIVA',
    promptFocus: 'Arma la historia, la trama o el arco de tu presentación o contenido.',
    image: 'https://i.imgur.com/riS5TZ4.png',
    examples: ['El viaje del héroe para un emprendedor', 'Una fábula moderna sobre la paciencia', 'Estructura narrativa para una charla TED']
  },
  // 8. EXPLORAR - Pavo real
  { 
    light: '#B2EBF2', 
    medium: '#0097A7', 
    dark: '#006064', 
    textLight: '#B2EBF2',
    textDark: '#00263E',
    character: 'Pavo real', 
    category: 'EXPLORAR',
    promptFocus: 'Busca opciones, caminos y alternativas diferentes a lo que ya tienes.',
    image: 'https://i.imgur.com/gC5LjTn.png',
    examples: ['Pros y contras del trabajo remoto', 'Diferentes enfoques para aprender un idioma', 'Destinos turísticos subestimados en Asia']
  },
  // 9. ANALIZAR - Zorro ártico
  { 
    light: '#E1BEE7', 
    medium: '#6A1B9A', 
    dark: '#4A148C', 
    textLight: '#D1C4E9',
    textDark: '#1A003A',
    character: 'Zorro ártico', 
    category: 'ANALIZAR',
    promptFocus: 'Revisa tu trabajo y evalúa si está funcionando bien para tu objetivo.',
    image: 'https://i.imgur.com/znwl4cj.png',
    examples: ['Analiza este texto buscando sesgos cognitivos', 'Critica este diseño web por accesibilidad', 'Evalúa la lógica de este argumento']
  },
  // 10. OPTIMIZAR - Hormiga
  { 
    light: '#E1BEE7', 
    medium: '#9C27B0', 
    dark: '#7B1FA2', 
    textLight: '#E1BEE7',
    textDark: '#38014A',
    character: 'Hormiga', 
    category: 'OPTIMIZAR',
    promptFocus: 'Mejora lo ya hecho, haciéndolo más rápido, limpio y eficiente.',
    image: 'https://i.imgur.com/cVUlTYu.png',
    examples: ['Reescribe este email para ser más breve', 'Optimiza este código para rendimiento', 'Haz este texto más amigable']
  },
  // 11. EXPLICAR - Elefante
  { 
    light: '#F8BBD0', 
    medium: '#E91E63', 
    dark: '#C2185B', 
    textLight: '#F3E5F5',
    textDark: '#4A0E2E',
    character: 'Elefante', 
    category: 'EXPLICAR',
    promptFocus: 'Aclara cualquier concepto o duda técnica de forma muy sencilla.',
    image: 'https://i.imgur.com/SysZxXU.png',
    examples: ['Explícame la computación cuántica como a un niño', '¿Cómo funciona un motor de combustión?', 'Diferencia entre virus y bacterias']
  },
];