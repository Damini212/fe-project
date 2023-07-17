import { useEffect, useState } from "react";
import "./App.css";
import { Navbar } from "./components/Navbar";
import axios from "axios";
import { Articles } from "./components/articles";

function App() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios.get("https://nc-news-bp.onrender.com/api/articles").then((res) => {
      setArticles(res.data.articles);
    });
  }, []);

  return (
    <div>
      <Navbar />
      <Articles articles={articles} />
    </div>
  );
}

export default App;
