import classNames from "classnames/bind";
import styles from "./button-primary.module.scss";
const cn = classNames.bind(styles);

export const getClasses = () => {
    const cnRoot = cn("button-primary");

    return { cnRoot };
};
