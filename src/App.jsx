import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import axios from "axios";
import Articles from "./components/Articles";
import Article from "./components/Article";
import { Route, Routes } from "react-router-dom";
import Error from "./components/Error";
import { getTopics } from "./api";

export default function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://nc-news-bp.onrender.com/api/articles")
      .then((res) => {
        setArticles(res.data.articles);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  useEffect(() => {
    getTopics().then((data) => {
      setTopics(data.topics);
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
            <Route
              path="/"
              element={<Articles articles={articles} topics={topics} />}
            ></Route>
            <Route
              path="/article/:article_id"
              element={<Article setError={setError} error={error} />}
            ></Route>
            <Route path="*" element={<Error />}></Route>
          </Routes>
        </main>
      )}
    </div>
  );
}
