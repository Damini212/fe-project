import axios from "axios";

const articleList = axios.create({
  baseURL: "https://nc-news-bp.onrender.com",
});

export const getArticles = () => {
  return articleList.get("/api/articles").then(({ data }) => {
    return data.items;
  });
};
