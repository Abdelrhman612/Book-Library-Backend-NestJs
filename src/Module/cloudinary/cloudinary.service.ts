/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable, Logger } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryResponse } from './cloudinary-response';
import streamifier from 'streamifier';

@Injectable()
export class CloudinaryService {
  private readonly logger = new Logger(CloudinaryService.name);

  async uploadFile(file: Express.Multer.File): Promise<CloudinaryResponse> {
    if (!file?.buffer) {
      throw new Error('No file buffer provided');
    }

    return new Promise<CloudinaryResponse>((resolve, reject) => {
      const uploadOptions = {
        resource_type: 'auto' as const,
        folder: 'uploads',
      };

      const uploadStream = cloudinary.uploader.upload_stream(
        uploadOptions,
        (error: Error | undefined, result: CloudinaryResponse | undefined) => {
          if (error) {
            this.logger.error(`Upload failed: ${error.message}`, error.stack);
            return reject(new Error(`Failed to upload file: ${error.message}`));
          }
          if (!result) {
            const errorMessage = 'Upload returned no result';
            this.logger.error(errorMessage);
            return reject(new Error(errorMessage));
          }
          resolve(result);
        },
      );

      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }
}
