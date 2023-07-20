import React, { useState } from "react";
import { postComments } from "../api";

export const Addcomment = ({ setComments, comments, article_id }) => {
  const [addComment, setAddComment] = useState({
    username: "",
    comment: "",
  });

  function handleChange(event) {
    setAddComment({ ...addComment, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (addComment.username.length < 1) {
      alert("username is required");
    } else if (addComment.comment.length < 1) {
      alert("comment is required");
    } else {
      postComments(addComment.username, addComment.comment, article_id).then(
        (postedComments) => {
          setComments([postedComments, ...comments]);
        }
      );
      setAddComment({
        username: "",
        comment: "",
      });
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <lable htmlFor="username">Username : </lable>
      <input
        id="username"
        type="text"
        name={"username"}
        value={addComment.username}
        onChange={handleChange}
      />
      <br></br>
      <lable htmlFor="comment">Comment : </lable>
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
    </form>
  );
};
