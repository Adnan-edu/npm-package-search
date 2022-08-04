import { useState } from "react";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useActions } from "../hooks/useActions";

const RepositoriesList: React.FC = () => {
  const [term, setTerm] = useState("");
  const { searchRepositories } = useActions();
  const { data, error, loading } = useTypedSelector(
    (state) => state.repositories
  );

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    searchRepositories(term);
  };

  return (
    <div>
      <div className="bg-gray-900 flex items-center py-10">
        <div className="max-w-md mx-auto w-full">
          <h1 className="text-white text-center text-2xl font-bold mb-5">
            Search For a Package
          </h1>
          <form onSubmit={onSubmit}>
            <div className="flex">
              <input
                className="bg-gray-50 border border-gray-300 text-sm w-full indent-2 p-2.5 outline-none focus:border-blue-500 focus:ring-2 rounded-tl rounded-bl"
                type="search"
                placeholder="Search Anything..."
                // value={searchValue}
                // onChange={handleInputChange}
                // onKeyDown={handleEnterSearch}
                value={term}
                onChange={(e) => setTerm(e.target.value)}
              />
              <button
                disabled={!term}
                className="bg-blue-600 px-6 py-2.5 text-white rounded-tr rounded-br focus:ring-2 focus:ring-blue-300 disabled:bg-gray-400"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>

      {error && <h3>{error}</h3>}
      {loading && <h3>Loading...</h3>}
      {data.length > 0 && (
        <h1 className="result_header">
          {term && `Results for ${term}`} {!term && "Results from NPM"}
        </h1>
      )}
      {!error && !loading && (
        <div className="package-list">
          {data.map((name) => (
            <div key={name}>
              <ul>
                <li>{name}</li>
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RepositoriesList;
