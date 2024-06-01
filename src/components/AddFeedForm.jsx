import React, { useState } from "react";

const AddFeedForm = ({ addFeed }) => {
  const [feedUrl, setFeedUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (feedUrl) {
      addFeed(feedUrl);
      setFeedUrl("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={feedUrl}
        onChange={(e) => setFeedUrl(e.target.value)}
        placeholder="Enter RSS feed URL"
      />
      <button type="submit">Add Feed</button>
    </form>
  );
};

export default AddFeedForm;
