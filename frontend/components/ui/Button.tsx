import { ButtonHTMLAttributes, FC } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import clsx from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'obsidian' | 'neon' | 'shimmer' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showShimmer?: boolean;
  href?: string;
}

export const Button: FC<ButtonProps> = ({ 
  className, 
  variant = 'primary', 
  size = 'md', 
  showShimmer = true,
  href,
  children,
  ...props 
}) => {
  const variants = {
    primary: 'btn-obsidian-primary',
    obsidian: 'btn-obsidian',
    neon: 'btn-neon',
    shimmer: 'btn-premium',
    outline: 'btn-outline-premium',
    ghost: 'bg-transparent text-white/60 hover:text-white hover:bg-white/5 border-transparent transition-all rounded-full'
  };

  const sizes = {
    sm: 'px-4 py-2 text-[10px]',
    md: 'px-6 py-3.5 text-xs',
    lg: 'px-8 py-4.5 text-sm',
    xl: 'px-10 py-5.5 text-base'
  };

  const MotionLink = motion(Link);
  const isPremium = ['primary', 'obsidian', 'neon', 'shimmer'].includes(variant);
  
  const content = (
    <>
      <span className="btn-border-beam" />
      <span className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      {showShimmer && isPremium && (
        <span className="shimmer-sweep" />
      )}
      <span className="relative z-10 flex items-center gap-2 transition-transform duration-500 group-hover:scale-105 will-change-transform">
        {children}
      </span>
    </>
  );
  
  const commonProps = {
    whileHover: { 
      scale: 1.05, 
      y: -4,
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }
    },
    whileTap: { scale: 0.94 },
    className: clsx(
      variants[variant as keyof typeof variants],
      !isPremium && sizes[size as keyof typeof sizes],
      'group relative overflow-hidden flex items-center justify-center disabled:opacity-50 select-none cursor-pointer',
      className
    )
  };

  if (href) {
    return (
      <MotionLink href={href} {...commonProps}>
        {content}
      </MotionLink>
    );
  }

  return (
    <motion.button {...commonProps} {...props as any}>
      {content}
    </motion.button>
  );
};
