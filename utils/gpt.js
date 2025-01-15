import OpenAI from "openai";
import dotenv from 'dotenv';
dotenv.config();

const openai = new OpenAI();

const ChatUtil = {
    generateResponse: async (prompt) => {
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ 
                role: "system", 
                content: "You are a Movie Recommender who always recommends movies based on the user's preferences and previous history of user. You generate list in JSON format without any other text and markdown format. The list is just a movie title array." 
            }, { 
                role: "user", 
                content: prompt 
            }],
        });
        console.log(completion.choices[0].message);
        return completion.choices[0].message;
    },

    continuousChat: async (messages) => {
        try {
            const completion = await openai.chat.completions.create({
                model: "gpt-4o-mini",
                messages: [
                    {
                        role: "system",
                        content: "You are a friendly movie expert who can discuss movies in detail.As this is a chat , you should response in casual and friendly tone with short sentences without any markdown or html format."
                    },
                    ...messages
                ],
                max_tokens: 300
            });
            return completion.choices[0].message;
        } catch (error) {
            console.error('GPT API Error:', error);
            throw error;
        }
    }
};

export default ChatUtil;
