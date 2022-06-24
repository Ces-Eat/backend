import { Request, Response } from "express";
import path from "node:path";
import { CreateRatingInput, DeleteRatingInput, GetRatingInput, UpdateRatingInput } from "../schemas/ratings.schema";
import { createRating, deleteRating, getAllRatings, getRating, updateRating } from "../services/ratings.service";
import logger from "../utils/logger.util";

export async function createRatingHandler(
    req: Request<{}, {}, CreateRatingInput["body"]>, 
    res: Response
) {
    const body = req.body;
    // let filepath
    // if (req.file) {
    //     filepath = req.file.filename
    // } else {
    //     filepath = null;
    // }

    logger.debug(`Creating new rating from request...`);
        //const rating = await createRating({...body, clientId: "user_radsazsaw"}); // a changer
        const rating = await createRating({...body});
        return res.send(rating);
    
}

export async function getRatingHandler(
    req: Request<GetRatingInput["params"]>,
    res: Response
) {
    const ratingId = req.params.ratingId;
    logger.debug(`Fetching rating from ${ratingId}...`)
    
    const rating = await getRating({ratingId});
    if (!rating) return res.sendStatus(404);
    return res.send(rating);
}

export async function getAllRatingsHandler(
    req: Request,
    res: Response
) {
    logger.debug(`Fetching all ratings from MongoDB database`)
    const ratings = await getAllRatings();

    if (!ratings) return res.sendStatus(404);

    return res.send(ratings);
}

export async function updateRatingHandler(
    req: Request<UpdateRatingInput["params"]>,
    res: Response
) {
    const ratingId = req.params.ratingId;
    logger.debug(`Updating rating from ${ratingId}...`)
    const update = req.body;
    try {
        const restaurant = await getRating({ratingId});
        if (!restaurant) return res.sendStatus(404);
        // if (req.file && restaurant.image == null) update.image = req.file.filename // Handle when user created an account without an image

        const updatedRating = await updateRating({ratingId}, update, {new: true});
        // if(req.file && restaurant.image != null && updatedRestaurant?.image != null) updateImage(req.file, updatedRestaurant.image); // Handle image replace when updating a user with another image
        return res.send(updatedRating);
    }
    catch (e: any) {
        // if(req.file) deleteImage(req.file.filename);
        if (e.status) return res.status(e.status).send(e);
        return res.sendStatus(500);
    }
    
}

export async function deleteRatingHandler(
    req: Request<DeleteRatingInput["params"]>,
    res: Response
) {
    const ratingId = req.params.ratingId;
    logger.debug(`Deleting rating from ${ratingId}...`)
    const rating = await getRating({ratingId});

    if (!rating) return res.sendStatus(404);

    const deletion = await deleteRating({ratingId});
    // if (deletion != null && restaurant && restaurant.image != null) deleteImage(restaurant.image)
    return res.send({
        message: "Rating was deleted with success",
        deletedId: rating.ratingId
}
)}
