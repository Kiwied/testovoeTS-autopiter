import React from "react";

import './Suggestion.css';
import { IOrg } from "../../interfaces";

interface SuggestionProps {
  data: IOrg
  setResult(newResult: IOrg): void
  setIsInputFocused(newIsInputFocused: boolean): void
}

export const Suggestion: React.FC<SuggestionProps> =
  ({ data, setResult, setIsInputFocused }) => {
  const handleSelect = () => {
    setResult(data);
    setIsInputFocused(false);
  }

  return (
    <div className="suggestion" onClick={handleSelect}>
      <h3 className="suggestion__name">{data.value}</h3>
      <p className="suggestion__info">
        {data.data.inn} {data.data.address.data.region_with_type}
      </p>
    </div>
  )
}
