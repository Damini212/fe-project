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
