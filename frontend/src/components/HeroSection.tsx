import { Clock, Eye } from "lucide-react";
import type { Article } from "../types";

interface HeroSectionProps {
  article: Article;
}

export function HeroSection({ article }: HeroSectionProps) {
  return (
    <div className="relative h-[600px] w-full overflow-hidden">
      <img
        src={article.imageUrl}
        alt={article.title}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-8">
        <div className="max-w-7xl mx-auto">
          <span className="inline-block px-3 py-1 text-sm font-semibold text-white bg-red-600 rounded-full mb-4">
            Breaking News
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {article.title}
          </h1>
          <p className="text-lg text-gray-200 mb-4 max-w-3xl">
            {article.summary}
          </p>
          <div className="flex items-center space-x-6 text-gray-300">
            <span className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              {article.readTime} min read
            </span>
            <span className="flex items-center">
              <Eye className="w-4 h-4 mr-2" />
              {article.views} views
            </span>
            <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
