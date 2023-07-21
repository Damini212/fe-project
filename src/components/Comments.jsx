import React, { useEffect, useState } from "react";
import { deleteComments, getCommentsByArticle } from "../api";
import { useParams } from "react-router-dom";
import { Addcomment } from "./Addcomment";

export default function Comments({ error, setError }) {
  const params = useParams();
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(true);
  const [showDeleteComment, setShowDeleteComment] = useState(false);

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

  function deleteComment(comment_id) {
    setShowDeleteComment(false);
    deleteComments(comment_id).then(() => {
      setComments(
        comments.filter((comment) => {
          return comment.comment_id !== comment_id;
        })
      );
      setShowDeleteComment(true);
    });
  }

  return (
    <div className="comments">
      {loadingComments ? (
        <p>Comments are loading ...</p>
      ) : (
        <article>
          <Addcomment
            comments={comments}
            setComments={setComments}
            article_id={params.article_id}
            setError={setError}
            error={error}
          />
          <h2>Comments</h2>
          {comments.map((comment) => {
            return (
              <div key={comment.comment_id} className="single-comment">
                <p>User - {comment.author}</p>
                <p>comment - {comment.body}</p>
                {comment.author === "jessjelly" ? (
                  <button
                    onClick={() => {
                      deleteComment(comment.comment_id);
                    }}
                    disabled={!showDeleteComment}
                  >
                    Delete
                  </button>
                ) : null}
              </div>
            );
          })}
        </article>
      )}
    </div>
  );
}
