import React, { useState, useEffect } from "react";
import AddFeedForm from "./components/AddFeedForm";
import FeedList from "./components/FeedList";
import FeedItems from "./components/FeedItems";

const App = () => {
  const [feeds, setFeeds] = useState([]);
  const [selectedFeed, setSelectedFeed] = useState(null);

  useEffect(() => {
    // eslint-disable-next-line no-undef
    chrome.storage.local.get(["feeds"], (result) => {
      setFeeds(result.feeds || []);
    });
  }, []);

  const addFeed = async (feedUrl) => {
    try {
      const response = await fetch(feedUrl);
      const text = await response.text();
      const data = new window.DOMParser().parseFromString(text, "text/xml");
      const title = data.querySelector("title").textContent;

      const newFeeds = [...feeds, { url: feedUrl, title }];
      setFeeds(newFeeds);
      // Save feeds to chrome.storage.local
      // eslint-disable-next-line no-undef
      chrome.storage.local.set({ feeds: newFeeds });
    } catch (error) {
      console.error("Failed to fetch feed title:", error);
    }
  };

  const handleRemoveFeed = (updatedFeeds) => {
    setFeeds(updatedFeeds);
  };

  const handleSelectFeed = (feedUrl) => {
    setSelectedFeed(feedUrl);
  };

  const handleBackToList = () => {
    setSelectedFeed(null);
  };

  return (
    <div className="App">
      <h1>RSS Connect</h1>
      <AddFeedForm addFeed={addFeed} />
      {selectedFeed ? (
        <FeedItems feedUrl={selectedFeed} onBack={handleBackToList} />
      ) : (
        <FeedList
          feeds={feeds}
          onRemoveFeed={handleRemoveFeed}
          onSelectFeed={handleSelectFeed}
        />
      )}
    </div>
  );
};

export default App;
