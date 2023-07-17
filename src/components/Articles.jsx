import React from "react";

export const Articles = ({ articles }) => {
  return (
    <div className="articles">
      {articles.map((article) => {
        return (
          <div className="article-ul" key={article.article_id}>
            <h4>{article.title}</h4>
            <div>Author - {article.author}</div>
            <img src={article.article_img_url} />
            <div>Topic - {article.topic}</div>
            <div>Comment Count - {article.comment_count}</div>
            <div>Votes - {article.votes}</div>
          </div>
        );
      })}
    </div>
  );
};
