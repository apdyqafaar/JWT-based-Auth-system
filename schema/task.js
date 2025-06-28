import { z } from "zod";

export const taskValidation=z.object({
    title:z.string().min(1, 'title is required !'),
    description:z.string().optional(),
    status:z.enum(['pending', 'in progress', 'completed']).optional(),
    DueDate:z.string()
})