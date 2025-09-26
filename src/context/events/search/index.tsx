// React imports
import { useState, useRef, useContext, createContext } from 'react';

// Context imports
import { useGeo } from 'context/geo';
import { useGoogleSearchApi } from 'context/api/google/search';

const SearchContext: React.Context<any> = createContext(null)

export const useSearch = () => {
  return (
    useContext(SearchContext)
  )
}

export const SearchProvider = ({children}: any) => {
  const inputRef = useRef<any>(null);

  const [ suggestionIndex, setSuggestionIndex ] = useState(0);
  const [ suggestionsActive, setSuggestionsActive ]= useState(false);
  
  const { setPlaceId } = useGeo();
  const { googleSearchData, searchText, setSearchText } = useGoogleSearchApi();

  const suggestions = googleSearchData && googleSearchData.predictions.reduce((total: any, item: any) => {
    const placeName = item.description.toLowerCase()
    total.push(placeName)
    return total
  }, []);

  const cleanSuggestions = () => {
    setSearchText("");
    setSuggestionIndex(0);
    setSuggestionsActive(false);
  }

  const handleChange = (e: any) => {
    const query = e.target.value;
    setSearchText(query);

    if (query.length > 0) {
      setSuggestionsActive(true);
    }
    else {
      setSuggestionsActive(false)
    }
  };

  const handleKeyDown = (e: any) => {
    // up arrow
    if (e.keyCode === 38) {
      if (suggestionIndex === 0) {
        return;
      }
      setSuggestionIndex(suggestionIndex - 1);
    }
    // down arrow
    else if (e.keyCode === 40) {
      if (suggestionIndex - 1 === suggestions.length) {
        return
      }
      setSuggestionIndex(suggestionIndex + 1);
    }
    // enter
    else if (e.keyCode === 13) {
      const currentSearchValue: any = suggestions && suggestions[suggestionIndex]
      getCurrentPrediction(currentSearchValue)
      currentSearchValue && setSearchText(currentSearchValue);
      cleanSuggestions();
    }

    // scape
    else if (e.keyCode === 27) {
      cleanSuggestions();
    }
  };

  const getCurrentPrediction = (currentSearchValue: any) => {
    googleSearchData && googleSearchData.predictions.forEach((item: any) => {
      const placeName = item.description.toLowerCase().trim();
      if (placeName === currentSearchValue) {
        setPlaceId(item.place_id);
      }
    })
  }

  const handleClick = (e: any) => {
    const currentSearchValue = e.target.innerText.trim();
    getCurrentPrediction(currentSearchValue)
    cleanSuggestions();
  };

  return (
    <SearchContext.Provider value={{ 
      inputRef, 
      searchText, 
      handleChange, 
      handleKeyDown, 
      suggestionsActive, 
      suggestions, 
      suggestionIndex, 
      setSuggestionIndex, 
      handleClick,
      cleanSuggestions
    }}>
      {children}
    </SearchContext.Provider>
  )
}

SearchContext.displayName = "SearchContext";