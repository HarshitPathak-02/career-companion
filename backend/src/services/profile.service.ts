import { Profile } from "../models/profile.model.js";
import { AppError } from "../utils/app-error.js";
import { calculateProfileCompletion } from "../utils/profileCompletion.js";
import { UpdateProfileInput } from "../validations/profile.validation.js";

export class ProfileService {
    static async getMyProfile(userId: string) {
        const profile = await Profile.findOne({
            userId,
        });

        if (!profile) {
            throw new AppError(
                "Profile not found",
                404
            );
        }

        return profile;
    }
    static async updateProfile(
        userId: string,
        data: UpdateProfileInput
    ) {
        const profile = await Profile.findOneAndUpdate(
            {
                userId,
            },
            {
                $set: data,
            },
            {
                new: true,
                runValidators: true,
            }
        );

        if (!profile) {
            throw new AppError(
                "Profile not found",
                404
            );
        }

        profile.profileCompletion =
            calculateProfileCompletion(profile);


        await profile.save();

        return profile;
    }

}