import { object, string } from 'zod';

export const searchDTO = object({
  phrase: string(),
});
