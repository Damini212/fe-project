import React, { useEffect, useState } from "react";
import { getCommentsByArticle } from "../api";
import { useParams } from "react-router-dom";

export const Comments = () => {
  const params = useParams();
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(true);

  useEffect(() => {
    setLoadingComments(true);
    getCommentsByArticle(params.article_id).then((data) => {
      setComments(data.comments);
      setLoadingComments(false);
    });
  }, [params.article_id]);

  if (!comments) {
    return null;
  }

  return (
    <div>
      {loadingComments ? (
        <p>Comments are loading ...</p>
      ) : (
        <article>
          <h2>Comments</h2>
          {comments.map((comment) => {
            return (
              <div key={comment.comment_id} className="single-comment">
                <div className="comment-author">User - {comment.author}</div>
                <div className="comment-body">comment - {comment.body}</div>
              </div>
            );
          })}
        </article>
      )}
    </div>
  );
};
