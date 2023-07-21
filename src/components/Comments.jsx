import React, { useEffect, useState } from "react";
import { getCommentsByArticle } from "../api";
import { useParams } from "react-router-dom";
import { Addcomment } from "./Addcomment";

export default function Comments({ error, setError }) {
  const params = useParams();
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(true);
<<<<<<< Updated upstream
=======
  const [showDeleteComment, setShowDeleteComment] = useState(true);
>>>>>>> Stashed changes

  useEffect(() => {
    setLoadingComments(true);
    getCommentsByArticle(params.article_id).then((data) => {
      setComments(data.comments);
      setLoadingComments(false);
    });
  }, []);

  if (!comments) {
    return <h4>There are no comments for this article, add a comment</h4>;
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
              </div>
            );
          })}
        </article>
      )}
    </div>
  );
}
