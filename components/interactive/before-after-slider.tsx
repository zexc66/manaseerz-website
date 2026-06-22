'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

type BeforeAfterSliderProps = {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  title?: string;
  className?: string;
};

export function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = 'Before',
  afterLabel = 'After',
  title,
  className = '',
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setPosition(percent);
  }, []);

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  useEffect(() => {
    if (!isDragging) return;
    const onMouseMove = (e: MouseEvent) => handleMove(e.clientX);
    const onTouchMove = (e: TouchEvent) => handleMove(e.touches[0].clientX);
    const onEnd = () => setIsDragging(false);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('mouseup', onEnd);
    window.addEventListener('touchend', onEnd);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('mouseup', onEnd);
      window.removeEventListener('touchend', onEnd);
    };
  }, [isDragging, handleMove]);

  return (
    <div className={`relative w-full ${className}`}>
      {title && (
        <h3 className="text-lg font-display font-semibold text-[var(--color-text-primary)] mb-3">
          {title}
        </h3>
      )}
      <div
        ref={containerRef}
        className="relative w-full aspect-[4/3] rounded-xl overflow-hidden cursor-ew-resize select-none border border-[var(--color-surface-700)] bg-[var(--color-surface-900)]"
        onMouseDown={handleMouseDown}
        onTouchStart={(e) => {
          setIsDragging(true);
          handleMove(e.touches[0].clientX);
        }}
      >
        <img
          src={afterImage}
          alt={afterLabel}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          draggable={false}
          loading="lazy"
        />

        <div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={{ width: `${position}%` }}
        >
          <img
            src={beforeImage}
            alt={beforeLabel}
            className="absolute inset-0 h-full w-full max-w-none object-cover"
            style={{ width: containerRef.current?.offsetWidth ?? '100%' }}
            draggable={false}
            loading="lazy"
          />
        </div>

        <div className="absolute top-3 left-3 px-2.5 py-1 bg-[var(--color-black-pure)]/80 backdrop-blur-sm rounded-md text-[10px] uppercase tracking-wider text-[var(--color-text-secondary)] font-medium pointer-events-none">
          {beforeLabel}
        </div>
        <div className="absolute top-3 right-3 px-2.5 py-1 bg-[var(--color-gold-primary)] rounded-md text-[10px] uppercase tracking-wider text-[var(--color-black-pure)] font-semibold pointer-events-none">
          {afterLabel}
        </div>

        <div
          className="absolute top-0 bottom-0 w-0.5 bg-[var(--color-gold-primary)] shadow-[0_0_12px_rgba(212,175,55,0.6)] pointer-events-none"
          style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[var(--color-gold-primary)] flex items-center justify-center shadow-lg">
            <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-[var(--color-black-pure)]">
              <path d="M9 6L3 12L9 18M15 6L21 12L15 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>

      {!reduceMotion && (
        <p className="mt-2 text-xs text-[var(--color-text-muted)] text-center">
          Drag to compare
        </p>
      )}
    </div>
  );
}
