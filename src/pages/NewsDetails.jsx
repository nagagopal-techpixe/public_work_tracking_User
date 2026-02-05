import React, { useEffect, useState } from "react";
import { getNewsById } from "../api/eventsApi";

const NewsDetails = ({ newsId, navigate }) => {

  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (newsId) fetchNews();
  }, [newsId]);

const fetchNews = async () => {
  try {
    const res = await getNewsById(newsId);

    // API returns { success, news: {...} }
    setNews(res.news);

  } catch (err) {
    console.error(err);

  } finally {
    setLoading(false);
  }
};

  if (!newsId) {
    return <p className="text-center p-10">No News Selected</p>;
  }

  if (loading) {
    return <p className="text-center p-10">Loading...</p>;
  }

  return (
    <div className="container mx-auto px-4 py-12">

      {/* Back Button */}
      <button
        onClick={() => navigate("news")}
        className="text-orange-600 mb-6 font-semibold"
      >
        ← Back to News
      </button>

      {/* Image */}
      <img
        src={news.newsimage}
        alt="news"
        className="w-full h-96 object-cover rounded-xl mb-6"
      />

      {/* Title */}
      <h1 className="text-3xl font-bold mb-3">
        {news.headlines}
      </h1>

      {/* Meta */}
      <p className="text-gray-500 mb-4">
        {news.category} •{" "}
        {new Date(news.newsdate).toLocaleDateString()}
      </p>

      {/* Description */}
      <p className="text-slate-700 leading-relaxed text-lg">
        {news.newsdescription}
      </p>

    </div>
  );
};

export default NewsDetails;
