import { IPrompt } from "@/interfaces/prompt";
import { Model, Schema, model, models } from "mongoose";


const promptSchema = new Schema({
    creator: {type: Schema.Types.ObjectId, ref: "User"},
    prompt: {type: String, required: [true, "The prompt is required"]},
    tag: {type: String, required: [true, "The tag is required"]}
});

const Prompt:Model<IPrompt> = models.Prompt || model("Prompt", promptSchema);

export default Prompt