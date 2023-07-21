import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";

import Articles from "./components/Articles";
import Article from "./components/Article";
import { Route, Routes } from "react-router-dom";
import Error from "./components/Error";

function App() {
  const [error, setError] = useState(null);

  return (
    <div>
      <main>
        <Navbar />
        <Routes>
          <Route path="/" element={<Articles />}></Route>
          <Route
            path="/article/:article_id"
            element={<Article setError={setError} error={error} />}
          ></Route>
          <Route path="*" element={<Error />}></Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
