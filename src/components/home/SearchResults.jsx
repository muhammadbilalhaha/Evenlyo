import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { resetFilters, openVendorDetail } from '../../features/ui/uiSlice';
import {
  SearchX, Heart, Star,
  PartyPopper, Music, Utensils, Tent, Users, Armchair, Lightbulb, Sofa,
  Flower2, UtensilsCrossed, Castle, Baby, Disc, Car, Flame, Mic2, Guitar,
  Wand2, Camera, Headphones, Mic, Palette, Truck, ChefHat, GlassWater, Cake,
  Palmtree, Anchor, Video, Shield, ClipboardList, Warehouse, Loader2
} from 'lucide-react';

const iconMap = {
  PartyPopper, Music, Utensils, Tent, Users, Armchair, Lightbulb, Sofa,
  Flower2, UtensilsCrossed, Castle, Baby, Disc, Car, Flame, Mic2, Guitar,
  Wand2, Camera, Headphones, Mic, Palette, Truck, ChefHat, GlassWater, Cake,
  Palmtree, Anchor, Video, Shield, ClipboardList, Warehouse
};

const SearchResults = () => {
  const dispatch = useAppDispatch();
  const {
    isSearching, isLoading, searchResults,
    searchQuery, location, activeCategory, activeSubcategory
  } = useAppSelector((state) => state.ui);
  const { categories, subcategories, vendors } = useAppSelector((state) => state.data);

  const renderIcon = (iconName, className = "w-5 h-5") => {
    const IconComponent = iconMap[iconName] || PartyPopper;
    return <IconComponent className={className} />;
  };

  // 1. Loading State
  if (isLoading) {
    return (
      <section id="search-results-section" className="py-24 bg-white">
        <div className="container mx-auto px-4 text-center">
          <Loader2 className="w-10 h-10 text-brand-pink animate-spin mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Searching for vendors...</h2>
          <p className="text-gray-500">Please wait while we find the best matches for you.</p>
        </div>
      </section>
    );
  }

  if (!isSearching) return null;

  // Related Items Logic: Find vendors in the SAME category but DIFFERENT subcategory
  const relatedVendors = vendors.filter(v => {
    if (activeSubcategory) {
      return v.categoryId === activeCategory && v.subcategoryId !== activeSubcategory;
    }
    return v.categoryId === activeCategory;
  }).slice(0, 3);

  // --- Vendor Card Component (reusable) ---
  const VendorCard = ({ vendor }) => {
    const catIcon = categories.find(c => c.id === vendor.categoryId)?.icon;

    const handleClick = () => {
      dispatch(openVendorDetail(vendor));
    };

    return (
      <div
        onClick={handleClick}
        className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow flex flex-col cursor-pointer"
      >
        {/* Image / Icon Placeholder */}
        <div className="relative h-48 bg-gradient-to-br from-pink-100 via-pink-50 to-white flex items-center justify-center border-b border-gray-100">
          {renderIcon(catIcon, "w-20 h-20 text-brand-pink opacity-40")}
          <button
            onClick={(e) => e.stopPropagation()}
            className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-sm hover:bg-pink-50 transition"
          >
            <Heart className="w-4 h-4 text-brand-pink" />
          </button>
          {vendor.available && (
            <span className="absolute top-3 left-3 bg-green-100 text-green-700 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide">
              Available
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-1">
          {/* Vendor Name Badge */}
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-gray-100 text-gray-700 text-[10px] font-semibold px-2 py-0.5 rounded">
              {vendor.vendorName || 'Verified Vendor'}
            </span>
          </div>

          {/* Title */}
          <h4 className="font-bold text-gray-900 mb-1.5 text-sm leading-tight">
            {vendor.name}
          </h4>

          {/* Description */}
          <p className="text-xs text-gray-500 mb-3 line-clamp-2 leading-relaxed">
            {vendor.description}
          </p>
          <span className="text-xs text-brand-pink font-semibold hover:underline mb-3">
            Read More
          </span>

          {/* Location */}
          <div className="text-[11px] text-gray-500 space-y-1 mb-3">
            <p className="flex items-start gap-1">
              <span className="font-semibold text-gray-700 shrink-0">Location:</span>
              <span className="truncate">{vendor.location}</span>
            </p>
            <p className="flex items-start gap-1">
              <span className="font-semibold text-gray-700 shrink-0">Category:</span>
              <span className="truncate">{categories.find(c => c.id === vendor.categoryId)?.name}</span>
            </p>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-4">
            {vendor.reviews > 0 ? (
              <>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-3 h-3 ${i < Math.floor(vendor.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                ))}
                <span className="text-[10px] text-gray-500 ml-1">{vendor.rating}/5 ({vendor.reviews} Reviews)</span>
              </>
            ) : (
              <span className="text-[10px] text-gray-400">No reviews yet</span>
            )}
          </div>

          {/* Price + Book Button */}
          <div className="mt-auto flex items-center justify-between gap-2 pt-3 border-t border-gray-100">
            <div className="flex-1">
              <span className="text-lg font-bold text-gray-900">€{vendor.price.toFixed(2)}</span>
              <span className="text-[10px] text-gray-500 block">per day</span>
            </div>
            <button
              onClick={(e) => e.stopPropagation()}
              className="bg-brand-pink hover:bg-pink-600 text-white text-xs font-semibold px-4 py-2.5 rounded-lg transition"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="search-results-section" className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4">

        {/* Search Results Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Search Results <span className="text-gray-400 font-normal">({searchResults.length})</span>
          </h2>
          <p className="text-gray-500 text-sm">
            Here are the listings that match your search criteria
            {searchQuery && <span> for "<span className="text-brand-pink font-semibold">{searchQuery}</span>"</span>}
            {location && <span> in <span className="text-brand-pink font-semibold">{location}</span></span>}
          </p>
        </div>

        {searchResults.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
            {searchResults.map((vendor) => (
              <VendorCard key={vendor.id} vendor={vendor} />
            ))}
          </div>
        ) : (
          <>
            {/* Empty State */}
            <div className="text-center py-12 max-w-lg mx-auto">
              <div className="w-16 h-16 bg-yellow-50 rounded-full flex items-center justify-center mx-auto mb-5">
                <SearchX className="w-8 h-8 text-yellow-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">No exact match found</h3>
              <p className="text-gray-500 text-sm mb-8">
                We don't have any providers for this service in your area yet.<br />
                Check out similar options below.
              </p>
              <button
                onClick={() => dispatch(resetFilters())}
                className="border border-brand-pink text-brand-pink hover:bg-pink-50 font-semibold px-6 py-3 rounded-lg text-sm transition"
              >
                Explore other categories
              </button>
            </div>

            {/* Related Items */}
            {relatedVendors.length > 0 && (
              <div className="mt-16">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">Related Items</h3>
                  <p className="text-gray-500 text-sm">
                    Other services in the same category you might like
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
                  {relatedVendors.map((vendor) => (
                    <VendorCard key={vendor.id} vendor={vendor} />
                  ))}
                </div>
              </div>
            )}
          </>
        )}

      </div>
    </section>
  );
};

export default SearchResults;