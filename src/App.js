import React, { useState, useEffect } from "react";
import AddFeedForm from "./components/AddFeedForm";
import FeedList from "./components/FeedList";

const App = () => {
  const [feeds, setFeeds] = useState([]);

  useEffect(() => {
    // eslint-disable-next-line no-undef
    chrome.storage.local.get(["feeds"], (result) => {
      setFeeds(result.feeds || []);
    });
  }, []);

  const addFeed = (feedUrl) => {
    const newFeeds = [...feeds, feedUrl];
    setFeeds(newFeeds);
    // eslint-disable-next-line no-undef
    chrome.storage.local.set({ feeds: newFeeds });
  };

  return (
    <div className="App">
      <h1>RSS Reader</h1>
      <AddFeedForm addFeed={addFeed} />
      <FeedList feeds={feeds} />
    </div>
  );
};

export default App;
