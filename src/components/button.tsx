import Link from "next/link";
import type { Route } from "next";
import { cn } from "@/lib/cn";

type ButtonTone = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md";

const tones: Record<ButtonTone, string> = {
  primary:
    "bg-signal text-white border border-signal-deep/40 hover:bg-signal-deep focus-visible:outline-signal",
  secondary:
    "bg-card text-ink border border-line-strong hover:border-ink hover:bg-parchment",
  ghost: "bg-transparent text-ink-soft border border-transparent hover:text-ink hover:bg-parchment",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-3.5 text-[13px]",
  md: "h-11 px-5 text-sm",
};

type ButtonProps = {
  tone?: ButtonTone;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
} & (
  | ({ href: Route; onClick?: never } & Omit<
      React.ComponentPropsWithoutRef<typeof Link>,
      "href" | "onClick" | "className" | "children"
    >)
  | ({ href?: undefined } & React.ComponentPropsWithoutRef<"button">)
);

/**
 * Single buttonprimitive. Links navigate; buttons act.
 * Placeholder actions must use `aria-disabled` + explanatory text,
 * never a fake click handler.
 */
export function Button({
  tone = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  const styles = cn(
    "inline-flex cursor-pointer items-center justify-center gap-2 rounded-[4px] font-medium tracking-[-0.01em] whitespace-nowrap transition-colors duration-150",
    "disabled:cursor-not-allowed disabled:opacity-50",
    tones[tone],
    sizes[size],
    className,
  );

  if ("href" in props && props.href !== undefined) {
    const { href, ...rest } = props;
    return (
      <Link href={href} className={styles} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={styles} {...props}>
      {children}
    </button>
  );
}
