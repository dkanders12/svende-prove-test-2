import React, { useEffect, useState } from "react";
import { fetchArticleData } from "../../../provider/Fetch-forside";
import "./Cards.scss";
import { FaArrowCircleRight } from "react-icons/fa";

const Cards = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { articles } = await fetchArticleData(4); // Fetch 4 articles
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

                <FaArrowCircleRight className="icon-link" />
              </div>
            );
          })}
        </article>
      </div>

      <article>
        {articles.slice(2, 3).map((article, index) => {
          const { firstWord, rest } = splitTitle(article.title);
          return (
            <div id="flow" key={index}>
              <h3>
                <span className="first-word">{firstWord}</span>
                {rest && <span className="rest-words"> {rest}</span>}
              </h3>
              <p>{article.teaser}</p>
              <img src={article.image_url} alt="" />

              <FaArrowCircleRight className="icon-link" />
            </div>
          );
        })}
      </article>
    </section>
  );
};

export default Cards;
