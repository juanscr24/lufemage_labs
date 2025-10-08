import { z } from 'zod';

export const userSchemaRegister = z.object({
    email_user: z
        .string()
        .trim()
        .nonempty({ message: "El correo electrónico es obligatorio" })
        .email({ message: "Ingresa un correo electrónico válido" }),

    password_user: z
        .string()
        .trim()
        .nonempty({ message: "La contraseña es obligatoria" })
        .min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),

    confirmPassword: z
        .string()
        .trim()
        .nonempty({ message: "Debes confirmar la contraseña" })
        .min(6, { message: "La confirmación debe tener al menos 6 caracteres" }),
})
    .refine((data) => data.password_user === data.confirmPassword, {
        path: ['confirmPassword'],
        message: "Las contraseñas no coinciden"
    });

export const userSchemaLogin = z.object({
    email_user: z
        .string()
        .trim()
        .nonempty({ message: 'El email no puede estar vacío' })
        .email({ message: 'Ingresa un email valido' }),

    password_user: z
        .string()
        .trim()
        .nonempty({ message: 'La contraseña no puede estar vacía' })
})