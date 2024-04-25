import React, { useState, useEffect, useRef } from 'react';
import { useDebounce } from "../../hooks/useDebounce.ts";
import './AutoComplete.css';

type AutoCompleteProps = {
  fetchData: (input: string) => Promise<string[]>;
  onSelect: (value: string) => void;
  placeholder?: string;
};

const AutoComplete: React.FC<AutoCompleteProps> = ({ fetchData, onSelect, placeholder, }) => {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const debouncedInput = useDebounce(input, 300);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (debouncedInput && isOpen) {
      handleFetchData(debouncedInput);
    } else {
      setSuggestions([]);
    }
  }, [debouncedInput, isOpen]);

  const handleFetchData = async (input: string) => {
    const data = await fetchData(input);
    setSuggestions(data);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleSelect = (suggestion: string) => {
    setInput(suggestion);
    setSuggestions([]);
    setIsOpen(false);

    onSelect(suggestion);
  };

  const handleInputClick = () => {
    setIsOpen(true);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  const highlightText = (text: string) => {
    const parts = text.split(new RegExp(`(${input})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === input.toLowerCase() ? <span key={index} style={{ fontWeight: 700 }}>{part}</span> : part
    );
  };

  return (
    <div className="autocomplete-container" ref={containerRef}>
      <input
        className="autocomplete-input"
        type="text"
        value={input}
        onChange={handleChange}
        onClick={handleInputClick}
        autoComplete="off"
        placeholder={placeholder || 'Type to search...'}
      />
      {isOpen && suggestions.length > 0 && (
        <ul className="autocomplete-dropdown">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className='autocomplete-item'
              onClick={() => handleSelect(suggestion)}
            >
              {highlightText(suggestion)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutoComplete;
