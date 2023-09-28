import "../../../main/config/loadEnv";

import AWS from "aws-sdk";
import { v4 as uuidv4 } from "uuid";
import request from "request-promise-native";

import { ImageStorageRepository } from "@domain/repositories/storage/ImageStorageRepository";
import { log } from "console";

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "ap-northeast-1",
});

export class ImageStorageRepositoryImpl implements ImageStorageRepository {
  private s3bucket: AWS.S3;

  constructor() {
    this.s3bucket = new AWS.S3({
      params: { Bucket: process.env.AWS_S3_BUCKET_NAME },
    });
  }

  // Function to download image from URL
  async downloadImageFromURL(url: string): Promise<Buffer> {
    try {
      let options = {
        method: "GET",
        uri: url,
        encoding: null, // get body as Buffer
      };

      const response: Buffer = await request(options);

      return response;
    } catch (error) {
      console.error("Error downloading the image:", error);
      throw error;
    }
  }

  async uploadImageToStorage(
    userId: number,
    imageBuffer: Buffer,
  ): Promise<string> {
    const fileName = uuidv4() + ".jpg";
    const filePath = userId + "/" + fileName;

    // console.log(typeof imageBuffer);  // should be 'object'
    // console.log(Buffer.isBuffer(imageBuffer));  // should be 'true'

    const params: AWS.S3.PutObjectRequest = {
      Key: filePath,
      Body: imageBuffer,
      Bucket: "articlo",
    };
    const uploadData = await this.s3bucket.upload(params).promise();
    log("uploadData", uploadData);

    // Return the URL of the uploaded image
    // const url = this.s3bucket.getSignedUrl("getObject", {
    //   Bucket: "articlo",
    //   Key: uploadData.Key,
    //   Expires: 3600  // 1 hour
    // });

    return uploadData.Key;
  }
}
