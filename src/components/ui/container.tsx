import type { ReactNode } from 'react';

type ContainerProps = {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'section' | 'article' | 'main' | 'header' | 'footer';
};

export function Container({
  children,
  className = '',
  as: Component = 'div',
}: ContainerProps) {
  const classes = ['mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8', className]
    .filter(Boolean)
    .join(' ');

  return <Component className={classes}>{children}</Component>;
}
