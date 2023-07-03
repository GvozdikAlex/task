import React, { useState, createContext } from "react";
import logo from "./logo.svg";
import "./App.css";
import Head from "./components/Head/Head";
import Table from "./components/Table/Table";
export const DataContext = createContext(null);

function App() {
  const [dataCats, setDataCats] = useState([]);
  const [catUrl, setCatUrl] = useState("");
  return (
    <DataContext.Provider value={{ dataCats, setDataCats, catUrl, setCatUrl }}>
      <div className="App">
        <Head />
        <Table />
      </div>
    </DataContext.Provider>
  );
}

export default App;
