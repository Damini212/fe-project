
import React, { useEffect, useState } from "react";
import { getArticles, getArticlesById } from "../api";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Comments } from "./Comments";

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
  }, []);

  if (!article) {
    return null;
  }

  return (
    <article>
      {loadingArticle ? (
        "Article is loading..."
      ) : (
        <div className="article-page">
          <div className="article">
            <h4 className="article-items">{article.title}</h4>
            <p className="article-items">Author - {article.author}</p>
            <p className="article-items">Topic - {article.topic}</p>
            <img
              className="article-image"
              src={article.article_img_url}
              alt={`cover of the ${article.title} book`}
            />
            <p>{article.body}</p>
            <div className="article-items">
              Comment Count - {article.comment_count}
            </div>
            <div className="article-btns">
              <button>Votes - {article.votes}</button>
              <button>Comment</button>
            </div>
          </div>
          <div className="comments">
            <Comments />
          </div>
        </div>
      )}
    </article>
  );
};
