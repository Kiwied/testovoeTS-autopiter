import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import './App.css';
import Header from "./components/Header/Header";
import NavBar from "./components/NavBar/NavBar";
import NewOrgPage from "./pages/NewOrgPage";
import SavedOrgsPage from "./pages/SavedOrgsPage";

function App() {
  const [result, setResult] = React.useState({});
  const [suggestions, setSuggestions] = React.useState([]);
  const [isInputFocused, setIsInputFocused] = React.useState(false);
  const [savedResults, setSavedResults] = React.useState([]);

  // проверка для фокусировки/блюра инпута и тем самым
  // показа/скрытия "подсказок"
  React.useEffect(() => {
    const evtLstn = (evt) => {
      if (evt.target.classList.contains('orgs__search')
        || evt.target.classList.contains('suggestion')
        || evt.target.parentElement.classList.contains('suggestion'))
      {
        setIsInputFocused(true);
      } else {
        setIsInputFocused(false);
      }
    }
    document.getElementById('app').addEventListener('click', evtLstn);
    return () => document.getElementById('app').removeEventListener('click', evtLstn);
  }, [isInputFocused])

  // проверка на сохраненные организации с прошлых сессий
  React.useEffect(() => {
    localStorage.getItem('saved') && setSavedResults(JSON.parse(localStorage.getItem('saved')));
  }, [])

  // запрос к серверу для получения массива Подсказок
  const fetchSuggestions = (query) => {
    const url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/party";
    const token = "2a20a4f21d4938545a386b96e095f8a2c7eb272a";

    const options = {
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
      .then(res => setSuggestions(res.suggestions))
      .catch(error => console.log("error", error));
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
