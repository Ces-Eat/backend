import { DocumentDefinition, FilterQuery, now, QueryOptions, UpdateQuery } from "mongoose";
import RestaurantModel, { RestaurantDocument } from "../models/restaurant.model";

export async function createRestaurant(input: DocumentDefinition<RestaurantDocument>) {
    return RestaurantModel.create(input);
}

export async function getRestaurant(
    query: FilterQuery<RestaurantDocument>,
    options: QueryOptions = {lean: true}
) {
    return RestaurantModel.findOne({...query, deletedAt: null}, {}, options);
}

export async function getAllRestaurants(
    query: FilterQuery<RestaurantDocument>,
    options: QueryOptions = {lean: true}
) {
    return RestaurantModel.find({...query, deletedAt: null}, {}, options);
}

export async function updateRestaurant(
    query: FilterQuery<RestaurantDocument>,
    update: UpdateQuery<RestaurantDocument>,
    options: QueryOptions
) {
    return RestaurantModel.findOneAndUpdate({...query, deletedAt: null}, update, options);
}

export async function deleteRestaurant(
    query: FilterQuery<RestaurantDocument>
) {
    return RestaurantModel.findOneAndUpdate({...query, deletedAt: null}, {deletedAt: new Date(now())});
}