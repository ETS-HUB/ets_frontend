import React from "react";
import Image from "next/image";
import { spinner } from "@/constants/images";

type ButtonVariant = "primary" | "secondary" | "tertiary" | "gray";
type ButtonType = "button" | "submit" | "reset";

interface ButtonProps {
  variant?: ButtonVariant;
  width?: string;
  mobileWidth?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
  className?: string;
  type?: ButtonType;
  disabled?: boolean;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  width,
  mobileWidth,
  onClick,
  children,
  className = "",
  type = "button",
  disabled = false,
  loading = false,
}) => {
  const baseClasses =
    "inline-flex items-center justify-center font-medium text-base duration-200 ease-out text-black hover:cursor-pointer";

  const variantClasses: Record<ButtonVariant, string> = {
    primary:
      "h-[3rem] rounded-[12px] border border-neutral-black bg-tertiary px-6 py-4 hover:scale-105 transition-transform sm:mt-10",

    secondary:
      "h-[2.5rem] rounded-lg border border-neutral-black bg-secondary px-5 py-3 hover:scale-95 hover:bg-transparent",

    tertiary:
      "h-[2.25rem] bg-tertiary hover:bg-opacity-80 rounded-[8px] px-4 py-2",

    gray: "h-[2.5rem] rounded-lg border border-gray-300 bg-gray-200 text-gray-700 px-5 py-3 hover:scale-[1.05] transition-transform",
  };

  const getWidthClass = (size?: string, isMobile: boolean = false): string => {
    const prefix = isMobile ? "w-" : "md:w-";

    if (!size) return "";
    if (size === "fit") return isMobile ? "w-fit" : "md:w-fit";
    if (size === "full") return isMobile ? "w-full" : "md:w-full";
    if (size === "auto") return isMobile ? "w-auto" : "md:w-auto";

    if (/^\d+\/\d+$/.test(size)) return `${prefix}${size}`;

    if (/^\d+$/.test(size)) return `${prefix}${size}`;

    return `${prefix}[${size}]`;
  };

  const widthClass = getWidthClass(width);
  const mobileWidthClass = getWidthClass(mobileWidth, true);

  const buttonClasses =
    `${baseClasses} ${variantClasses[variant]} ${className} ${widthClass} ${mobileWidthClass}`.trim();

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled || loading}
      aria-busy={loading}
      aria-disabled={disabled || loading}
    >
      {loading ? (
        <Image
          src={spinner}
          alt="Loading"
          className="animate-spin h-5 w-5"
          width={20}
          height={20}
        />
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
