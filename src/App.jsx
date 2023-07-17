import { useEffect, useState } from "react";
import "./App.css";
import { Navbar } from "./components/Navbar";
import axios from "axios";
import { Articles } from "./components/articles";
import { Article } from "./components/Article";
import { Route, Routes } from "react-router-dom";

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get("https://nc-news-bp.onrender.com/api/articles").then((res) => {
      setArticles(res.data.articles);
      setLoading(false);
    });
  }, []);
  return (
    <div>
      {loading ? (
        "Loading Page..."
      ) : (
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Articles articles={articles} />}></Route>
            <Route path="/article/:article_id" element={<Article />}></Route>
          </Routes>
        </div>
      )}
    </div>
  );
}

export default App;
