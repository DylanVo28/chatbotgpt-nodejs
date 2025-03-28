import  { getMessageOpenAI} from './config/open-ai.js';
import readlineSync from 'readline-sync';
import colors from 'colors';
import  {getMessageGeminiAI} from "./config/gemini-ai.js";
const MODEL={
  'OPENAI':'OPENAI',
  'GEMINI_AI':'GEMINI_AI',
}
const getMessage= {
  [MODEL.OPENAI]: getMessageOpenAI,
  [MODEL.GEMINI_AI]: getMessageGeminiAI
}
const models=[MODEL.OPENAI, MODEL.GEMINI_AI];
async function main() {
  console.log(colors.bold.green('Welcome to the Chatbot Program!'));
  console.log(colors.bold.green('You can start chatting with the bot.'));
  console.log(colors.bold.green('Please pick your ai model'));
  for(let i=0;i<models.length;i++){
    console.log(colors.bold.green(`${i}: ${models[i]}`));
  }
  const userInput = readlineSync.question(colors.yellow('You: '));
  const getMessageAction=getMessage[models[Number(userInput)]]

  const chatHistory = [];

  while (true) {
    const userInput = readlineSync.question(colors.yellow('You: '));

    try {
      const messages = chatHistory.map(([role, content]) => ({
        role,
        content,
      }));

      messages.push({ role: 'user', content: userInput });

      const text=await  getMessageAction(messages);

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
