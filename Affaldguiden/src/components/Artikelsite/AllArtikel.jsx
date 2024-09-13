import React, { useEffect, useState } from "react";
import { fetchArticleData } from "../../provider/Fetch-forside"; // Adjust the path
import "./AllArtikel.scss";

// Function to safely render HTML

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch articles on component mount
  useEffect(() => {
    const loadArticles = async () => {
      const { articles } = await fetchArticleData(10); // Limit to 10 articles, or change as needed
      setArticles(articles);
      setLoading(false);
    };

    loadArticles();
  }, []);

  if (loading) {
    return <div className="loading">Loading articles...</div>; // Add styling for this class if needed
  }

  return (
    <section className="gradient">
      <article id="articleContainer">
        <div id="top-left">
          <h2>Artikler</h2>
        </div>
        {articles.map((article) => (
          <div key={article.id} className="article-card">
            {article.image_url && (
              <img
                src={article.image_url}
                alt={article.title}
                className="article-image"
              />
            )}
            <div className="article-content">
              <h2>{article.title}</h2>
              <p>
                {article.published_at
                  ? new Date(article.published_at).toLocaleDateString()
                  : "No date available"}
              </p>
              <p>{article.teaser}</p>
              <a href={`/article/${article.id}`} className="read-more-link">
                Læs mere;
              </a>
            </div>
          </div>
        ))}
      </article>
    </section>
  );
};

export default Articles;
