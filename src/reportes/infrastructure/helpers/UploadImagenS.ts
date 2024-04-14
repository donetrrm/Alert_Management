import { UploadImagesService } from "../../application/Services/UploadImagesService";
import cloudinary from 'cloudinary';

export class UploadImagenS implements UploadImagesService {
  async uploadIamge(image: any): Promise<string> {
    try {
      if (typeof image !== 'string') {
        throw new Error('La imagen debe ser una cadena de texto en formato base64.');
      }

      cloudinary.v2.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY_CLOUD,
        api_secret: process.env.API_SECRET_CLOUD
      });

      const result = await cloudinary.v2.uploader.upload("data:image/jpeg;base64," + image, {
        folder: process.env.CLOUD_FOLDER
      });

      return result.secure_url;
    } catch (error) {
      console.error("Error al subir la imagen a Cloudinary:", error);
      throw new Error("Error al subir la imagen a Cloudinary");
    }
  }
}
