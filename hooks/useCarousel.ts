
import { useState, useEffect, useRef, useCallback } from 'react';
import { Phase } from '../types';

type Dimensions = {
    cardWidth: number;
    cardHeight: number;
    gap: number;
    scale: number;
};

const getCarouselDimensions = (): Dimensions => {
    if (typeof window !== 'undefined') {
        const width = window.innerWidth;
        const height = window.innerHeight;
        
        if (width < 768) { // Mobile
            // Calculate height based on screen height to ensure fit, maxing out at a reasonable aspect ratio
            const calculatedHeight = Math.min(height * 0.65, width * 1.4); 
            return { 
                cardWidth: width * 0.75, 
                cardHeight: calculatedHeight, 
                gap: 15, 
                scale: 1.05 // Reduced scale effect to prevent overflow when active
            };
        } else if (width < 1024) { // Tablet
            return { cardWidth: 280, cardHeight: 450, gap: 20, scale: 1.1 };
        }
    }
    // Desktop - slightly more compact than before
    return { cardWidth: 380, cardHeight: 600, gap: 40, scale: 1.15 };
};

export const useCarousel = (totalSlides: number, phase: Phase) => {
    const [index, setIndex] = useState(0);
    const [dimensions, setDimensions] = useState<Dimensions>(getCarouselDimensions());
    
    // Drag/Swipe State
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [dragOffset, setDragOffset] = useState(0);
    
    // Throttling
    const lastScrollTime = useRef(0);

    // Resize Listener
    useEffect(() => {
        const handleResize = () => setDimensions(getCarouselDimensions());
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleCarouselNav = useCallback((direction: 'next' | 'prev') => {
        setIndex(prev => {
            if (direction === 'next') return (prev + 1) % totalSlides;
            return (prev - 1 + totalSlides) % totalSlides;
        });
    }, [totalSlides]);

    // Wheel Handler
    const handleWheel = useCallback((e: React.WheelEvent) => {
        if (phase !== Phase.Selection) return;
        const now = Date.now();
        if (now - lastScrollTime.current < 500) return;

        if (e.deltaY > 30 || e.deltaX > 30) {
            handleCarouselNav('next');
            lastScrollTime.current = now;
        } else if (e.deltaY < -30 || e.deltaX < -30) {
            handleCarouselNav('prev');
            lastScrollTime.current = now;
        }
    }, [phase, handleCarouselNav]);

    // Drag Handlers
    const getClientX = (e: React.MouseEvent | React.TouchEvent): number => {
        return 'touches' in e.nativeEvent ? e.nativeEvent.touches[0].clientX : e.nativeEvent.clientX;
    };

    const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
        if (!('touches' in e.nativeEvent)) e.preventDefault();
        setIsDragging(true);
        setStartX(getClientX(e));
        setDragOffset(0);
    };

    const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
        if (!isDragging) return;
        setDragOffset(getClientX(e) - startX);
    };

    const handleDragEnd = () => {
        if (!isDragging) return;
        setIsDragging(false);
        const swipeThreshold = 50;
        if (dragOffset < -swipeThreshold) handleCarouselNav('next');
        else if (dragOffset > swipeThreshold) handleCarouselNav('prev');
        setDragOffset(0);
    };

    return {
        index,
        setIndex,
        dimensions,
        isDragging,
        dragOffset,
        handleCarouselNav,
        handleWheel,
        dragHandlers: {
            onMouseDown: handleDragStart,
            onTouchStart: handleDragStart,
            onMouseMove: handleDragMove,
            onTouchMove: handleDragMove,
            onMouseUp: handleDragEnd,
            onMouseLeave: handleDragEnd,
            onTouchEnd: handleDragEnd
        }
    };
};
