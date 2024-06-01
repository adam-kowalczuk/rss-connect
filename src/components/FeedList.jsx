import React, { useEffect, useState } from "react";
import FeedItem from "./FeedItem";

const FeedList = ({ feeds }) => {
  const [feedItems, setFeedItems] = useState([]);

  useEffect(() => {
    const fetchFeeds = async () => {
      let allItems = [];
      for (const feedUrl of feeds) {
        const response = await fetch(feedUrl);
        const text = await response.text();
        const data = new window.DOMParser().parseFromString(text, "text/xml");
        const items = data.querySelectorAll("item");
        const feedData = Array.from(items).map((item) => ({
          title: item.querySelector("title").textContent,
          description: item.querySelector("description").textContent,
          link: item.querySelector("link").textContent
        }));
        allItems = allItems.concat(feedData);
      }
      setFeedItems(allItems);
    };
    fetchFeeds();
  }, [feeds]);

  return (
    <div>
      {feedItems.map((item, index) => (
        <FeedItem key={index} item={item} />
      ))}
    </div>
  );
};

export default FeedList;
