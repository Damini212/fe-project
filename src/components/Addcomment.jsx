import React, { useState } from "react";
import { postComments } from "../api";

export const Addcomment = ({
  setComments,
  comments,
  article_id,
  error,
  setError,
}) => {
  const [addComment, setAddComment] = useState({
    comment: "",
  });

  function handleChange(event) {
    setAddComment({ ...addComment, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (addComment.comment.trim().length < 1) {
      alert("comment is required");
    } else {
      postComments("tickle122", addComment.comment, article_id)
        .then((postedComments) => {
          setComments([postedComments, ...comments]);
          setError(null);
        })
        .catch((err) => {
          setError(err.message);
        });
      setAddComment({
        comment: "",
      });
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="comment">Comment : </label>
      <br></br>
      <textarea
        id="comment"
        type="text"
        name={"comment"}
        value={addComment.comment}
        onChange={handleChange}
      />
      <br></br>
      <button type="submit">Submit</button>
      <p>{error}</p>
    </form>
  );
};
