import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchArticleDataById } from "../../provider/Fetch-forside";
import "./Article.scss";

const ArticleDetails = () => {
  const { id } = useParams(); // Get the article id from the URL
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedArticle = await fetchArticleDataById(id);
      setArticle(fetchedArticle);
    };

    fetchData();
  }, [id]);

  if (!article) {
    return <div>Loading...</div>;
  }

  return (
    <section className="article-details">
      <article className="article-header">
        <div>
          <h2>{article.title}</h2>
          <h3>{article.teaser}</h3>
          <p className="article-date">
            {new Date(article.published_at).toLocaleDateString()}
          </p>
          <img src={article.image_url} alt={article.title} />
        </div>
      </article>
      <article id="textContainer">
        <div dangerouslySetInnerHTML={{ __html: article.html_content }} />
      </article>
    </section>
  );
};

export default ArticleDetails;
