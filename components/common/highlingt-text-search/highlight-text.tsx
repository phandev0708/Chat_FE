import React from 'react';
import Highlighter from 'react-highlight-words';

interface Props {
    text: string;
    searchWords: string[];
}

const HighlightedText: React.FC<Props> = ({ text, searchWords }) => {
    return (
        <Highlighter
            highlightClassName="highlight"
            searchWords={searchWords}
            autoEscape={true}
            textToHighlight={text}
        />
    );
};

export default HighlightedText;
