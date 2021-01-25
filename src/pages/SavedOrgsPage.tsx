import React from 'react';
import { SavedResult } from "../components/SavedResult/SavedResult";
import { IOrg } from "../interfaces";

interface SavedOrgsPageProps {
  setSavedResults(newSavedResults: IOrg[]): void
  savedResults: IOrg[]
}

export const SavedOrgsPage: React.FC<SavedOrgsPageProps> =
  ({ savedResults, setSavedResults }) => {
  return (
    <div className="orgs">
      {
        savedResults.map((org, i) => (
          <SavedResult org={org}
                       key={i}
                       setSavedResults={setSavedResults}
                       savedResults={savedResults}
          />
        ))
      }
    </div>
  )
}
