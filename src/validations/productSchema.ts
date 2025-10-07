import { z } from 'zod';

export const productSchema = z.object({
    product: z.string()
        .min(3, { message: "Product must be at least 3 characters long" })
        .max(200, { message: "Product must be less than 200 characters long" }),
    price: z.string()
        .refine(val => !isNaN(parseFloat(val)), { message: "Price must be a number" })
        .transform(val => parseFloat(val)),
    quantity: z.string()
        .refine(val => !isNaN(parseInt(val)), { message: "Quantity must be a number" })
        .transform(val => parseInt(val, 10)),
});
