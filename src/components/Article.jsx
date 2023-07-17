import React, { useEffect, useState } from "react";
import { getArticles, getArticlesById } from "../api";
import axios from "axios";
import { useParams } from "react-router-dom";

export const Article = () => {
  const params = useParams();
  const [article, setArticle] = useState(null);
  const [loadingArticle, setLoadingArticle] = useState(false);

  useEffect(() => {
    setLoadingArticle(true);
    getArticlesById(params.article_id).then((data) => {
      setArticle(data.articles);
      setLoadingArticle(false);
    });
  }, [params.article_id]);

  if (!article) {
    return null;
  }

  return (
    <div>
      {loadingArticle ? (
        "Article is loading..."
      ) : (
        <div className="article-page">
          <h4>{article.title}className="article-items"</h4>
          <div className="article-items">Author - {article.author}</div>
          <img className="article-image" src={article.article_img_url} />
          <div className="article-items">Topic - {article.topic}</div>
          <div className="article-items">
            Comment Count - {article.comment_count}
          </div>
          <div className="article-btns">
            <button>Votes - {article.votes}</button>
            <button>Comment</button>
          </div>
        </div>
      )}
    </div>
  );
};
