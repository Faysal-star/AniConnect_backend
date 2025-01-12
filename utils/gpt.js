import OpenAI from "openai";
const openai = new OpenAI();
import dotenv from 'dotenv';
dotenv.config();

const ChatUtil = {
    generateResponse: async (prompt) => {
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "system", content: "You are a Movie Recommender who always recommends movies based on the user's preferences and previous history of user. You generate list in JSON format without any other text and markdown format. The list is just a movie title array." }, { role: "user", content: prompt }],
        });
        console.log(completion.choices[0].message);
        return completion.choices[0].message;
    }
}

export default ChatUtil;
