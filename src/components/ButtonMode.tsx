import { tv } from "tailwind-variants";
import { useTheme } from "../store/themeColor";
import { Brightness4, Brightness7 } from "@mui/icons-material";

interface IButtonMode {
    variant?: 'login' | 'dashboard'
}

const button = tv({
    base: "cursor-pointer",
    variants: {
        variant: {
            login: "absolute right-5 top-5 rounded-lg bg-white hover:bg-white/60 p-2 shadow dark:text-white dark:bg-[#1e2939] dark:hover:bg-[#1e2939]/60 dark:shadow-black/50",
            dashboard: "bg-none text-[#6b7280] hover:text-[#1e84ec]"
        },
    },
    defaultVariants: {
        variant: "login"
    },
});

export const ButtonMode = ({ variant }: IButtonMode) => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            className={button({ variant })}
            onClick={toggleTheme}
        >
            {theme === "light" ? <Brightness4 /> : <Brightness7 />}
        </button>
    );
};
