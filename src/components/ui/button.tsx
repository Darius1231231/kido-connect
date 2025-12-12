import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-nunito font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0 active:scale-95",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-neumorphic hover:shadow-soft active:shadow-neumorphic-pressed rounded-squircle",
        destructive:
          "bg-destructive text-destructive-foreground shadow-neumorphic hover:shadow-soft active:shadow-neumorphic-pressed rounded-squircle",
        outline:
          "border-2 border-input bg-background shadow-neumorphic hover:bg-accent hover:text-accent-foreground active:shadow-neumorphic-pressed rounded-squircle",
        secondary:
          "bg-secondary text-secondary-foreground shadow-neumorphic hover:shadow-soft active:shadow-neumorphic-pressed rounded-squircle",
        ghost:
          "hover:bg-accent hover:text-accent-foreground rounded-squircle",
        link:
          "text-primary underline-offset-4 hover:underline",
        // Kido custom variants
        squishy:
          "bg-sage text-foreground shadow-neumorphic hover:shadow-soft active:shadow-neumorphic-pressed active:scale-95 rounded-squircle-lg border-2 border-sage-deep",
        squishySand:
          "bg-sand text-foreground shadow-neumorphic hover:shadow-soft active:shadow-neumorphic-pressed active:scale-95 rounded-squircle-lg border-2 border-sand-deep",
        squishyLavender:
          "bg-lavender text-foreground shadow-neumorphic hover:shadow-soft active:shadow-neumorphic-pressed active:scale-95 rounded-squircle-lg border-2 border-lavender-deep",
        mic:
          "bg-gradient-to-br from-sage-accent to-primary text-primary-foreground shadow-neumorphic hover:shadow-glow-calm active:shadow-neumorphic-pressed rounded-full",
        activity:
          "bg-card text-card-foreground shadow-neumorphic hover:shadow-soft active:shadow-neumorphic-pressed rounded-squircle-xl border-2 border-border",
        guardian:
          "bg-card text-card-foreground shadow-neumorphic hover:shadow-soft active:shadow-neumorphic-pressed rounded-squircle",
      },
      size: {
        default: "h-12 px-6 py-3 text-base",
        sm: "h-10 px-4 py-2 text-sm",
        lg: "h-14 px-8 py-4 text-lg",
        xl: "h-16 px-10 py-5 text-xl",
        icon: "h-12 w-12",
        iconLg: "h-16 w-16",
        iconXl: "h-24 w-24",
        mic: "h-28 w-28",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
