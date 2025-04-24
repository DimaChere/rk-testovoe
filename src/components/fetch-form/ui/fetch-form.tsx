"use client";

import { fetchCatImage } from "@/shared/api/fetch-cat-image";
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
    const { cnRoot, cnField, cnSubmitButton } = getClasses();

    const [autoRefetch, setAutoRefetch] = useState(false);
    const { register, watch, handleSubmit } = useForm<Schema>({
        resolver: zodResolver(schema),
    });

    const isSubmitEnabled = watch("enabled");

    const {
        error,
        mutate: fetchCat,
        isPending,
        data: mutationData,
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

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={cnRoot}>
            <div className={cnField}>
                <input {...register("enabled")} id="enabled" type="checkbox" />
                <label htmlFor="enabled">Enabled</label>
            </div>
            <div className={cnField}>
                <input
                    {...register("autoRefetch")}
                    id="autoRefetch"
                    type="checkbox"
                />
                <label htmlFor="autoRefetch">
                    Auto-refresh every 5 seconds
                </label>
            </div>
            <button
                type="submit"
                className={cnSubmitButton}
                disabled={isPending || !isSubmitEnabled}
            >
                {isPending ? "Loading..." : "Get cat"}
            </button>
            {error && <p style={{ color: "red" }}>{error.message}</p>}
        </form>
    );
};
