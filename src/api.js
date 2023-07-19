import axios from "axios";

const articleList = axios.create({
  baseURL: "https://nc-news-bp.onrender.com",
});

export const getArticles = () => {
  return articleList.get("/api/articles").then(({ data }) => {
    return data.items;
  });
};

export const getArticlesById = (article_id) => {
  return articleList.get(`/api/articles/${article_id}`).then(({ data }) => {
    return data;
  });
};
export const getCommentsByArticle = (article_id) => {
  return articleList
    .get(`/api/articles/${article_id}/comments`)
    .then(({ data }) => {
      return data;
    });
};
export const postVotes = (article_id, votes) => {
  return articleList
    .patch(`/api/articles/${article_id}`, votes)
    .then(({ data }) => {
      return data;
    });
};
