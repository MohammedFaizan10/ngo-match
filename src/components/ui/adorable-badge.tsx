import React from 'react';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 animate-scale-in",
  {
    variants: {
      variant: {
        default: "bg-primary-light text-primary border border-primary/20 hover:bg-primary hover:text-primary-foreground shadow-soft hover:shadow-medium",
        secondary: "bg-secondary text-secondary-foreground border border-border/20 hover:bg-secondary/80 shadow-soft",
        destructive: "bg-destructive/10 text-destructive border border-destructive/20 hover:bg-destructive hover:text-destructive-foreground shadow-soft",
        outline: "text-foreground border border-border/40 hover:bg-accent hover:text-accent-foreground shadow-soft",
        success: "bg-success-light text-success border border-success/20 hover:bg-success hover:text-success-foreground shadow-soft",
        warning: "bg-warning-light text-warning border border-warning/20 hover:bg-warning hover:text-warning-foreground shadow-soft",
        magical: "gradient-primary text-primary-foreground shadow-magical hover:shadow-glow hover:scale-105",
        soft: "bg-accent-light text-accent border border-accent/20 hover:bg-accent hover:text-accent-foreground shadow-soft hover:shadow-medium",
        glow: "bg-primary-light text-primary border border-primary/20 animate-pulse-soft shadow-glow",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function AdorableBadge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { AdorableBadge, badgeVariants };