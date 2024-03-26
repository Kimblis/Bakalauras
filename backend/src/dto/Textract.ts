import { array, object, string, z } from 'zod';

export const analyzePhotoDTO = object({
  dataUrl: string(),
  name: string(),
});

export const analyzePhotosDTO = array(analyzePhotoDTO);

export type AnalyzePhotosDTO = z.infer<typeof analyzePhotosDTO>;
