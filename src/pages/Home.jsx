import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Carousel from "../components/HeadlineCarousel";
import ArticleCard from "../components/ArticleCard";
import BannerCarousel from "../components/BannerCarousel";
import Pagination from "../components/Pagination";
import ToTopButton from "../components/ToTopButton";
import { axiosInstance } from "../lib/axios";
import { Loader } from "lucide-react";
import PopularNews from "../components/PopulerNews";
import { AiOutlineSearch } from "react-icons/ai";
import { getCategoryFromTitle } from "../constants/newsCategories";

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [loading, setLoading] = useState(true);
  const portals = ["antara", "cnbc", "cnn", "jpnn", "kumparan", "merdeka", "okezone", "republika", "sindonews", "suara", "tribun"];

  useEffect(() => {
    const fetchAllNews = async () => {
      setLoading(true);
      const allArticles = [];

      await Promise.all(
        portals.map(async (portal) => {
          try {
            const res = await axiosInstance.get(`/${portal}/terbaru`);

            if (res?.data?.data?.posts && Array.isArray(res.data.data.posts)) {
              const categorizedPosts = res.data.data.posts.map((post) => ({
                ...post,
                category: getCategoryFromTitle(post.title),
                categoryNews: "terbaru",
                portal: portal,
              }));
              allArticles.push(...categorizedPosts);
            }
          } catch (error) {
            console.error(`Error fetching ${portal}/terbaru`, error);
          }
        })
      );

      setArticles(allArticles);
      setLoading(false);
    };

    fetchAllNews();
  }, []);

  const filtered = articles.filter((a) => a.title.toLowerCase().includes(searchTerm.toLowerCase()));
  const start = (currentPage - 1) * itemsPerPage;
  const paginated = filtered.slice(start, start + itemsPerPage);
  const populer = articles.filter((article) => article.category && article.category !== "Lainnya").slice(0, 3);
  const headline = articles.slice(0, 5);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <>
      <Header />

      <main className="container mx-auto px-4">
        <section className="mt-6">
          <Carousel data={headline} populer={populer} />
        </section>

        <section className="mt-10">
          <div className="flex items-center mb-4">
            <div className="w-1 h-6 bg-blue-500 mr-3"></div>
            <h2 className="text-xl font-bold">Berita Terpopuler</h2>
          </div>
          <PopularNews articles={populer} />
        </section>

        <section className="mt-10">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center mb-4">
              <div className="w-1 h-6 bg-blue-500 mr-3"></div>
              <h2 className="text-xl font-bold">Rekomendasi untuk Anda</h2>
            </div>
            <div className="w-full max-w-xs hidden lg:block"></div>
            <div className="flex items-center border rounded-lg px-3 py-2 input input-bordered bg-white">
              <input type="text" placeholder="Cari berita..." className="flex-1 outline-none bg-transparent" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              <AiOutlineSearch className="text-gray-500 text-xl" />
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {paginated.map((a, i) => (
              <ArticleCard key={i} article={a} populer={populer} />
            ))}
          </div>
          <Pagination totalItems={filtered.length} itemsPerPage={itemsPerPage} currentPage={currentPage} onPageChange={setCurrentPage} />
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-bold mb-4">Banner</h2>
          <BannerCarousel />
        </section>
      </main>

      <Footer />
      <ToTopButton />
    </>
  );
};

export default Home;
