import { GoogleGenerativeAI } from "@google/generative-ai";
import {openai} from "./open-ai.js";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const geminiAI = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export default geminiAI

export const getMessageGeminiAI=async (messages)=>{
    const result=await geminiAI.generateContent(messages[messages.length-1].content)
    const text=result.response.text()
    return text
}