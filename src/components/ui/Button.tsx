import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'destructive'
  size?: 'sm' | 'md' | 'lg' | 'icon'
  asChild?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    const base =
      'inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none'

    const variants = {
      primary:
        'bg-primary text-primary-foreground hover:opacity-90 active:scale-95 shadow-lg shadow-primary/20',
      secondary:
        'bg-secondary text-secondary-foreground hover:bg-secondary/80 active:scale-95',
      ghost:
        'text-muted-foreground hover:text-foreground hover:bg-secondary/60 active:scale-95',
      outline:
        'border border-border text-foreground hover:bg-secondary/60 hover:border-primary/50 active:scale-95',
      destructive:
        'bg-destructive text-destructive-foreground hover:opacity-90 active:scale-95',
    }

    const sizes = {
      sm: 'h-8 px-3 text-sm',
      md: 'h-10 px-4 text-sm',
      lg: 'h-12 px-6 text-base',
      icon: 'h-10 w-10',
    }

    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    )
  }
)
Button.displayName = 'Button'

export { Button }
