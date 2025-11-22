import { createContext, useState } from "react"
import { Outlet } from "react-router-dom";

export const SearchContext = createContext();

function SearchContextFunc() {
  const [data, setData] = useState(null);

  return (
    <SearchContext.Provider value = {{setData, data}}>
        <Outlet />
    </SearchContext.Provider>
  )
}

export default SearchContextFunc;