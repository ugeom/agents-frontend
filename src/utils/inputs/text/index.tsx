import { useState, useCallback } from 'react';

export interface TextInputState {
  searchText: string;
  setSearchText: (text: string) => void;
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  clearInput: () => void;
}

export const useTextInput = (onSend: (text: string) => void): TextInputState => {
  const [searchText, setSearchText] = useState<string>("");

  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const query = e.target.value;
    setSearchText(query);
  }, []);

  const handleSend = useCallback(() => {
    if (searchText.trim()) {
      onSend(searchText);
      setSearchText("");
    }
  }, [searchText, onSend]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.keyCode === 13) { // enter
      e.preventDefault();
      handleSend();
    }
    else if (e.keyCode === 27) { // escape
      setSearchText("");
    }
  }, [handleSend]);

  const clearInput = useCallback(() => {
    setSearchText("");
  }, []);

  return {
    searchText,
    setSearchText,
    handleChange,
    handleKeyDown,
    clearInput
  };
};