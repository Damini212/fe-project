import React, { useEffect, useState } from "react";
import { getCommentsByArticle } from "../api";
import { useParams } from "react-router-dom";

export const Comments = () => {
  const params = useParams();
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(true);
  console.log(comments);

  useEffect(() => {
    setLoadingComments(true);
    getCommentsByArticle(params.article_id).then((data) => {
      setComments(data.comments);
      setLoadingComments(false);
    });
  }, []);

  if (!comments) {
    return "There are no comments for this article, add a comment";
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
                <p className="comment-author">User - {comment.author}</p>
                <p className="comment-body">comment - {comment.body}</p>
              </div>
            );
          })}
        </article>
      )}
    </div>
  );
};
