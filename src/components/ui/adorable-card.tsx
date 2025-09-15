import React from 'react';
import { cn } from '@/lib/utils';

interface AdorableCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'magical' | 'soft' | 'glow';
  children: React.ReactNode;
}

const AdorableCard = React.forwardRef<HTMLDivElement, AdorableCardProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    const variants = {
      default: "bg-card shadow-soft hover:shadow-medium transition-all duration-300 hover-lift",
      magical: "gradient-card shadow-magical hover:shadow-glow transition-all duration-300 hover-lift border border-primary/10",
      soft: "bg-card/80 backdrop-blur-sm shadow-soft hover:shadow-medium transition-all duration-300 hover-lift border border-border/50",
      glow: "bg-card shadow-glow animate-glow border border-primary/20"
    };

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-2xl p-6",
          variants[variant],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

AdorableCard.displayName = "AdorableCard";

export { AdorableCard };