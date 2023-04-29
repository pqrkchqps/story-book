// client/src/components/Stories.js

import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../AuthContext";
import StoryForm from "./StoryForm";

const Stories = () => {
  const { authToken } = useContext(AuthContext);
  const [stories, setStories] = useState([]);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const config = { headers: { "auth-token": authToken } };
        const { data } = await axios.get(
          "http://localhost:5000/api/story/all",
          config
        );
        setStories(data);
      } catch (err) {
        console.error("Error fetching stories:", err);
      }
    };

    fetchStories();
  }, [authToken]);

  const handleStoryCreated = (newStory) => {
    setStories([...stories, newStory]);
  };

  return (
    <div>
      <h2>Stories</h2>
      <StoryForm onStoryCreated={handleStoryCreated} />
      <ul>
        {stories.map((story) => (
          <li key={story._id}>
            <h3>{story.title}</h3>
            <p>{story.content}</p>
            <p>Author: {story.author.username}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Stories;
