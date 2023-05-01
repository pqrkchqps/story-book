// client/src/components/StoryForm.js

import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../AuthContext";

const StoryForm = ({ onStoryCreated }) => {
  const { authToken } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = { headers: { "auth-token": authToken } };
      const { data } = await axios.post(
        "http://localhost:5000/api/story/create",
        { title, content },
        config
      );
      console.log(data);
      onStoryCreated(data);
    } catch (err) {
      console.error("Error creating story:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full px-3 py-2 mt-4 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
      <button
        type="submit"
        className="w-full mt-4 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Create Story
      </button>
    </form>
  );
};

export default StoryForm;
