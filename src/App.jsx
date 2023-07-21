import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";

import Articles from "./components/articles";
import Article from "./components/Article";
import { Route, Routes } from "react-router-dom";
import Error from "./components/Error";

function App() {
  return (
    <div>
      <main>
        <Navbar />
        <Routes>
          <Route path="/" element={<Articles />}></Route>
          <Route path="/article/:article_id" element={<Article />}></Route>
          <Route
            path="*"
            element={<Error message={"Page Not Found 404"} />}
          ></Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
