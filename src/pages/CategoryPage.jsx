import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../lib/axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ArticleCard from "../components/ArticleCard";
import Pagination from "../components/Pagination";
import { Loader } from "lucide-react";
import { AiOutlineSearch } from "react-icons/ai";
import ToTopButton from "../components/ToTopButton";
import { getCategoryFromTitle } from "../constants/newsCategories";

const portals = ["antara", "cnbc", "cnn", "jpnn", "kumparan", "merdeka", "okezone", "republika", "sindonews", "suara", "tribun"];

const CategoryPage = () => {
  const { kategori } = useParams();
  const [articles, setArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 8;
  const [populer, setPopuler] = useState([]);

  useEffect(() => {
    const fetchAllNews = async () => {
      setLoading(true);
      const allArticles = [];
      await Promise.all(
        portals.map(async (portal) => {
          try {
            const res = await axiosInstance.get(`/${portal}/${kategori}`);
            if (res.data.data.posts) {
              const taggedPosts = res.data.data.posts.map((post) => ({
                ...post,
                categoryNews: kategori,
                portal: portal,
              }));
              allArticles.push(...taggedPosts);
            }
          } catch (error) {}
        })
      );
      setArticles(allArticles);
      setCurrentPage(1);
      setLoading(false);
    };

    fetchAllNews();
  }, [kategori]);

  useEffect(() => {
    const fetchPopulerNews = async () => {
      const allArticles = [];
      try {
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
            } catch (error) {}
          })
        );

        setPopuler(allArticles);
      } catch (error) {
        console.error("Error fetching popular news:", error);
      }
    };

    fetchPopulerNews();
  }, [kategori]);

  const filtered = articles.filter((a) => a.title.toLowerCase().includes(searchTerm.toLowerCase()));

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const paginated = filtered.slice(indexOfFirst, indexOfLast);
  const populerNews = populer.filter((article) => article.category && article.category !== "Lainnya").slice(0, 3);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center mb-4">
          <div className="w-1 h-6 bg-blue-500 mr-3"></div>
          <h1 className="text-2xl font-bold capitalize">{kategori.replace(/-/g, " ")}</h1>
        </div>

        <section className="mt-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Rekomendasi untuk Anda</h2>
            <div className="w-full max-w-xs hidden lg:block"></div>
            <div className="flex items-center border rounded-lg px-3 py-2 input input-bordered bg-white">
              <input type="text" placeholder="Cari berita..." className="flex-1 outline-none bg-transparent" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              <AiOutlineSearch className="text-gray-500 text-xl" />
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {paginated.map((a, i) => (
              <ArticleCard key={i} article={a} hideCategory={true} populer={populerNews} />
            ))}
          </div>
          <div className="mt-6">
            <Pagination totalItems={filtered.length} itemsPerPage={itemsPerPage} currentPage={currentPage} onPageChange={setCurrentPage} />
          </div>
        </section>
      </main>
      <Footer />
      <ToTopButton />
    </div>
  );
};

export default CategoryPage;
