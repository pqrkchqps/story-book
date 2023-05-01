// client/src/components/Stories.js

import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../AuthContext";
import StoryForm from "./StoryForm";
import LoginLogoutButton from "./LoginLogoutButton";

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
    //setStories([...stories, newStory]);
  };

  return (
    <div className="container mx-auto px-4 mt-6 ">
      <div className="float-right">
        <LoginLogoutButton />
      </div>
      <h2 className="text-2xl font-bold mb-4">Stories</h2>
      {authToken && <StoryForm onStoryCreated={handleStoryCreated} />}
      <ul className="divide-y divide-gray-200">
        {stories.map((story) => (
          <li key={story._id} className="py-4">
            <h3 className="text-xl font-semibold mb-2">{story.title}</h3>
            <p className="text-gray-700 mb-2">{story.content}</p>
            <p className="text-sm text-gray-500">
              Author: {story.author.username}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Stories;
