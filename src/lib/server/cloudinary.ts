import { v2 as cloudinary } from 'cloudinary';
import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } from '$env/static/private';

cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
    secure: true
});

export async function uploadImage(fileBuffer: Buffer): Promise<string | undefined> {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: "foods",
                resource_type: "auto",
            },
            (error, result) => {
                if (error) {
                    console.error("Erreur Cloudinary:", error);
                    return resolve(undefined);
                }

                resolve(result?.public_id);
            }
        );

        uploadStream.end(fileBuffer);
    });
}

export { cloudinary }