import { cn } from '@/lib/utils';

interface GradientRuleProps {
  className?: string;
}

export function GradientRule({ className }: GradientRuleProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'h-[1px] w-full bg-gradient-to-r from-transparent via-[#804dee]/50 to-transparent',
        className
      )}
    />
  );
}
