import React from "react";

const FeedList = ({ feeds, onRemoveFeed, onSelectFeed }) => {
  const handleRemoveFeed = (feedUrlToRemove) => {
    const updatedFeeds = feeds.filter((feed) => feed.url !== feedUrlToRemove);
    onRemoveFeed(updatedFeeds);
    // Persist updated feeds to chrome.storage.local
    // eslint-disable-next-line no-undef
    chrome.storage.local.set({ feeds: updatedFeeds });
  };

  return (
    <div>
      {feeds.map((feed, index) => (
        <div key={index}>
          <span onClick={() => onSelectFeed(feed.url)}>{feed.title}</span>
          <button onClick={() => handleRemoveFeed(feed.url)}>
            Remove Feed
          </button>
        </div>
      ))}
    </div>
  );
};

export default FeedList;
