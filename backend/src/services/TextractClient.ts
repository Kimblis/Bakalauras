import { injectable } from 'inversify';
import { TextractClient, AnalyzeDocumentCommand, FeatureType } from '@aws-sdk/client-textract';

@injectable()
export class TextractClientService extends TextractClient {
  constructor() {
    super({
      region: 'eu-central-1',
      credentials: {
        accessKeyId: process.env.TEXTRACT_ACCESS_KEY as string,
        secretAccessKey: process.env.TEXTRACT_SECRET_ACCESS_KEY as string,
      },
    });
  }

  extractTextFromImage = async () => {
    const params = {
      Document: {
        S3Object: {
          Bucket: 'bakalauras',
          Name: 'testas1',
        },
      },
      FeatureTypes: [FeatureType.TABLES, FeatureType.FORMS, FeatureType.QUERIES],
    };
    const analyzeDoc = new AnalyzeDocumentCommand(params);
    const response = await this.send(analyzeDoc);
    this.displayBlockInfo(response);
    return true;
  };

  private async displayBlockInfo(response: any) {
    try {
      response.Blocks.forEach((block: any) => {
        console.log(`ID: ${block.Id}`);
        console.log(`Block Type: ${block.BlockType}`);
        if ('Text' in block && block.Text !== undefined) {
          console.log(`Text: ${block.Text}`);
        } else {
        }
        if ('Confidence' in block && block.Confidence !== undefined) {
          console.log(`Confidence: ${block.Confidence}`);
        } else {
        }
        if (block.BlockType == 'CELL') {
          console.log('Cell info:');
          console.log(`   Column Index - ${block.ColumnIndex}`);
          console.log(`   Row - ${block.RowIndex}`);
          console.log(`   Column Span - ${block.ColumnSpan}`);
          console.log(`   Row Span - ${block.RowSpan}`);
        }
        if ('Relationships' in block && block.Relationships !== undefined) {
          console.log(block.Relationships);
          console.log('Geometry:');
          console.log(`   Bounding Box - ${JSON.stringify(block.Geometry.BoundingBox)}`);
          console.log(`   Polygon - ${JSON.stringify(block.Geometry.Polygon)}`);
        }
        console.log('-----');
      });
    } catch (err) {
      console.log('Error', err);
    }
  }
}
