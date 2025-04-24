import { z } from "zod";

export const schema = z.object({
    enabled: z.boolean(),
    autoRefetch: z.boolean(),
});

export type Schema = z.infer<typeof schema>;
