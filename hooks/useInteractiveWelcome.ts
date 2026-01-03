
import { useRef, useEffect } from 'react';

/**
 * Hook personalizado para manejar el efecto de animación interactiva del texto.
 * Encapsula la lógica de `mousemove` para mantener el componente App más limpio.
 * @param enabled - Booleano para activar o desactivar el listener de eventos.
 * @returns Un objeto que contiene `letterRefs` para ser adjuntado a los elementos del DOM.
 */
export const useInteractiveWelcome = (enabled: boolean) => {
    const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);

    useEffect(() => {
        if (!enabled) return;

        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            letterRefs.current.forEach(ref => {
                if (!ref) return;
                const { left, top, width, height } = ref.getBoundingClientRect();
                const centerX = left + width / 2;
                const centerY = top + height / 2;
                const distance = Math.sqrt(Math.pow(clientX - centerX, 2) + Math.pow(clientY - centerY, 2));
                const maxDistance = 150;
                if (distance < maxDistance) {
                    const scaleFactor = (1 - distance / maxDistance);
                    const scaleX = 1 + scaleFactor * 0.6;
                    const scaleY = 1 - scaleFactor * 0.5;
                    ref.style.transform = `scale(${scaleX}, ${scaleY})`;
                } else {
                    ref.style.transform = 'scale(1, 1)';
                }
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [enabled]);

    return { letterRefs };
};
