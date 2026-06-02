'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function Logo({ className, showText = true, size = 'md' }: LogoProps) {
  const sizes = {
    sm: { width: 120, height: 40 },
    md: { width: 180, height: 60 },
    lg: { width: 240, height: 80 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`flex items-center gap-3 ${className}`}
    >
      {/* Logo Image */}
      <div className="relative flex-shrink-0">
        <motion.div
          whileHover={{ scale: 1.05, rotate: 2 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <Image
            src="/logo.png"
            alt="Manaseerz Electric Logo"
            width={sizes[size].width}
            height={sizes[size].height}
            priority
            className="object-contain"
            onError={(e) => {
              // Fallback if logo not found
              console.error('Logo failed to load:', e);
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const fallback = target.parentElement?.querySelector('.logo-fallback');
              if (fallback) {
                (fallback as HTMLElement).style.display = 'flex';
              }
            }}
            onLoad={() => {
              console.log('Logo loaded successfully');
            }}
          />

          {/* Fallback if image doesn't load */}
          <div className="logo-fallback hidden items-center justify-center bg-gradient-to-br from-[var(--color-gold-primary)] to-[var(--color-gold-light)] rounded-xl p-3">
            <span className="font-display font-bold text-2xl text-[var(--color-black-pure)]">
              M
            </span>
          </div>
        </motion.div>

        {/* Glow effect on hover */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 0.2 }}
          className="absolute inset-0 bg-[var(--color-gold-primary)] rounded-xl blur-xl -z-10"
        />
      </div>

      {/* Logo Text */}
      {showText && (
        <div className="flex flex-col">
          <motion.h1
            whileHover={{ x: 2 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-bold text-[var(--text-xl)] text-[var(--color-text-primary)] tracking-tight"
          >
            Manaseerz
          </motion.h1>
          <motion.p
            whileHover={{ x: 2 }}
            transition={{ duration: 0.2, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="text-xs font-medium text-[var(--color-gold-primary)] uppercase tracking-[0.2em]"
          >
            Electric
          </motion.p>
        </div>
      )}
    </motion.div>
  );
}

export function LogoIcon({ className }: { className?: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.1, rotate: 5 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className={`relative flex-shrink-0 ${className}`}
    >
      <Image
        src="/logo.png"
        alt="Manaseerz Electric Logo"
        width={48}
        height={48}
        priority
        className="object-contain"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.style.display = 'none';
          const fallback = target.parentElement?.querySelector('.logo-fallback');
          if (fallback) {
            (fallback as HTMLElement).style.display = 'flex';
          }
        }}
      />

      <div className="logo-fallback hidden items-center justify-center w-12 h-12 bg-gradient-to-br from-[var(--color-gold-primary)] to-[var(--color-gold-light)] rounded-xl">
        <span className="font-display font-bold text-xl text-[var(--color-black-pure)]">
          M
        </span>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 0.2 }}
        className="absolute inset-0 bg-[var(--color-gold-primary)] rounded-xl blur-lg -z-10"
      />
    </motion.div>
  );
}