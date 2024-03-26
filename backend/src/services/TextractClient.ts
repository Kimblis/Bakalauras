import { inject, injectable } from 'inversify';
import { TextractClient, DetectDocumentTextCommand } from '@aws-sdk/client-textract';
import { AnalyzePhotosDTO } from '../dto/Textract';
import { S3ClientService } from './S3Client';

@injectable()
export class TextractClientService extends TextractClient {
  @inject(S3ClientService) private s3ClientService: S3ClientService;

  constructor() {
    super({
      region: 'eu-central-1',
      credentials: {
        accessKeyId: process.env.TEXTRACT_ACCESS_KEY as string,
        secretAccessKey: process.env.TEXTRACT_SECRET_ACCESS_KEY as string,
      },
    });
  }

  extractTextFromImages = async (photos: AnalyzePhotosDTO) => {
    return Promise.all(photos.map((photo) => this.extractTextFromImage(photo.dataUrl, photo.name)));
  };

  extractTextFromImage = async (imageUrl: string, name: string) => {
    const bufferablePart = imageUrl.split(',')[1];
    if (!bufferablePart) return;
    const blob = Buffer.from(bufferablePart, 'base64');
    const params = {
      Document: {
        Bytes: blob,
      },
    };
    await this.s3ClientService.uploadFile(blob, name);
    const detectText = new DetectDocumentTextCommand(params);
    // const analyzeDoc = new AnalyzeDocumentCommand(params);
    const response = await this.send(detectText);
    const text: string[] = [];
    response.Blocks?.forEach((block: any) => {
      if ('Text' in block && block.Text !== undefined) {
        text.push(block.Text);
      }
    });

    return text;
  };
}
