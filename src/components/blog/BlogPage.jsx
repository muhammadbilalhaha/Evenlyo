import React, { useState } from 'react';
import { useAppSelector } from '../../hooks/useRedux';
import { Search, Calendar, ArrowRight } from 'lucide-react';

const BlogPage = () => {
  const { blogPosts } = useAppSelector((state) => state.data);
  const [searchTerm, setSearchTerm] = useState('');

  const featuredPost = blogPosts.find(p => p.isFeatured);
  const gridPosts = blogPosts.filter(p => !p.isFeatured);

  const filteredGridPosts = gridPosts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white min-h-screen">
      {/* ============== HERO BANNER ============== */}
      <section className="px-4 md:px-8 pt-6">
        <div className="relative bg-gradient-to-r from-[#d81b70] via-[#ea1d82] to-[#e91e8c] rounded-2xl pt-16 md:pt-20 pb-24 md:pb-28">
          <div className="text-center text-white px-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              News &amp; Insights
            </h1>
            <p className="text-base md:text-lg text-white/90">
              Discover the latest from Evenlyo news, stories, and inspiration
            </p>
          </div>

          {/* Floating Search Bar */}
          <div className="absolute -bottom-8 md:-bottom-9 left-1/2 -translate-x-1/2 w-[90%] max-w-3xl">
            <div className="bg-white rounded-full shadow-2xl flex items-center gap-3 px-6 py-4 border border-gray-100">
              <Search className="w-5 h-5 text-gray-400 shrink-0" />
              <input
                type="text"
                placeholder="Search Blog Here..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-transparent border-none outline-none text-sm md:text-base text-gray-800 placeholder-gray-400"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ============== CONTENT ============== */}
      <section className="container mx-auto px-4 md:px-8 pt-20 md:pt-24 pb-16">

        {/* FEATURED POST */}
        {featuredPost && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16 items-center max-w-6xl mx-auto">
            <div className="relative rounded-2xl overflow-hidden shadow-md group cursor-pointer">
              <img
                src={featuredPost.image}
                alt={featuredPost.title}
                className="w-full h-64 md:h-80 lg:h-[360px] object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-white font-bold text-xl md:text-2xl mb-1 tracking-tight">
                  GOOCHELAAR HUREN
                </h3>
                <p className="text-white/90 text-xs md:text-sm uppercase tracking-wider mb-2">
                  DE COMPLETE GIDS
                </p>
                <p className="text-white/70 text-[10px] md:text-xs">
                  TIPS • PRIJZEN • SOORTEN SHOWS • WAAR JE OP MOET LETTEN
                </p>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                <Calendar className="w-3.5 h-3.5" />
                <span>{featuredPost.date}</span>
              </div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                {featuredPost.title}
              </h2>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6">
                {featuredPost.excerpt}
              </p>
              <button className="bg-gradient-to-r from-[#d81b70] via-[#ea1d82] to-[#ff2a5d] hover:opacity-95 text-white font-semibold px-6 py-3 rounded-lg flex items-center gap-2 transition shadow-md shadow-pink-500/25 text-sm">
                Read More <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* GRID POSTS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {filteredGridPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow group cursor-pointer"
            >
              <div className="relative overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-56 md:h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{post.date}</span>
                </div>
                <h3 className="text-base md:text-lg font-bold text-gray-900 mb-3 leading-tight">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <button className="text-brand-pink font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                  Read More <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredGridPosts.length === 0 && searchTerm && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No blog posts found for "{searchTerm}"</p>
            <button
              onClick={() => setSearchTerm('')}
              className="mt-4 text-brand-pink font-semibold hover:underline"
            >
              Clear search
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default BlogPage;