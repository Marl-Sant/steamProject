import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FaMagnifyingGlass } from "react-icons/fa6";
import "../CommunitySearch/CommunitySearch.css";

function UserSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     alert("Its working");
  //     return;
  //   };

  return (
    <div>
      <form
        className="user-search-form"
        //   onSubmit={handleSubmit}
      >
        <label>Search for your friends!</label>
        <button type="submit" className="search-button">
          <input
            type="text"
            placeholder="Search for users..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="search-bar-2"
          />
          {/* <span className="mag-glass">
            <FaMagnifyingGlass />
          </span> */}
        </button>
      </form>
      {/* {results.length ? (
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
      )} */}
    </div>
  );
}

export default UserSearch;
