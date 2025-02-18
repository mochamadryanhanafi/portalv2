import { useState } from "react";
import { Menu, Search, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const categories = [
  { id: "national", label: "National" },
  { id: "international", label: "International" },
  { id: "economy", label: "Economy & Policy" },
  { id: "government", label: "Government" },
  { id: "law", label: "Law" },
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo & Mobile Menu Button */}
          <div className="flex items-center">
            <button
              className="p-2 rounded-md lg:hidden focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            <div className="ml-4 flex items-center">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">PoliticsHub</h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {categories.map((category) => (
              <a
                key={category.id}
                href={`/category/${category.id}`}
                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 text-sm font-medium"
              >
                {category.label}
              </a>
            ))}
          </div>

          {/* Search & Theme Toggle */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search news..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-gray-900 shadow-md py-2">
          {categories.map((category) => (
            <a
              key={category.id}
              href={`/category/${category.id}`}
              className="block text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-4 py-2 text-sm font-medium"
            >
              {category.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
