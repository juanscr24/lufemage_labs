import { tv } from "tailwind-variants";
import type { ReactNode } from "react";

interface IButton {
    text?: string;
    type?: "submit" | "button";
    onClick?: () => void;
    variant?: "primary" | "secondary" | "danger" | "outline" | "empty";
    fit?: boolean;
    icon?: ReactNode;
    iconPosition?: "left" | "right";
}

const button = tv({
    base: "flex items-center justify-center gap-2 font-bold rounded-lg p-3 cursor-pointer transition-colors",
    variants: {
        variant: {
            primary: "bg-[#2563eb] text-white hover:bg-[#1d4ed8]",
            secondary: "bg-gray-500 text-white hover:bg-gray-600",
            danger: "bg-red-600 text-white hover:bg-red-700",
            outline: "border border-gray-400 text-gray-700 hover:bg-gray-100",
            empty: "bg-none text-[#6b7280] hover:text-[#1e84ec]",
        },
        fit: {
            true: "h-fit w-fit",
            false: "w-full",
        },
    },
    defaultVariants: {
        variant: "primary",
        fit: false,
    },
});

export const ButtonComponent = ({
    text,
    type = "button",
    onClick,
    variant,
    fit,
    icon,
    iconPosition = "left",
}: IButton) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={button({ variant, fit })}
        >
            {icon && iconPosition === "left" && icon}
            {text}
            {icon && iconPosition === "right" && icon}
        </button>
    );
};
