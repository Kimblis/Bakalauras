import { injectable } from 'inversify';
import { Upload } from '@aws-sdk/lib-storage';
import { S3Client } from '@aws-sdk/client-s3';

@injectable()
export class S3ClientService extends S3Client {
  constructor() {
    super({
      region: 'eu-central-1',
      credentials: {
        accessKeyId: process.env.TEXTRACT_ACCESS_KEY as string,
        secretAccessKey: process.env.TEXTRACT_SECRET_ACCESS_KEY as string,
      },
    });
  }

  uploadFile = async (blob: any, name: string) => {
    const upload = new Upload({
      client: this,
      params: {
        Bucket: 'bakalauras',
        Key: name,
        Body: blob,
      },
    });

    return upload.done();
  };
}
