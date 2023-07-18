import React from "react";
import { Link } from "react-router-dom";

export const Articles = ({ articles }) => {
  return (
    <div className="articles">
      {articles.map((article) => {
        return (
          <Link
            to={`/article/${article.article_id}`}
            key={article.article_id}
            className="articles-link"
          >
            <div className="article-items">
              <h4
                className="article-items"
                onClick={() => setCurrentArticleId(article.article_id)}
              >
                {article.title}
              </h4>
              <div className="article-items">Author - {article.author}</div>
              <img
                src={article.article_img_url}
                alt={`cover of the ${article.title} book`}
              />
              <div className="article-items">Topic - {article.topic}</div>
              <div className="article-items">
                Comment Count - {article.comment_count}
              </div>
              <div className="article-items">Votes - {article.votes}</div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};
