import * as React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { cva, type VariantProps } from "class-variance-authority";
import cn from "../../lib/utils";
import { Cross2Icon } from "@radix-ui/react-icons";

const Sheet = SheetPrimitive.Root;
const SheetTrigger = SheetPrimitive.Trigger;
const SheetClose = SheetPrimitive.Close;
const SheetPortal = SheetPrimitive.Portal;

const SheetOverlay = React.forwardRef<React.ElementRef<typeof SheetPrimitive.Overlay>, React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>>(
  ({ className, ...props }, ref) => (
    <SheetPrimitive.Overlay
      className={cn("fixed inset-0 z-50 bg-black/60 transition-opacity duration-700 delay-100 ease-in-out", className)}
      {...props}
      ref={ref}
    />
  )
);
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;

const sheetVariants = cva(
  "fixed z-50 gap-4 bg-dark-purple p-6 shadow-lg transition-all duration-700 delay-100 ease-[cubic-bezier(0.22,1,0.36,1)]",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b transform data-[state=open]:translate-y-0 data-[state=closed]:translate-y-[-100%]",
        bottom: "inset-x-0 bottom-0 border-t transform data-[state=open]:translate-y-0 data-[state=closed]:translate-y-full",
        left: "inset-y-0 left-0 h-full w-3/4 border-r transform data-[state=open]:translate-x-0 data-[state=closed]:translate-x-[-100%]",
        right: "inset-y-0 right-0 h-full w-3/4 border-l transform data-[state=open]:translate-x-0 data-[state=closed]:translate-x-full",
      },
    },
    defaultVariants: {
      side: "right",
    },
  }
);

interface SheetContentProps extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>, VariantProps<typeof sheetVariants> {}

const SheetContent = React.forwardRef<React.ElementRef<typeof SheetPrimitive.Content>, SheetContentProps>(
  ({ side = "right", className, children, ...props }, ref) => (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content ref={ref} className={cn(sheetVariants({ side }), className)} {...props}>
        <SheetPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity duration-300 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-white">
          <Cross2Icon className="h-4 w-4 text-white" />
          <span className="sr-only">Close</span>
        </SheetPrimitive.Close>
        {children}
      </SheetPrimitive.Content>
    </SheetPortal>
  )
);
SheetContent.displayName = SheetPrimitive.Content.displayName;

export { Sheet, SheetPortal, SheetOverlay, SheetTrigger, SheetClose, SheetContent };
