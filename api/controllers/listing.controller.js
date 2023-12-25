import Listing from "../models/listing.model.js";
import { errorhandler } from "../utils/error.js";

export const createListing = async (req, res, next) => {
    try {
        const listing = await Listing.create(req.body);
        return res.status(201).json(listing);

    } catch (error) {
        next(error);
    }
};

export const deleteListing = async (req, res, next) => {
    try {
        const listing = await Listing.findById(req.params.id);

        if (!listing) {
            return next(errorhandler(404, "Listing not found!"));
        }

        if (listing.userRef !== req.user.id) {
            return next(errorhandler(401, "You can only delete your own listings!"));
        }

        await Listing.findByIdAndDelete(req.params.id);
        return res.status(200).json("Listing deleted!");

    } catch (error) {
        next(error);
    }
};

export const updateListing = async (req, res, next) => {
    try {
        const listing = await Listing.findById(req.params.id);

        if (!listing) {
            return next(errorhandler(404, "Listing not found!"));
        }

        if (listing.userRef !== req.user.id) {
            return next(errorhandler(401, "You can only update your own listings!"));
        }

        const updatedList = await Listing.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        return res.status(200).json(updatedList);

    } catch (error) {
        next(error);
    }
};

export const getListing = async (req, res, next) => {
    try {
        const listing = await Listing.findById(req.params.id);

        if (!listing) {
            return next(errorhandler(404, "Listing not found!"));
        }
        return res.status(200).json(listing);

    } catch (error) {
        next(error)
    }
}