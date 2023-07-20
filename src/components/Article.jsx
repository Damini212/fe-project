import React, { useEffect, useState } from "react";
import { getArticlesById, postVotes } from "../api";
import { useParams } from "react-router-dom";
import { ThumbsUp, ThumbsDown } from "react-feather";
import { Comments } from "./Comments";

export const Article = ({ setError, error }) => {
  const params = useParams();
  const [article, setArticle] = useState(null);
  const [loadingArticle, setLoadingArticle] = useState(true);
  const [updateVotes, setUpdateVotes] = useState(0);

  useEffect(() => {
    setLoadingArticle(true);
    getArticlesById(params.article_id)
      .then((data) => {
        setArticle(data.articles);
        setLoadingArticle(false);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  function postVotesToArticle(votes) {
    setUpdateVotes((currentVotes) => currentVotes + 1);
    setError(null);
    postVotes(params.article_id, { inc_votes: votes })
      .then((data) => {
        setArticle({ ...article, ...data.updatedArticle });
      })
      .catch((err) => {
        setUpdateVotes((currentVotes) => currentVotes - 1);
        setError("something went wrong, please try again");
      });
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
              <button onClick={() => postVotesToArticle(1)}>
                <ThumbsUp />
              </button>
              <p>{article.votes}</p>
              <button
                onClick={() => postVotesToArticle(-1)}
                disabled={article.votes === 0}
              >
                <ThumbsDown />
              </button>
              {error ? <p>{"something went wrong, please try again"}</p> : null}
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
