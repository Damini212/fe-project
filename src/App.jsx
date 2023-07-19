import { useEffect, useState } from "react";
import "./App.css";
import { Navbar } from "./components/Navbar";
import axios from "axios";
import { Articles } from "./components/articles";
import { Article } from "./components/Article";
import { Route, Routes } from "react-router-dom";

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  // console.log(articles);

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
        <main>
          <Navbar />
          <Routes>
            <Route path="/" element={<Articles articles={articles} />}></Route>
            <Route path="/article/:article_id" element={<Article />}></Route>
          </Routes>
        </main>
      )}
    </div>
  );
}

export default App;
