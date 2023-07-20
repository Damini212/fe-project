import axios from "axios";

const articleList = axios.create({
  baseURL: "https://nc-news-bp.onrender.com",
});

export const getArticles = (searchParams) => {
  if (!searchParams.has("sort_by")) {
    searchParams.set("sort_by", "created_at");
  }
  if (!searchParams.has("order")) {
    searchParams.set("order", "asc");
  }
  return articleList
    .get("/api/articles", {
      params: searchParams,
    })
    .then(({ data }) => {
      return data.articles;
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

export const postComments = (username, body, article_id) => {
  return articleList
    .post(`/api/articles/${article_id}/comments`, { username, body })
    .then(({ data }) => {
      return data.comment;
    });
};

export const getTopics = () => {
  return articleList.get("/api/topics").then(({ data }) => {
    return data.topics;
  });
};
