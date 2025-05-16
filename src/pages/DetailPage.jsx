import React, { useEffect, useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { axiosInstance } from "../lib/axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PopularNews from "../components/PopulerNews";
import ArticleCard from "../components/ArticleCard";
import { Loader } from "lucide-react";
import { BiHomeAlt2 } from "react-icons/bi";
import ToTopButton from "../components/ToTopButton";

const DetailPage = () => {
  const { portal, kategori, id } = useParams();
  const location = useLocation();
  const populer = location.state?.populer || [];

  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetailArticle = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get(`/${portal}/${kategori}`);
        const posts = (res?.data?.data?.posts || []).map((item) => ({
          ...item,
          categoryNews: kategori,
          portal: portal,
        }));

        const selected = posts.find((item) => item.link.endsWith(id));
        setArticle(selected);

        const related = posts.filter((item) => item.link !== selected?.link && item.link.includes(portal));
        setRelatedArticles(related.slice(0, 4));

        setLoading(false);
      } catch (err) {
        console.error("Error fetching detail:", err);
        setLoading(false);
      }
    };

    fetchDetailArticle();
  }, [portal, kategori, id]);

  if (loading || !article) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="w-10 h-10 animate-spin" />
      </div>
    );
  }

  return (
    <>
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-600 mb-6">
          <ol className="inline-flex space-x-1">
            <li className="flex gap-1">
              <BiHomeAlt2 className="text-base mt-0.5" />
              <a href="/" className="hover:underline">
                Beranda
              </a>
              <span> &gt; </span>
            </li>
            <li>
              <a href={`/${kategori}`} className="hover:underline capitalize">
                {kategori}
              </a>
              <span> &gt; </span>
            </li>
            <li className="text-gray-800 font-semibold">Detail</li>
          </ol>
        </nav>

        {/* Artikel dan Populer */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <article className="lg:col-span-2">
            <h1 className="text-3xl font-bold mb-3 leading-tight">{article.title}</h1>

            <div className="flex items-center text-sm text-blue-600 space-x-2 mb-6">
              <span className="cursor-pointer hover:underline capitalize">{kategori}</span>
              <span>•</span>
              <time dateTime={article.pubDate}>
                {new Date(article.pubDate).toLocaleDateString("id-ID", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </time>
            </div>

            {article.thumbnail && <img src={article.thumbnail} alt={article.title} className="w-full h-72 object-cover rounded mb-2" />}
            {article.thumbnail && article.title && (
              <p className="text-xs text-gray-500 mb-6">
                {article.title} (Sumber: {article.source || "CNN Indonesia"})
              </p>
            )}

            <p className="text-base leading-relaxed mb-8 whitespace-pre-line">{article.description}</p>

            <div className="mb-12">
              <a href={article.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                Baca selengkapnya di sumber asli
              </a>
            </div>

            {/* Komentar */}
            <section className="mb-12 border-t border-gray-300 pt-6">
              <h2 className="text-lg font-semibold border-l-4 border-blue-600 pl-3 mb-6">Komentar</h2>
              <div className="flex items-start space-x-4 mb-8">
                <img src="https://i.pravatar.cc/40" alt="User Avatar" className="w-10 h-10 rounded-full" />
                <div className="flex-1">
                  <textarea placeholder="Apa yang ingin anda tanyakan?" className="w-full border border-gray-300 rounded-md p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-600" rows={3} maxLength={50}></textarea>
                  <div className="text-right text-xs text-gray-400 mt-1">0/50</div>
                  <button className="mt-3 bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition" type="button">
                    Kirim
                  </button>
                </div>
              </div>

              {/* Contoh komentar */}
              <div className="space-y-6">
                <div className="flex space-x-4">
                  <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Ujang Yusmeidi" className="w-12 h-12 rounded-full" />
                  <div>
                    <div className="font-bold text-sm">UJANG YUSMEIDI S.P., M.Agr.</div>
                    <div className="text-xs text-gray-500 mb-2">28 Mar 2024 11:15</div>
                    <p>Mohon maaf, apakah sertifikatnya sudah tidak dapat didunduh? Karena saya mau download ada konfirmasi bahwa TOTP aktivasi salah Bagaimana ya solusinya ?</p>
                    <button className="text-blue-600 text-sm mt-1 hover:underline">Balas</button>

                    {/* Balasan */}
                    <div className="flex space-x-4 mt-4 ml-14">
                      <img src="https://randomuser.me/api/portraits/women/45.jpg" alt="Dina Rikha" className="w-10 h-10 rounded-full" />
                      <div>
                        <div className="font-semibold text-sm">DINA RIKHA RIYANAWATI, S.Pd</div>
                        <div className="text-xs text-gray-500 mb-2">28 Mar 2024 11:15</div>
                        <p>saya mengunduh sertifikatnya kok juga belum bisa</p>
                        <button className="text-blue-600 text-sm mt-1 hover:underline">Balas</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between mt-8 text-sm text-gray-600">
                <div>
                  Item per page{" "}
                  <select className="border border-gray-300 rounded px-2 py-1">
                    <option>5</option>
                    <option>10</option>
                    <option>20</option>
                    <option>50</option>
                  </select>{" "}
                  of 200
                </div>
                <div className="space-x-3">
                  <button className="text-blue-600 hover:underline">{"<"}</button>
                  <button className="font-bold">1</button>
                  <button className="hover:underline">2</button>
                  <button className="text-blue-600 hover:underline">{">"}</button>
                </div>
              </div>
            </section>

            {/* Berita Terkait */}
            <section>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold border-l-4 border-blue-600 pl-3">Berita Terkait</h2>
                <Link to={`/${kategori}`} className="btn btn-outline btn-info bg-blue-50 text-sm">
                  Lihat Semua
                </Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {relatedArticles.map((item, i) => (
                  <ArticleCard key={i} article={item} hideCategory={true} populer={populer} />
                ))}
              </div>
            </section>
          </article>

          {/* Sidebar berita populer */}
          <aside>
            <h2 className="text-lg font-semibold border-l-4 border-blue-600 pl-3 mb-6">Berita Terpopuler</h2>
            <PopularNews articles={populer} gridCols={1} />
          </aside>
        </div>
      </main>

      <Footer />
      <ToTopButton />
    </>
  );
};

export default DetailPage;
