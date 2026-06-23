import type { HTMLAttributes, ReactNode } from 'react';

type CardProps = {
  children: ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
} & HTMLAttributes<HTMLDivElement>;

const paddingStyles = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export function Card({
  children,
  className = '',
  padding = 'md',
  ...rest
}: CardProps) {
  const classes = [
    'rounded-lg border border-[var(--color-neutral-200)] bg-white shadow-sm',
    paddingStyles[padding],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
}
