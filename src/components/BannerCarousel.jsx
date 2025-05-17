import React, { useEffect, useState } from "react";
import banner1 from "../assets/banner1.png";
import banner2 from "../assets/banner1.png";
import banner3 from "../assets/banner1.png";

const banners = [banner1, banner2, banner3];

const BannerCarousel = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full my-10 relative">
      <div className="relative w-full h-[120px] md:h-[200px] lg:h-[300px] overflow-hidden rounded-xl">
        {banners.map((img, index) => (
          <img key={index} src={img} alt={`Banner ${index + 1}`} className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${current === index ? "opacity-100 z-10" : "opacity-0 z-0"}`} />
        ))}
      </div>

      <div className="flex justify-center mt-4 gap-2">
        {banners.map((_, index) => (
          <button key={index} onClick={() => setCurrent(index)} className={`w-3 h-3 rounded-full transition-all duration-300 ${current === index ? "bg-blue-600" : "bg-gray-300"}`} />
        ))}
      </div>
    </div>
  );
};

export default BannerCarousel;
