import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 30;
  /* const [api, setApi] = useState("unsplash"); */
  const unsplashApiKey = "E1z8KRKXgbH6GBVDNF-InjgQqYmGpSPzHUmho78Wf8o";
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => { }, [page]);

  const handleClick = async () => {
    let request = await fetch(
      `https://api.unsplash.com/search/photos?query=${search}&page=${page}&per_page=${perPage}&client_id=${unsplashApiKey}`
    );
    let rawResponse = await request.json();
    let response = rawResponse.results;
    if (rawResponse.ok) console.log("OK");
    console.log("response: ", response);
    setSearchResults(response);
  };

  return (
    <div className="App">
      <div className="container">
        <div >
          <header>
            <h1 className="fs-1 fw-bold">PicMyImage</h1>
            <p className="fw-light">Une petite phrase inutile</p>
            <div className="search">
              <input
                type="text"
                className="search-input"
                placeholder="Search..."
                name="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <a href="#" className="search-icon">
                <i className="fa fa-search" onClick={() => handleClick()}></i>
              </a>
            </div>
          </header>
          <main>
            <div className="col-12 d-flex justify-content-evenly flex-wrap">
              {searchResults.map((element, index) => {
                return (
                  <div key={index}>
                    <img
                      className="col-3 img-fluid img-thumbnail"
                      src={element.urls.small}
                      alt="val.alt_description"
                    />
                  </div>
                );
              })}
            </div>
            ;
          </main>
          <footer></footer>
        </div>
      </div>
    </div>
  );
}

export default App;
