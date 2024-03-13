import { injectable } from 'inversify';
import OpenAI from 'openai';

@injectable()
export class OpenAIClientService extends OpenAI {
  constructor() {
    super({ apiKey: process.env.OPENAI_API_KEY });
  }

  searchGPT = async (prompt: string) => {
    const chatCompletion = await this.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'gpt-4-turbo-preview',
      n: 1,
      temperature: 0.1,
    });

    return chatCompletion.choices[0]?.message.content;
  };
}
