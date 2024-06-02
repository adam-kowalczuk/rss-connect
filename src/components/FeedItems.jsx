import React, { useEffect, useState } from "react";
import FeedItem from "./FeedItem";

const FeedItems = ({ feedUrl, onBack }) => {
  const [feedItems, setFeedItems] = useState([]);

  useEffect(() => {
    const fetchFeedItems = async () => {
      const response = await fetch(feedUrl);
      const text = await response.text();
      const data = new window.DOMParser().parseFromString(text, "text/xml");
      const items = data.querySelectorAll("item");
      const feedData = Array.from(items).map((item) => ({
        title: item.querySelector("title").textContent,
        description: item.querySelector("description").textContent,
        link: item.querySelector("link").textContent
      }));
      setFeedItems(feedData);
    };
    fetchFeedItems();
  }, [feedUrl]);

  return (
    <div>
      <button onClick={onBack}>Back to Feed List</button>
      {feedItems.map((item, index) => (
        <div key={index}>
          <FeedItem item={item} />
        </div>
      ))}
    </div>
  );
};

export default FeedItems;
