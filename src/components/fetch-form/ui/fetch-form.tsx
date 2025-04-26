"use client";

import { ButtonPrimary } from "@/shared/ui/button-primary/button-primary";
import { CheckBoxInput } from "@/shared/ui/checkbox-input/checkbox-input";
import { FC } from "react";
import { useFetchForm } from "../model/use-fetch-form";
import { getClasses } from "./styles/get-classes";

type FetchFormProps = {
    handleChangeImageUrl: (newUrl: string) => void;
};

export const FetchForm: FC<FetchFormProps> = ({ handleChangeImageUrl }) => {
    const { cnRoot } = getClasses();

    const { isPending, register, isSubmitEnabled, onSubmit, error } =
        useFetchForm(handleChangeImageUrl);

    const buttonText = isPending ? "Loading..." : "Get cat";
    const isButtonDisabled = isPending || !isSubmitEnabled;

    return (
        <form onSubmit={onSubmit} className={cnRoot}>
            <CheckBoxInput labelText="Enabled" {...register("enabled")} />
            <CheckBoxInput
                labelText="Auto-refresh every 5 seconds"
                {...register("autoRefetch")}
            />

            <ButtonPrimary type="submit" disabled={isButtonDisabled}>
                {buttonText}
            </ButtonPrimary>
            {error && <p style={{ color: "red" }}>{error.message}</p>}
        </form>
    );
};
