"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  block?: boolean;
  height?: number;
  icon?: ReactNode;
  loading?: boolean;
}

export default function PrimaryButton({
  text,
  block = false,
  height,
  icon,
  loading = false,
  disabled = false,
  className = "",
  type = "button",
  ...props
}: Props) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={[
        "bg-[#EE1458]",
        "border-none",
        "rounded-full",
        "px-6",
        "py-2",
        "text-white",
        "text-sm",
        "font-medium",
        "inline-flex",
        "items-center",
        "justify-center",
        "gap-2",
        "transition",
        "duration-200",
        "disabled:opacity-50",
        "disabled:cursor-not-allowed",
        "hover:brightness-110",
        block ? "w-full flex" : "",
        className,
      ].join(" ")}
      style={height ? { height } : undefined}
      {...props}
    >
      {loading ? (
        <span
          aria-hidden="true"
          className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"
        />
      ) : (
        icon
      )}
      <span>{text}</span>
    </button>
  );
}