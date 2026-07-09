import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

export class UploadService {

    static async uploadFile(
        file: Express.Multer.File,
        userId: string,
        type:
            | "profile"
            | "resume"
            | "project"
            | "certificate",
        resourceType: "image" | "raw" = "image"
    ) {

        const folder =
            `career-companion/users/${userId}/${type}`;

        return new Promise((resolve, reject) => {

            const stream =
                cloudinary.uploader.upload_stream(
                    {
                        folder,
                        resource_type: resourceType,
                    },
                    (error, result) => {

                        if (error) {
                            return reject(error);
                        }

                        resolve({
                            url: result!.secure_url,
                            publicId: result!.public_id,
                            originalName:
                                file.originalname,
                            size: file.size,
                        });

                    }
                );

            streamifier
                .createReadStream(file.buffer)
                .pipe(stream);

        });

    }

    static async deleteFile(
        publicId: string,
        resourceType: "image" | "raw" = "image"
    ) {

        return cloudinary.uploader.destroy(
            publicId,
            {
                resource_type: resourceType,
            }
        );

    }

}