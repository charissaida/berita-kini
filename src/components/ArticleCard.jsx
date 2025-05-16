import React from "react";
import { Link } from "react-router-dom";

const ArticleCard = ({ article, hideCategory = false, populer }) => {
  const portal = article.portal;
  const kategori = article.categoryNews;
  const id = article.link.split("/").pop();

  return (
    <Link to={`/detail/${portal}/${kategori}/${id}`} state={{ populer }} className="bg-white rounded-lg shadow hover:shadow-md transition duration-300 flex flex-col h-full">
      {/* Gambar */}
      <img src={article.thumbnail} alt={article.title} className="w-full h-40 object-cover rounded-t-lg" />

      {/* Konten */}
      <div className="p-3 flex flex-col flex-1">
        {/* Judul */}
        <h3 className="text-sm font-semibold line-clamp-2 mb-4">{article.title}</h3>

        {/* Kategori & Tanggal */}
        <div className="mt-auto text-xs text-gray-500 flex items-center gap-2">
          {!hideCategory && (
            <>
              <span className="text-blue-600 font-medium">{article.category}</span>
              <span>•</span>
            </>
          )}
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
  );
};

export default ArticleCard;
