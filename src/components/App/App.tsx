import React, { useMemo, useState } from "react";

import useFetchData from "../../hooks/useFetchData";
import Tag from "../Tag";
import Card from "../Card";
import Loading from "../Loading";

import "../../styles/style.scss"

const App = () => {
  const [selectedTag, setSelectedTag] = useState<string | null>("Все темы");
  const {data, isLoading} = useFetchData("https://logiclike.com/docs/courses.json");

  const handleTagClick = (tag: string) => {
    setSelectedTag(tag);
  };

  const tags = useMemo(() => {
    const allTags = ["Все темы"].concat(...data.map((i) => i.tags));
    const uniqueTags = [...new Set(allTags)];
    return uniqueTags.map((tag: string) => (
      <Tag key={tag} tag={tag} isSelected={tag===selectedTag} onClick={() => handleTagClick(tag)} />
    ))
  },[data, handleTagClick])

  const cards = useMemo(() => {
    return data
    .filter((card) => selectedTag === "Все темы" || card.tags.includes(selectedTag))
    .map((card) => (
      <Card key={card.id} name={card.name} image={card.image} bgColor={card.bgColor}/>
    ))
  },[data, selectedTag])

  return (
    <div className="app">
      <div className="tags">
        {tags}
      </div>
      <div className="cards">
        {isLoading ? <Loading /> : cards}
      </div>
    </div>
  );
};

export default App;
