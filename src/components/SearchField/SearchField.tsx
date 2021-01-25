import React from "react";
import debounce from 'lodash.debounce';

import './SearchField.css';
import { Suggestion } from "../Suggestion/Suggestion";
import { IOrg } from "../../interfaces";

interface SearchFieldPorps {
  fetchSuggestions(query: string): void
  suggestions: IOrg[]
  setResult(newResult: IOrg): void
  setIsInputFocused(newIsInputFocused: boolean): void
  isInputFocused: boolean
  suggestionIndex: number
  setSuggestionIndex(newSuggestionIndex: number): void
}

export const SearchField: React.FC<SearchFieldPorps> =
  ({ fetchSuggestions, suggestions, setResult, isInputFocused,
     setIsInputFocused, suggestionIndex, setSuggestionIndex }) =>
{
  // реф введенного в инпут слова
  const keywordRef = React.useRef<HTMLInputElement>(null);

  // запрос к API подсказок с установленной задержкой
  const handleInput = debounce(() => fetchSuggestions(keywordRef.current!.value), 200)

  // стейт индекса текущей, выбранной подсказки в массиве всех Подсказок


  // хэндлер выбора подсказок при помощи клавиатуры
  const handleKeyboard = (evt: React.KeyboardEvent) => {
    setIsInputFocused(true);
    if (evt.key === 'ArrowDown') {
      evt.preventDefault();
      if (suggestions.length > 0
          && isInputFocused
          && suggestionIndex < 4)
      {
        const newSuggestionIndex = suggestionIndex + 1;
        if (newSuggestionIndex > 0) {
          document.getElementsByClassName('suggestion')[newSuggestionIndex - 1]
            .classList.toggle('suggestion_hover');
          document.getElementsByClassName('suggestion')[newSuggestionIndex]
            .classList.toggle('suggestion_hover');
          setSuggestionIndex(newSuggestionIndex);
        } else {
          document.getElementsByClassName('suggestion')[newSuggestionIndex]
            .classList.toggle('suggestion_hover');
          setSuggestionIndex(newSuggestionIndex);
        }
      }
    }

    if (evt.key === 'ArrowUp') {
      evt.preventDefault();
      if (suggestions.length > 0
        && isInputFocused
        && suggestionIndex > 0)
      {
        const newSuggestionIndex = suggestionIndex - 1;
        if (newSuggestionIndex < 4) {
          document.getElementsByClassName('suggestion')[newSuggestionIndex + 1]
            .classList.toggle('suggestion_hover');
          document.getElementsByClassName('suggestion')[newSuggestionIndex]
            .classList.toggle('suggestion_hover');
          setSuggestionIndex(newSuggestionIndex);
        } else {
          document.getElementsByClassName('suggestion')[newSuggestionIndex]
            .classList.toggle('suggestion_hover');
          setSuggestionIndex(newSuggestionIndex);
        }
      }
    }

    if (evt.key === 'Enter') {
      evt.preventDefault();
      if (suggestionIndex >= 0 && suggestionIndex <= 4) {
        setResult(suggestions[suggestionIndex]);
        setIsInputFocused(false);
        setSuggestionIndex(-1);
      }
    }

    if (evt.key === 'Escape') {
      evt.preventDefault();
      setIsInputFocused(false);
      setSuggestionIndex(-1);
      }
  }

  return (
    <>
      <input className="orgs__search"
             placeholder="Введите название, ИНН или адрес организации"
             type="text"
             ref={keywordRef}
             onChange={handleInput}
             maxLength={300}
             autoComplete="off"
             id="input"
             onKeyDown={handleKeyboard}
      />
      {
        suggestions.length > 0 && isInputFocused &&
        <div className="orgs__suggestions">
          {suggestions.slice(0, 5).map((suggestion, i) => (
            <Suggestion data={suggestion}
                        key={i}
                        setResult={setResult}
                        setIsInputFocused={setIsInputFocused}
            />
          ))}
        </div>
      }
    </>
  )
}
