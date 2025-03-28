import  { getMessageOpenAI} from './config/open-ai.js';
import readlineSync from 'readline-sync';
import colors from 'colors';
import  {getMessageGeminiAI} from "./config/gemini-ai.js";
const AI_MODELS={
  'OPENAI':'OPENAI',
  'GEMINI':'GEMINI',
}
const getMessageFunction= {
  [AI_MODELS.OPENAI]: getMessageOpenAI,
  [AI_MODELS.GEMINI]: getMessageGeminiAI
}
const availableModels=Object.values(AI_MODELS)
async function main() {
  console.log(colors.bold.green('Welcome to the Chatbot Program!'));
  console.log(colors.bold.green('You can start chatting with the bot.'));
  console.log(colors.bold.green('Please pick your ai model'));
  for(let i=0;i<availableModels.length;i++){
    console.log(colors.bold.green(`${i}: ${availableModels[i]}`));
  }
  const selectedModelIndex = readlineSync.question(colors.yellow('Select model (enter number): '));
  const selectedModel = availableModels[Number(selectedModelIndex)];
  const getMessage=getMessageFunction[selectedModel]

  const chatHistory = [];

  while (true) {
    const userInput = readlineSync.question(colors.yellow('You: '));

    try {
      const messages = chatHistory.map(([role, content]) => ({
        role,
        content,
      }));

      messages.push({ role: 'user', content: userInput });

      const text=await  getMessage(messages);

      if (userInput.toLowerCase() === 'exit') {
        console.log(colors.green('Bot: ') + text);
        return;
      }

      console.log(colors.green('Bot: ') + text);

      // Update history with user input and assistant response
      chatHistory.push(['user', userInput]);
      chatHistory.push(['assistant', text]);
    } catch (error) {
      if (error.response) {
        console.error(colors.red(error.response.data.error.code));
        console.error(colors.red(error.response.data.error.message));
        return;
      }
      console.error(colors.red(error));
      return;
    }
  }
}

main();
