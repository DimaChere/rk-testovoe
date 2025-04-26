import { FC, HTMLAttributes, useId } from "react";
import { getClasses } from "./styles/get-classes";

type CheckBoxInputProps = {
    labelText?: string;
} & HTMLAttributes<HTMLInputElement>;

export const CheckBoxInput: FC<CheckBoxInputProps> = ({
    labelText,
    ...props
}) => {
    const { cnRoot } = getClasses();
    const inputId = useId();

    return (
        <div className={cnRoot}>
            <input id={inputId} type="checkbox" {...props} />
            {labelText && <label htmlFor={inputId}>{labelText}</label>}
        </div>
    );
};
