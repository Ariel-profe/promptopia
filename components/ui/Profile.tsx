import { FC } from "react";
import { IPrompt } from "@/interfaces/prompt";
import { PromptCard } from "./PromptCard";

interface Props {
  name: string;
  desc: string;
  data: IPrompt[];
  handleEdit?: (prompt: IPrompt) => void;
  handleDelete?: (prompt: IPrompt)=> void;
};

export const Profile:FC<Props> = ({name, desc, data, handleEdit, handleDelete}) => {

  return (
    <section className="w-full">
     <h1 className="head_text text-left"> <span className="blue_gradient">{name}</span> Profile</h1>
     <p className="desc text-left">
      {desc}
     </p>

     {
        data.length === 0
          ? (
            <h1>There is no prompts for the moment</h1>
          ) : (
            data.map( prompt => (
              <div className="mt-10 prompt_layout" key={prompt._id}>
                <PromptCard 
                  prompt={prompt} 
                  handleEdit={() => handleEdit && handleEdit(prompt)} 
                  handleDelete={() => handleDelete && handleDelete(prompt)} 
                />
              </div>
          )
        ))
      }
    </section>
  )
}
