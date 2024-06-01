import React from "react";

const FeedItem = ({ item }) => (
  <div>
    <h3>{item.title}</h3>
    <p>{item.description}</p>
    <a href={item.link} target="_blank" rel="noopener noreferrer">
      Read more
    </a>
  </div>
);

export default FeedItem;
