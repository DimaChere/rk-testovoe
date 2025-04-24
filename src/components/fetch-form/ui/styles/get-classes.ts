import classNames from "classnames/bind";
import styles from "./fetch-form.module.scss";

const cn = classNames.bind(styles);

export const getClasses = () => {
    const cnRoot = cn("form");
    const cnField = cn("form__field");
    const cnSubmitButton = cn("form__submit-button");

    return { cnRoot, cnField, cnSubmitButton };
};
