import mongoose, { Types } from "mongoose";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

export interface RatingDocument extends mongoose.Document {
    ratingId: string
    score: number;
    ratedId: string;
    clientId: string | null;
}

const ratingSchema = new mongoose.Schema({
    ratingId: {
        type: String, 
        required: true,
        unique: true,
        default: () => `rating_${nanoid()}`,
    },
    score: {type: Number, required: true},
    ratedId: {type: String, required: false},
    clientId: {type: String, required: false, default:  null}
},{
    timestamps:true
});
const RatingModel = mongoose.model<RatingDocument>("Restaurant", ratingSchema);

export default RatingModel;