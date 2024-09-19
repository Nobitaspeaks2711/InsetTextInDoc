import React, { useState, useRef, useEffect } from 'react';
import './Document.css';

export const Document = () => {
  const [documentContent, setDocumentContent] = useState([]);
  const [recentText, setRecentText] = useState(null);
  const textareaRef = useRef(null);

  // Function to handle the Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const newText = e.target.value.trim();
      if (newText) {
        setDocumentContent((prevContent) => [...prevContent, newText]);
        setRecentText(newText);
        textareaRef.current.value = ''; // Clear textarea
      }
    }
  };

  // Remove the highlight after 2 seconds
  useEffect(() => {
    if (recentText) {
      const timer = setTimeout(() => {
        setRecentText(null);
      }, 2000);
      return () => clearTimeout(timer); // Cleanup the timer
    }
  }, [recentText]);

  return (
    <div>
      <textarea
        ref={textareaRef}
        onKeyPress={handleKeyPress}
        placeholder="Type your text and press Enter..."
      ></textarea>
      <div className="document-box">
        {documentContent.map((text, index) => (
          <p
            key={index}
            className={text === recentText ? 'highlight' : ''}
          >
            {text}
          </p>
        ))}
      </div>
    </div>
  );
};
