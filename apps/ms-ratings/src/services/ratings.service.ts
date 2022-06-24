import { DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import RatingModel, { RatingDocument } from "../models/ratings.model";

export async function createRating(
    input: DocumentDefinition<Omit<RatingDocument, "createdAt" | "updatedAt">>
) {
    return RatingModel.create(input);
}

export async function getRating(
    query: FilterQuery<RatingDocument>,
    options: QueryOptions = {lean: true}
) {
    return RatingModel.findOne({...query, deletedAt: null}, {}, options);
}

export async function getAllRatings(
    options: QueryOptions = {lean: true}
) {
    return RatingModel.find({deletedAt: null}, {}, options);
}

export async function updateRating(
    query: FilterQuery<RatingDocument>,
    update: UpdateQuery<RatingDocument>,
    options: QueryOptions
) {
    return RatingModel.findOneAndUpdate(query, update, options);
}

export async function deleteRating(
    query: FilterQuery<RatingDocument>
) {
    return RatingModel.deleteOne(query);
}