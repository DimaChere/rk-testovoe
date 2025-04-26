import classNames from "classnames/bind";
import styles from "./checkbox-input.module.scss";

const cn = classNames.bind(styles);

export const getClasses = () => {
    const cnRoot = cn("checkbox-input");

    return { cnRoot };
};
