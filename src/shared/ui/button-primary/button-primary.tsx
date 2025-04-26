import { ButtonHTMLAttributes, FC, PropsWithChildren } from "react";
import { getClasses } from "./styles/get-classes";

type ButtonPrimaryProps = PropsWithChildren &
    ButtonHTMLAttributes<HTMLButtonElement>;

export const ButtonPrimary: FC<ButtonPrimaryProps> = ({
    children,
    ...props
}) => {
    const { cnRoot } = getClasses();

    return (
        <button className={cnRoot} {...props}>
            {children}
        </button>
    );
};
