import React, { useEffect, useState } from "react";
import { fetchArticleData } from "../../../provider/Fetch-forside";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./Cards.scss";
import { FaArrowCircleRight } from "react-icons/fa";

const Cards = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { articles } = await fetchArticleData(5); // Fetch 5 articles
      setArticles(articles);
    };

    fetchData();
  }, []);

  const splitTitle = (title) => {
    const [firstWord, ...rest] = title.split(" ");
    return { firstWord, rest: rest.join(" ") };
  };

  return (
    <section>
      <div id="colorgradient">
        <article id="gradient">
          {articles.slice(0, 2).map((article, index) => {
            const { firstWord, rest } = splitTitle(article.title);
            return (
              <div id="flow" key={index}>
                <h3>
                  <span className="first-word">{firstWord}</span>
                  {rest && <span className="rest-words"> {rest}</span>}
                </h3>
                <p>{article.teaser}</p>

                {/* Wrap the icon with Link to navigate to the article details page */}
                <Link to={`/article/${article.id}`}>
                  <FaArrowCircleRight className="icon-link" />
                </Link>
              </div>
            );
          })}
        </article>
      </div>

      <article id="middle">
        {articles.slice(4, 5).map((article, index) => {
          const { firstWord, rest } = splitTitle(article.title);
          return (
            <div id="flow2" key={index}>
              <div id="sideleft">
                <h3>
                  <span className="first-word">{firstWord}</span>
                  {rest && <span className="rest-words"> {rest}</span>}
                </h3>
                <p>{article.teaser}</p>

                {/* Link to the article details page */}
                <Link to={`/article/${article.id}`}>
                  <FaArrowCircleRight className="icon-link" />
                </Link>
              </div>

              <img src={article.image_url} alt="" />
            </div>
          );
        })}
      </article>

      <article id="bottom">
        {articles.slice(2, 3).map((article, index) => {
          const { firstWord, rest } = splitTitle(article.title);
          return (
            <div id="flow3" key={index}>
              <div>
                <img src={article.image_url} alt="" />
              </div>
              <div id="sideright">
                <p>{article.teaser}</p>
                <h3>
                  <span className="first-word">{firstWord}</span>
                  {rest && <span className="rest-words"> {rest}</span>}
                </h3>

                {/* Link to the article details page */}
                <Link to={`/article/${article.id}`}>
                  <FaArrowCircleRight className="icon-link" />
                </Link>
              </div>
            </div>
          );
        })}
      </article>
    </section>
  );
};

export default Cards;
