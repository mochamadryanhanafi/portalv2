import { useState, useEffect } from "react";
import axios from "axios";
import type { Article } from "../types";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000"; // Perbaiki URL backend

export default function useFetchArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(`${API_URL}/news/detik`);
        setArticles(response.data);
      } catch (err) {
        console.error("Gagal mengambil berita:", err);
        setError("Gagal memuat berita.");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return { articles, loading, error };
}
