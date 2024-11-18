import { FC } from "react";
import { ChevronUpIcon, XMarkIcon } from "./icons";

type ButtonProps = React.ComponentProps<"button">;

type ToggleButtonProps = Omit<ButtonProps, "children"> & {
    isExpanded: boolean;
};

export const Button: FC<ButtonProps> = ({ children, className, ...props }) => {
    return (
        <button
            className={`hover:text-gray-700 transition-colors items-center justify-center ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export const DeleteButton: FC<Omit<ButtonProps, "children">> = (props) => {
    return (
        <Button {...props}>
            <XMarkIcon />
        </Button>
    );
};

export const ToggleButton: FC<ToggleButtonProps> = ({
    isExpanded,
    ...props
}) => {
    return (
        <Button
            {...props}
            className={`transition-transform duration-300 ${
                isExpanded ? "" : "rotate-180"
            }`}
        >
            <ChevronUpIcon />
        </Button>
    );
};
