import React from "react";
import { Link } from "react-router-dom";

const PopularNews = ({ articles, gridCols = 3 }) => {
  const gridClass = gridCols === 1 ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-3";

  return (
    <section className="mt-2">
      <div className={`grid ${gridClass} gap-6 relative`}>
        {articles.map((article, index) => {
          const portal = article.portal;
          const kategori = article.categoryNews;
          const id = article.link.split("/").pop();

          return (
            <div key={index} className="relative">
              {/* Garis Vertikal */}
              {index === 1 && gridCols === 3 && (
                <>
                  <div className="hidden lg:block absolute -left-3 top-0 bottom-0 w-px bg-gray-300" />
                  <div className="hidden lg:block absolute -right-3 top-0 bottom-0 w-px bg-gray-300" />
                </>
              )}

              <Link to={`/detail/${portal}/${kategori}/${id}`} state={{ article }} className="relative flex gap-4 items-start p-3 hover:shadow-md transition duration-300">
                <div className="absolute -top-1 -left-1">
                  <div className="bg-[#1F2B39] text-white w-8 h-8 flex items-center justify-center rounded-full text-base font-bold pb-0.5">{index + 1}</div>
                </div>

                <img src={article.thumbnail} alt={article.title} className="w-48 h-44 lg:w-36 lg:h-32 object-cover rounded-md" />

                <div className="flex-1">
                  <h3 className="text-lg lg:text-sm font-semibold line-clamp-2 mb-1">{article.title}</h3>
                  <div className="text-base lg:text-xs text-gray-500 flex items-center gap-2 mt-20 lg:mt-16">
                    <span className="text-blue-600 font-medium">{article.category}</span>
                    <span>•</span>
                    <span>
                      {new Date(article.pubDate).toLocaleDateString("id-ID", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default PopularNews;
