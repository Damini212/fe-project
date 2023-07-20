import { Link, useSearchParams, useNavigate } from "react-router-dom";

export default function Articles({ articles, topics }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  return (
    <div>
      <p className="topic">Select A Topic From Below</p>
      {topics.map((topic) => {
        return (
          <button
            className={
              topic.slug === searchParams.get("topic")
                ? "selected-topic topics-btn"
                : "topics-btn"
            }
            key={topic.slug}
            onClick={() => {
              searchParams.set("topic", topic.slug);
              navigate({ search: searchParams.toString() });
            }}
          >
            {topic.slug}
          </button>
        );
      })}
      <div className="articles">
        {articles
          .filter((article) => {
            const topic = searchParams.get("topic");
            if (topic) {
              return article.topic === topic;
            } else {
              return true;
            }
          })
          .map((article) => {
            return (
              <Link
                to={`/article/${article.article_id}`}
                key={article.article_id}
                className="articles-link"
              >
                <div className="article-items">
                  <h4 className="article-items">{article.title}</h4>
                  <div className="article-items">Author - {article.author}</div>
                  <img
                    src={article.article_img_url}
                    alt={`cover of the ${article.title} book`}
                  />
                  <div className="article-items">Topic - {article.topic}</div>
                  <div className="article-items">
                    Comment Count - {article.comment_count}
                  </div>
                  <div className="article-items">Votes - {article.votes}</div>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
}
