import { NextResponse } from "next/server";
import Prompt from "@/models/prompt";
import { connectToDB } from "@/utils/database";

export const GET = async(req: Request, res: NextResponse) => {

    try {
        await connectToDB();
    
        const prompts = await Prompt.find().populate('creator');
        
        return new Response(JSON.stringify(prompts))
    } catch (error) {
        console.log(error);
        return new Response('There is a problem', {
            status: 500
        })
    }
};