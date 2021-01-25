import React from 'react';

import { SearchField } from "../components/SearchField/SearchField";
import plusSign from "../images/plus_sign.svg";
import SearchResult from "../components/SearchResult/SearchResult";
import './NewOrgPage.css';
import { IOrg } from "../interfaces";

interface NewOrgPageProps {
  fetchSuggestions(query: string): void
  suggestions: IOrg[]
  setResult(result: IOrg): void
  setIsInputFocused(isInputFocused: boolean): void
  isInputFocused: boolean
  result: IOrg | {}
  setSavedResults(savedResults: IOrg[]): void
  savedResults: IOrg[]
}

export const NewOrgPage: React.FC<NewOrgPageProps> =
  ({ fetchSuggestions, suggestions, setResult,
     setIsInputFocused, isInputFocused, result,
     setSavedResults, savedResults }) =>
{
  // вспомогательная функция для проверки объекта на "пустоту"
  function isEmpty(obj: {}):boolean {
    for(var key in obj) {
      if(obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }

  return (
    <div className="orgs">
      <label className="orgs__title" htmlFor="input">Организация или ИП</label>
      <SearchField fetchSuggestions={fetchSuggestions}
                   suggestions={suggestions}
                   setResult={setResult}
                   setIsInputFocused={setIsInputFocused}
                   isInputFocused={isInputFocused}
      />
      {
        // проверка для определения отрисовки результата
        // или его отсутствия
        isEmpty(result) ? (
          <div className="orgs__no-results">
            <img src={plusSign}
                 alt="Добавление новой организации"
                 className="orgs__add-org-icon"/>
            <p className="orgs__add-org-text">
              Для добавления новой организации введите ее
              название, ИНН или адрес.
            </p>
          </div>
        ) : (
          <SearchResult result={result}
                        setSavedResults={setSavedResults}
                        savedResults={savedResults}
          />
        )
      }
    </div>
  )
}
