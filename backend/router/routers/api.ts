import { searchDTO } from '../../dto/OpenAI';
import { servicesContainer } from '../../inversify.config';
import { OpenAIClientService } from '../../services/OpenAIClient';
import { publicProcedure, router } from '../trpc';

const openAIClient = servicesContainer.get(OpenAIClientService);

export const apiRouter = router({
  search: publicProcedure.input(searchDTO).query(async ({ input }) => {
    const result = await openAIClient.searchGPT(input.phrase);
    return searchDTO.parse(result);
  }),
});
