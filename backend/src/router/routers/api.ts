import { searchDTO } from '../../dto/OpenAI';
import { servicesContainer } from '../../inversify.config';
import { OpenAIClientService } from '../../services/OpenAIClient';
import { TextractClientService } from '../../services/TextractClient';
import { publicProcedure, router } from '../trpc';

const openAIClient = servicesContainer.get(OpenAIClientService);
const textractClient = servicesContainer.get(TextractClientService);

export const apiRouter = router({
  search: publicProcedure.input(searchDTO).mutation(async ({ input }) => {
    const result = await openAIClient.searchGPT(input.phrase);
    return searchDTO.parse(result);
  }),
  analyzeDocument: publicProcedure.mutation(() => {
    return textractClient.extractTextFromImage();
  }),
});
