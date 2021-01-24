import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import './App.css';
import Header from "./components/Header/Header";
import NavBar from "./components/NavBar/NavBar";
import NewOrgPage from "./pages/NewOrgPage";
import SavedOrgsPage from "./pages/SavedOrgsPage";
import { IOrg } from "./interfaces";

const App: React.FC = () => {
  const [result, setResult] = React.useState({});
  const [suggestions, setSuggestions] = React.useState<IOrg[]>([]);
  const [isInputFocused, setIsInputFocused] = React.useState(false);
  const [savedResults, setSavedResults] = React.useState([]);

  // проверка для фокусировки/блюра инпута и тем самым
  // показа/скрытия "подсказок"
  React.useEffect(() => {
    const evtLstn = (evt: MouseEvent): void => {
      if ((evt.target as HTMLElement).classList.contains('orgs__search')
        || (evt.target as HTMLElement).classList.contains('suggestion')
        || ((evt.target as HTMLElement).parentElement as HTMLElement).classList.contains('suggestion'))
      {
        setIsInputFocused(true);
      } else {
        setIsInputFocused(false);
      }
    }
    (document.getElementById('app') as HTMLElement).addEventListener('click', evtLstn);
    return () => (document.getElementById('app') as HTMLElement).removeEventListener('click', evtLstn);
  }, [isInputFocused])

  // проверка на сохраненные организации с прошлых сессий
  React.useEffect(() => {
    localStorage.getItem('saved') && setSavedResults(JSON.parse(localStorage.getItem('saved') || '[]'));
  }, [])

  // запрос к серверу для получения массива Подсказок
  const fetchSuggestions = (query: string) => {
    const url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/party";
    const token = "2a20a4f21d4938545a386b96e095f8a2c7eb272a";

    const options: RequestInit = {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": "Token " + token
      },
      body: JSON.stringify({ query: query })
    }

    fetch(url, options)
      .then(res => {
        if (res.ok) {
          return res.json()
        } else {
          return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`);
        }
      })
      .then(res => {
        let newSuggestions: IOrg[] = [];
        res.suggestions.map((org: any) => {
          let newSuggestion: IOrg = {
            value: org.value,
            data: {
              inn: org.data.inn,
              kpp: org.data.kpp,
              ogrn: org.data.ogrn,
              address: {
                data: {
                  region_with_type: org.data.address.data.region_with_type
                },
                unrestricted_value: org.data.address.unrestricted_value
              },
              type: org.data.type,
              opf: {
                full: org.data.opf.full
              },
              name: {
                full: org.data.name.full
              },
              management: {}
            }
          };
          if (org.data.management) {
            newSuggestion.data.management.post = org.data.management.post;
            newSuggestion.data.management.name = org.data.management.name;
          }
          newSuggestions.push(newSuggestion);
          return;
        })
        setSuggestions(newSuggestions);
      })
      .catch(error => console.log(error));
  }

  return (
    <div className="app" id="app">
      <Header/>

      <main className="main">
        <h1 className="main__title">Мои организации</h1>

        <section className="main__container">
          <NavBar savedResults={savedResults}
                  setResult={setResult}
                  setSuggestions={setSuggestions}
          />

          <Switch>
            <Route exact path="/">
              <NewOrgPage fetchSuggestions={fetchSuggestions}
                          suggestions={suggestions}
                          setResult={setResult}
                          setIsInputFocused={setIsInputFocused}
                          isInputFocused={isInputFocused}
                          result={result}
                          setSavedResults={setSavedResults}
                          savedResults={savedResults}
              />
            </Route>

            <Route path="/saved">
              <SavedOrgsPage savedResults={savedResults}
                             setSavedResults={setSavedResults}
              />
            </Route>
          </Switch>
        </section>
      </main>
    </div>
  );
}

export default withRouter(App);
