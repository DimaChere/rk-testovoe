"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Schema, schema } from "../lib/form-schema";
import { getClasses } from "./styles/get-classes";

export const FetchForm = () => {
    const { cnRoot, cnField, cnSubmitButton } = getClasses();
    const { register, handleSubmit } = useForm({
        resolver: zodResolver(schema),
    });

    const onSubmit = (formFields: Schema) => {
        console.log("get cat");
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
            <button type="submit" className={cnSubmitButton}>
                Get cat
            </button>
        </form>
    );
};
