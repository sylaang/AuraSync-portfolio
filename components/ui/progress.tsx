'use client';

import * as React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';

import { cn } from '@/lib/utils';

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      'relative h-0.5 w-3/5 rounded-full bg-secondary', //
      className
    )}
    {...props}
  >
<ProgressPrimitive.Indicator
  className="h-full w-full flex-1 bg-gradient-to-r from-blue-400 via-cyan-500 to-purple-600 transition-all led-effect"
  style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
/>
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
