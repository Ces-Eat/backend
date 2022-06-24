import { object, number, string, TypeOf } from "zod";

const ratingIdRegExp = /^rating_\w+/;

const createRatingPayload = {
    body: object({
        ratingId: string({
            required_error: "Identifiant de la note requis"
        }),
        score: number({
            required_error: "Valeur de la note requise"
        }),
        ratedId: string({
            required_error: "Cible de la note requise"
        }),
        clientId: string({
            required_error: "identifiant du client requis"
        })
        // name: string({
        //     required_error: "Nom du restaurant requis"
        // }).max(35, "Taille maximale de 35 caractères"),
        // address: string({
        //     required_error: "L'adresse du restaurant est requise pour créer un nouveau restaurant"
        // }).max(500),
        // description: string({}).optional()
    }).strict()
};

const updateRatingPayload = {
    body: object({
        // name: string({
        //     required_error: "Nom du restaurant requis"
        // }).max(35, "Taille maximale de 35 caractères").optional(),
        // address: string({
        //     required_error: "L'adresse du restaurant est requise pour créer un nouveau restaurant"
        // }).max(500).optional(),
        // description: string({}).optional()
    }).strict()
};

const params = {
    params: object({
        ratingId: string({
            required_error: "Identifiant de note requis"
        }).regex(ratingIdRegExp, "Identifiant de note incorrect")
    }).strict()
};

export const createRatingSchema = object({
    ...createRatingPayload
})

export const getRestaurantSchema = object({
    ...params
})

export const updateRatingSchema = object({
    ...updateRatingPayload,
    ...params
})

export const deleteRatingSchema = object({
    ...params
})

export type CreateRatingInput = TypeOf<typeof createRatingSchema>
export type GetRatingInput = TypeOf<typeof getRestaurantSchema>
export type UpdateRatingInput = TypeOf<typeof updateRatingSchema>
export type DeleteRatingInput = TypeOf<typeof deleteRatingSchema>