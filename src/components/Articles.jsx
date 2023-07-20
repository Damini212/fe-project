import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getArticles, getTopics } from "../api";

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setLoading(true);
    getArticles(searchParams)
      .then((articles) => {
        setArticles(articles);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, [searchParams]);

  useEffect(() => {
    getTopics().then((topics) => {
      setTopics(topics);
    });
  }, []);

  return (
    <div>
      <p className="topic">Select A Topic From Below</p>
      {topics.map((topic) => {
        return (
          <button
            className={
              topic.slug === searchParams.get("topic")
                ? "selected-topic topics-btn"
                : "topics-btn"
            }
            key={topic.slug}
            onClick={() => {
              const newSearchParams = new URLSearchParams(searchParams);
              newSearchParams.set("topic", topic.slug);
              setSearchParams(newSearchParams);
            }}
          >
            {topic.slug}
          </button>
        );
      })}
      <div className="sort_by">
        <select
          value={searchParams.get("sort_by") ?? "created_at"}
          onChange={(event) => {
            const newSearchParams = new URLSearchParams(searchParams);
            newSearchParams.set("sort_by", event.target.value);
            setSearchParams(newSearchParams);
          }}
        >
          <option value={"created_at"}>Date</option>
          <option value={"votes"}>Votes</option>
        </select>
        <select
          value={searchParams.get("order") ?? "asc"}
          onChange={(event) => {
            const newSearchParams = new URLSearchParams(searchParams);
            newSearchParams.set("order", event.target.value);
            setSearchParams(newSearchParams);
          }}
        >
          <option value={"asc"}>Ascending</option>
          <option value={"desc"}>Descending</option>
        </select>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="articles">
          {articles.map((article) => {
            return (
              <Link
                to={`/article/${article.article_id}`}
                key={article.article_id}
                className="articles-link"
              >
                <div className="article-items">
                  <h4 className="article-items">{article.title}</h4>
                  <div className="article-items">Author - {article.author}</div>
                  <img
                    src={article.article_img_url}
                    alt={`cover of the ${article.title} book`}
                  />
                  <div className="article-items">Topic - {article.topic}</div>
                  <div className="article-items">
                    Comment Count - {article.comment_count}
                  </div>
                  <p>{new Date(article.created_at).toDateString()}</p>
                  <div className="article-items">Votes - {article.votes}</div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
