"use client"

import { FC, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

import { IPrompt } from "@/interfaces/prompt"

interface Props {
  prompt: IPrompt;
  handleTagClick?: (tagName: string) => void;
  handleEdit?: () => void;
  handleDelete?: () => void;
}

export const PromptCard:FC<Props> = ({prompt, handleTagClick, handleEdit, handleDelete}) => {

  const [copied, setCopied] = useState<string>('');

  const pathName = usePathname();
  const session = useSession();
  const router = useRouter();

  const handleCopy= () => {
    setCopied(prompt.prompt);
    navigator.clipboard.writeText(prompt.prompt);
    setTimeout(() => setCopied(''), 3000)
  };

  const handleClickProfile = () => {
    if(prompt.creator._id === session.data?.user.id) return router.push('/profile');

    router.push(`/profile/${prompt.creator._id}?name=${prompt.creator.username}`)
  };

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div 
          className="flex-1 flex justify-start items-center gap-3 cursor-pointer"
          onClick={handleClickProfile}
        >
          <Image src={prompt.creator.image} alt={`user_image`} width={40} height={40} className="rounded-full object-contain" />

          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {prompt.creator.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {prompt.creator.email}
            </p>
          </div>
        </div>

        <div className="copy_btn" onClick={handleCopy} >
          <Image 
            src={copied === prompt.prompt ? '/assets/icons/tick.svg' : '/assets/icons/copy.svg'}
            alt='copy_btn'
            width={12}
            height={12}
          />
        </div>
      </div>

      <p className="my-4 font-satoshi text-sm text-gray-700">{prompt.prompt}</p>
      <p 
        className="font-inter text-sm blue_gradient cursor-pointer" 
        onClick={()=> handleTagClick && handleTagClick(prompt.tag)}
      >#{prompt.tag}</p>

      {
        session?.data?.user.id === prompt.creator._id && pathName === '/profile' && (
          <div className="flex-center gap-4 border-t border-gray-100 mt-5 pt-3">
            <p 
              className="font-inter text-sm green_gradient cursor-pointer"
              onClick={handleEdit}
            >
              Edit
            </p>
            <p 
              className="font-inter text-sm orange_gradient cursor-pointer"
              onClick={handleDelete}
            >
              Delete
            </p>
         
          </div>
        )
      }
    </div>
  )
}
