import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { ComponentPropsWithRef, ElementRef, forwardRef } from 'react';

import { cn } from '~/lib/utils';

const variantDefs = {
  primary:
    'bg-blue-primary text-white hover:bg-blue-secondary hover:border-blue-secondary disabled:bg-gray-400 disabled:hover:bg-gray-400 disabled:hover:border-gray-400',
  secondary:
    'bg-transparent text-blue-primary hover:bg-blue-secondary hover:bg-opacity-10 hover:border-blue-secondary hover:text-blue-secondary disabled:text-gray-400 disabled:hover:bg-transparent disabled:hover:border-gray-400 disabled:hover:text-gray-400',
  tertiary:
    'bg-black border text-white border-white hover:bg-white hover:bg-opacity-10 hover:border-black hover:text-black disabled:text-gray-400 disabled:hover:bg-transparent disabled:hover:border-gray-400 disabled:hover:text-gray-400',
  quaternary: 'bg-white border text-black border-black hover:bg-black hover:bg-opacity-10 hover:border-white hover:text-white disabled:text-gray-400 disabled:hover:bg-transparent disabled:hover:border-gray-400 disabled:hover:text-gray-400',
  subtle:
    'border-none bg-transparent text-blue-primary hover:bg-blue-secondary hover:bg-opacity-10 hover:text-blue-secondary disabled:text-gray-400 disabled:hover:bg-transparent disabled:hover:text-gray-400',
};

export const buttonVariants = cva(
  'inline-flex w-full justify-center items-center border-2 py-2.5 px-[30px] text-base leading-6 font-semibold border-blue-primary disabled:border-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-primary/20',
  {
    variants: {
      variant: variantDefs,
    },
    defaultVariants: {
      variant: 'primary',
    },
  },
);

export interface ButtonProps extends ComponentPropsWithRef<'button'> {
  variant?: keyof typeof variantDefs;
  asChild?: boolean;
}

export const Button = forwardRef<ElementRef<'button'>, ButtonProps>(
  ({ asChild = false, children, className, variant, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp className={cn(buttonVariants({ variant, className }))} ref={ref} {...props}>
        {children}
      </Comp>
    );
  },
);

Button.displayName = 'Button';
