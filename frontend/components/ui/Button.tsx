import { ButtonHTMLAttributes, FC } from 'react';
import clsx from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: FC<ButtonProps> = ({ 
  className, 
  variant = 'primary', 
  size = 'md', 
  ...props 
}) => {
  const variants = {
    primary: 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white border-transparent hover:shadow-[0_0_25px_rgba(37,99,235,0.4)]',
    secondary: 'bg-white/[0.05] text-white border-white/10 backdrop-blur-md hover:bg-white/[0.1] hover:border-white/30',
    outline: 'bg-transparent text-white border-white/20 hover:bg-white hover:text-black hover:border-white'
  };

  const sizes = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-8 py-3 text-sm',
    lg: 'px-10 py-4 text-base'
  };

  return (
    <button
      className={clsx(
        'relative inline-flex items-center justify-center rounded-full font-bold transition-all duration-300 active:scale-95 disabled:opacity-50 overflow-hidden border',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
};
