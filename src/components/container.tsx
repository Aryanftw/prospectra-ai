import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cn } from "@/lib/cn";

const containerWidths = {
  prose: "max-w-3xl",
  content: "max-w-6xl",
  wide: "max-w-7xl",
} as const;

type ContainerProps<T extends ElementType = "div"> = {
  as?: T;
  width?: keyof typeof containerWidths;
  className?: string;
  children: React.ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className" | "children">;

/**
 * Centered rhythm container. Every page section uses one of three widths
 * so gutters and measure stay consistent across viewports.
 */
export function Container<T extends ElementType = "div">({
  as,
  width = "content",
  className,
  children,
  ...rest
}: ContainerProps<T>) {
  const Tag = (as ?? "div") as ElementType;
  return (
    <Tag
      className={cn(
        "mx-auto w-full px-5 sm:px-8",
        containerWidths[width],
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
