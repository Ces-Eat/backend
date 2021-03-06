import { object, number, string, TypeOf, boolean } from "zod";

const phoneRegExp = /^((\+33\s|0)[1-9])([0-9][0-9]){4}$/;
const userIdRegExp = /^user_\w+/;
const refererCodeRegExp = /^[ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789]{8}$/

const createUserPayload = {
    body: object({

        name: string({
            required_error: "Prénom requis"
        }).max(35, "Taille maximale de 35 caractères"),

        surname: string({
            required_error: "Nom requis"
        }).max(35, "Taille maximale de 35 caractères"),

        email: string({
            required_error: "Adresse email requis "
        }).email().max(320, "Taille maximale de 320 caractères"),

        password: string({
            required_error: "Mot-de-passe requis"
        }).min(10, "Taille minimale de 10 caractères").max(50, "Taille maximale de 50 caractères"),

        phone: string({
            required_error: "Numéro de téléphone requis"
        }).regex(phoneRegExp, "Numéro de téléphone incorrect"),

        refererCode: string().min(8, "Le code de parainage être composé de 8 caractères")
        .max(8, "Le code de parainage être composé de 8 caractères").regex(refererCodeRegExp).optional()
    }).strict()
};

const updateUserPayload = {
    body: object({

        name: string({
            required_error: "Prénom requis"
        }).max(35, "Taille maximale de 35 caractères").optional(),

        surname: string({
            required_error: "Nom requis"
        }).max(35, "Taille maximale de 35 caractères").optional(),

        email: string({
            required_error: "Adresse email requis "
        }).max(320, "Taille maximale de 320 caractères").email().optional(),

        password: string({
            required_error: "Mot-de-passe requis"
        }).min(10, "Taille minimale de 10 caractères").max(50, "Taille maximale de 50 caractères").optional(),

        phone: string({
            required_error: "Numéro de téléphone requis"
        }).regex(phoneRegExp, "Numéro de téléphone incorrect").optional()

    }).strict()
};

const commUpdateUserPayload = {
    body: object({

        name: string({
            required_error: "Prénom requis"
        }).max(35, "Taille maximale de 35 caractères").optional(),

        surname: string({
            required_error: "Nom requis"
        }).max(35, "Taille maximale de 35 caractères").optional(),

        email: string({
            required_error: "Adresse email requis "
        }).max(320, "Taille maximale de 320 caractères").email().optional(),

        password: string({
            required_error: "Mot-de-passe requis"
        }).min(10, "Taille minimale de 10 caractères").max(50, "Taille maximale de 50 caractères").optional(),

        phone: string({
            required_error: "Numéro de téléphone requis"
        }).regex(phoneRegExp, "Numéro de téléphone incorrect").optional(),

        isSuspended: boolean().optional(),

    }).strict()
};

const params = {
    params: object({
        userid: string({
            required_error: "Identifiant utilisateur est requis"
        }).regex(userIdRegExp, "Identifiant utilisateur incorrect")
    }).strict()
};

export const createUserSchema = object({
    ...createUserPayload,
})

export const getUserSchema = object({
    ...params
})

export const updateUserSchema = object({
    ...updateUserPayload,
    ...params
})

export const commUpdateUserSchema = object({
    ...commUpdateUserPayload,
    ...params
})

export const deleteUserSchema = object({
    ...params
})

export type CreateUserInput = TypeOf<typeof createUserSchema>
export type GetUserInput = TypeOf<typeof getUserSchema>
export type UpdateUserInput = TypeOf<typeof updateUserSchema>
export type CommUpdateUserInput = TypeOf<typeof commUpdateUserSchema>
export type DeleteUserInput = TypeOf<typeof deleteUserSchema>