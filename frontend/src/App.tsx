import { Navbar } from "./components/Navbar";
import HeroCarousel from "./components/HeroCarousel";
import useFetchArticles from "./hooks/useFetchArticles";

function App() {
  const { articles, loading, error } = useFetchArticles();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <main>
        {loading ? (
          <p className="text-center text-gray-500">Memuat berita...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <HeroCarousel articles={articles} />
        )}
      </main>
    </div>
  );
}

export default App;
