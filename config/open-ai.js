import { Configuration, OpenAIApi } from 'openai';
import dotenv from 'dotenv';
dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

export const  openai = new OpenAIApi(configuration);


export const getMessageOpenAI=async (messages)=>{
  const completion = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: messages,
  });

  // Get completion text/content
  const completionText = completion.data.choices[0].message.content;
  return completionText;
}