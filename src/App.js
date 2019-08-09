import React from "react";
import Nav from "./components/Nav";
import Search from "./components/Search";
import categories from "./data/Categories";

const App = () => (
  <div>
    <Nav categories={categories} />
    <Search />
  </div>
);

export default App;
