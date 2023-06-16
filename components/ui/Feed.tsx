"use client"

import { ChangeEvent, FC, useEffect, useState } from "react";
import { PromptCard } from "./PromptCard";
import { IPrompt } from "@/interfaces/prompt";

interface PrompList {
  prompts: IPrompt[];
  handleTagClick: (tagName: string) => void;
};

const PromptList:FC<PrompList> = ({prompts, handleTagClick}) => {

  return (
    <div className="mt-16 prompt_layout">
      {
        prompts.length === 0
          ? (
            <h1>There is no prompts for the moment</h1>
          ) : (
            prompts.map( prompt => (
              <PromptCard key={prompt._id} prompt={prompt} handleTagClick={handleTagClick} />
          )
        ))
      }
    </div>
  )
};

export const Feed = () => {

  const [searchText, setSearchText] = useState('');

  const [allPrompts, setAllPrompts] = useState<IPrompt[]>([]);
  const [searchTimeout, setSearchTimeout] = useState<number | any>(null);
  const [searchedResults, setSearchedResults] = useState<IPrompt[]>([]);

  useEffect(() => {
    const fetchPrompts = async() => {
      const res = await fetch('/api/prompt');
      const data = await res.json();
      setAllPrompts(data);
    };

    fetchPrompts();
  }, []);

  const filterPrompts = (searchtext:string) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return allPrompts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  const handleSearchChange = (e:ChangeEvent<HTMLInputElement>) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);
    
    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
      );
  };

  const handleTagClick = (tagName:string) => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };
  
  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input 
          type="text"
          placeholder="Search for a tag or username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
        <button
          className="absolute right-2 text-gray-400 hover:text-gray-900"
          onClick={()=> setSearchText('')}
        > X </button>
      </form>

       {/* All Prompts */}
       {searchText ? (
        <PromptList
          prompts={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptList prompts={allPrompts} handleTagClick={handleTagClick} />
      )}
    </section>
  )
}
