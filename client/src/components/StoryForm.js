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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button type="submit">Create Story</button>
    </form>
  );
};

export default StoryForm;
