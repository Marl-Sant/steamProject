import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./CommunitySearch.css";

function CommunitySearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      if (query.trim() === "") {
        setResults([]);
        return;
      }

      try {
        const res = await fetch(`/api/communities?name=${query}`);
        const data = await res.json();
        setResults(data);
      } catch (err) {
        console.error("Search failed:", err);
      }
    };

    const timeoutId = setTimeout(fetchResults, 300);
    return () => clearTimeout(timeoutId);
  }, [query]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search communities..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-bar"
      />
      {results.length ? (
        <ul className="search-div">
          {results.map((community) => (
            <NavLink
              to={`/communities/${community.Community.id}`}
              className="search-results-links"
              key={community[0]}
            >
              <li key={community.Community.id} className="search-results">
                {community.title}
              </li>
            </NavLink>
          ))}
        </ul>
      ) : (
        <></>
      )}
    </div>
  );
}

export default CommunitySearch;
