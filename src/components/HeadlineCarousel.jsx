import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { GoArrowUpRight } from "react-icons/go";

const HeadlineCarousel = ({ data, populer }) => {
  const [current, setCurrent] = useState(0);
  const headlines = data;
  const currentHeadline = headlines[current];
  const portal = currentHeadline.portal;
  const kategori = currentHeadline.categoryNews;
  const id = currentHeadline.link.split("/").pop();

  const goToPrev = () => {
    setCurrent((prev) => (prev === 0 ? headlines.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrent((prev) => (prev === headlines.length - 1 ? 0 : prev + 1));
  };

  if (headlines.length === 0) return null;

  return (
    <div className="mt-6 p-4 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6">
        {/* Text Side */}
        <div>
          <p className="text-lg font-semibold text-gray-800 mb-1">Headline</p>
          <h2 className="text-3xl font-semibold mb-2">{headlines[current].title}</h2>
          <p className="text-gray-600 mb-3 line-clamp-3">{headlines[current].description}</p>

          <div className="flex items-center text-sm text-gray-500 mb-6">
            <Calendar className="w-4 h-4 mr-2" />
            {new Date(headlines[current].pubDate).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </div>

          <Link to={`/detail/${portal}/${kategori}/${id}`} state={{ populer }} className="text-sm text-blue-500 font-semibold hover:underline flex items-center gap-1">
            Baca Selengkapnya <GoArrowUpRight className="text-lg mt-1" />
          </Link>
        </div>

        {/* Image Side */}
        <div>
          <img src={headlines[current].thumbnail} alt={headlines[current].title} className="w-full h-60 md:h-80 object-cover rounded-lg" />
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-6 gap-2">
        <button onClick={goToPrev} className="text-gray-500 hover:text-gray-700">
          <ChevronLeft size={18} />
        </button>
        <span className="text-sm text-gray-600">
          {current + 1} dari {headlines.length}
        </span>
        <button onClick={goToNext} className="text-gray-500 hover:text-gray-700">
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default HeadlineCarousel;
