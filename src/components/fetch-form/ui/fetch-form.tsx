"use client";

import { fetchCatImage } from "@/shared/api/fetch-cat-image";
import { ButtonPrimary } from "@/shared/ui/button-primary/button-primary";
import { CheckBoxInput } from "@/shared/ui/checkbox-input/checkbox-input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Schema, schema } from "../lib/form-schema";
import { getClasses } from "./styles/get-classes";

type FetchFormProps = {
    handleChangeImageUrl: (newUrl: string) => void;
};

export const FetchForm: FC<FetchFormProps> = ({ handleChangeImageUrl }) => {
    const { cnRoot } = getClasses();

    const [autoRefetch, setAutoRefetch] = useState(false);
    const { register, watch, handleSubmit } = useForm<Schema>({
        resolver: zodResolver(schema),
    });

    const isSubmitEnabled = watch("enabled");

    const {
        error,
        mutate: fetchCat,
        isPending,
    } = useMutation({
        mutationFn: fetchCatImage,
        onSuccess: (data) => {
            handleChangeImageUrl(data);
        },
    });

    const { data: autoRefetchData } = useQuery({
        queryKey: ["auto-refetch-cat"],
        queryFn: () => fetchCatImage(),
        refetchInterval: autoRefetch ? 5000 : false,
        enabled: autoRefetch,
    });

    useEffect(() => {
        if (autoRefetch && autoRefetchData) {
            handleChangeImageUrl(autoRefetchData);
        }
    }, [autoRefetch, autoRefetchData, handleChangeImageUrl]);

    const onSubmit = (formData: Schema) => {
        setAutoRefetch(formData.autoRefetch);

        if (!formData.autoRefetch) {
            fetchCat();
        }
    };

    const buttonText = isPending ? "Loading..." : "Get cat";

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={cnRoot}>
            <CheckBoxInput labelText="Enabled" {...register("enabled")} />
            <CheckBoxInput
                labelText="Auto-refresh every 5 seconds"
                {...register("autoRefetch")}
            />

            <ButtonPrimary
                type="submit"
                disabled={isPending || !isSubmitEnabled}
            >
                {buttonText}
            </ButtonPrimary>
            {error && <p style={{ color: "red" }}>{error.message}</p>}
        </form>
    );
};
