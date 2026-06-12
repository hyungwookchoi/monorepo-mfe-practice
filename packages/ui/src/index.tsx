import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
};

export const Button = ({
  className = "",
  variant = "primary",
  type = "button",
  ...props
}: ButtonProps) => (
  <button
    className={`ui-button ui-button-${variant} ${className}`.trim()}
    type={type}
    {...props}
  />
);

type CardProps = HTMLAttributes<HTMLElement> & {
  as?: "article" | "aside" | "section" | "div";
};

export const Card = ({
  as: Component = "article",
  className = "",
  ...props
}: CardProps) => (
  <Component className={`ui-card ${className}`.trim()} {...props} />
);

export const PageShell = ({
  children,
  className = ""
}: {
  children: ReactNode;
  className?: string;
}) => <div className={`page-shell ${className}`.trim()}>{children}</div>;

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
    maximumFractionDigits: 0
  }).format(value);
