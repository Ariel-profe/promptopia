import { IPrompt } from "@/interfaces/prompt";

import Prompt from "@/models/prompt";
import { connectToDB } from "@/utils/database";

export const POST = async(req: Request) => {

    const {creator, tag, prompt} = await req.json() as IPrompt;

    try {
        await connectToDB();

        const newPrompt = new Prompt({
            creator,
            prompt,
            tag
        });

        await newPrompt.save();

        return new Response(JSON.stringify(newPrompt), {status: 201})
    } catch (error) {
        return new Response("Failed to create a new prompt", {status: 500})
    }
}