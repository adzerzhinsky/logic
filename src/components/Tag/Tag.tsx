import React from 'react';

interface TagProps {
    tag: string;
    isSelected: boolean;
    onClick: () => void;
}

const Tag: React.FC<TagProps> = ({ tag, isSelected, onClick }) => (
    <div className={`tag${isSelected ? " selected" : ""}`} onClick={onClick}>
        {tag}
    </div>
);

export default Tag;