import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import {
  setActiveCategory,
  setActiveSubcategory,
  toggleShowAllSubcategories,
  startCategoryLoading,
  finishCategoryLoading,
  openVendorDetail
} from '../../features/ui/uiSlice';
import {
  PartyPopper, Music, Utensils, Tent, Users, Armchair, Lightbulb, Sofa,
  Flower2, UtensilsCrossed, Castle, Baby, Disc, Car, Flame, Mic2, Guitar,
  Wand2, Camera, Headphones, Mic, Palette, Truck, ChefHat, GlassWater, Cake,
  Palmtree, Anchor, Video, Shield, ClipboardList, Warehouse,
  Heart, Star, SearchX, Loader2
} from 'lucide-react';

const iconMap = {
  PartyPopper, Music, Utensils, Tent, Users, Armchair, Lightbulb, Sofa,
  Flower2, UtensilsCrossed, Castle, Baby, Disc, Car, Flame, Mic2, Guitar,
  Wand2, Camera, Headphones, Mic, Palette, Truck, ChefHat, GlassWater, Cake,
  Palmtree, Anchor, Video, Shield, ClipboardList, Warehouse
};

const ExploreCategories = () => {
  const dispatch = useAppDispatch();
  const { categories, subcategories, vendors } = useAppSelector((state) => state.data);
  const {
    activeCategory, activeSubcategory, showAllSubcategories,
    isLoadingCategory
  } = useAppSelector((state) => state.ui);

  const currentSubcategories = subcategories[activeCategory] || [];
  const displayedSubcategories = showAllSubcategories
    ? currentSubcategories
    : currentSubcategories.slice(0, 12);

  const filteredVendors = vendors.filter(vendor => {
    if (activeSubcategory) {
      return vendor.categoryId === activeCategory && vendor.subcategoryId === activeSubcategory;
    }
    return vendor.categoryId === activeCategory;
  });

  const renderIcon = (iconName, className = "w-5 h-5") => {
    const IconComponent = iconMap[iconName] || PartyPopper;
    return <IconComponent className={className} />;
  };

  const handleCategoryClick = (categoryId) => {
    dispatch(startCategoryLoading());
    dispatch(setActiveCategory(categoryId));
    setTimeout(() => {
      dispatch(finishCategoryLoading());
    }, 2500);
  };

  const handleSubcategoryClick = (subcategoryId) => {
    dispatch(startCategoryLoading());
    dispatch(setActiveSubcategory(subcategoryId));
    setTimeout(() => {
      dispatch(finishCategoryLoading());
    }, 2500);
  };

  // ---------- Vendor Card Component ----------
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
          {renderIcon(catIcon, "w-20 h-20 text-brand-pink opacity-30")}
          <button
            onClick={(e) => e.stopPropagation()}
            className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-sm hover:bg-pink-50 transition"
          >
            <Heart className="w-4 h-4 text-brand-pink" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-1">
          <div className="flex items-center justify-between mb-2">
            <span className="bg-gray-100 text-gray-700 text-[10px] font-semibold px-2 py-0.5 rounded">
              {vendor.vendorName || 'Verified Vendor'}
            </span>
            {vendor.available && (
              <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
                ● Available
              </span>
            )}
          </div>

          <h4 className="font-bold text-gray-900 mb-1.5 text-sm leading-tight">
            {vendor.name}
          </h4>

          <p className="text-xs text-gray-500 mb-2 line-clamp-2 leading-relaxed">
            {vendor.description}
          </p>
          <span className="text-xs text-brand-pink font-semibold hover:underline mb-3">
            Read More
          </span>

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
    <section
      id="categories"
      className="py-16 md:py-20 bg-white min-h-screen scroll-mt-20"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
          Explore <span className="text-brand-pink">Categories</span>
        </h2>

        {/* Main Categories */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-10 mb-10">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <div
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                className="flex flex-col items-center gap-3 cursor-pointer group w-24 md:w-28"
              >
                <div className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center transition-all duration-300
                  ${isActive
                    ? 'bg-brand-pink text-white shadow-[0_0_20px_rgba(233,30,140,0.4)] scale-110'
                    : 'bg-white border border-gray-200 text-gray-600 group-hover:border-brand-pink group-hover:text-brand-pink'}`}>
                  {renderIcon(cat.icon, "w-6 h-6")}
                </div>
                <span className={`text-[11px] md:text-xs text-center transition font-medium leading-tight
                  ${isActive ? 'text-brand-pink font-semibold' : 'text-gray-500 group-hover:text-brand-pink'}`}>
                  {cat.name.split(' & ').map((line, i) => (
                    <React.Fragment key={i}>{line}{i === 0 && <br />}</React.Fragment>
                  ))}
                </span>
              </div>
            );
          })}
        </div>

        {/* Subcategories */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-12">
          {displayedSubcategories.map((sub) => {
            const isActive = activeSubcategory === sub.id;
            return (
              <button
                key={sub.id}
                onClick={() => handleSubcategoryClick(sub.id)}
                className={`px-4 py-2 rounded-full text-xs md:text-sm font-medium flex items-center gap-2 transition-all duration-200 border
                  ${isActive
                    ? 'bg-brand-pink border-brand-pink text-white shadow-[0_4px_14px_rgba(233,30,140,0.4)]'
                    : 'bg-white border-gray-200 text-gray-500 hover:border-brand-pink hover:text-brand-pink'}`}
              >
                {renderIcon(sub.icon, "w-4 h-4")}
                <span className="whitespace-nowrap">{sub.name}</span>
              </button>
            );
          })}
          {currentSubcategories.length > 12 && (
            <button
              onClick={() => dispatch(toggleShowAllSubcategories())}
              className="px-4 py-2 rounded-full text-xs md:text-sm font-medium bg-white border border-brand-pink text-brand-pink hover:bg-pink-50 transition-all duration-200"
            >
              {showAllSubcategories ? 'Show Less' : 'See all'}
            </button>
          )}
        </div>

        {/* Results Header */}
        <div className="text-center mb-10">
          <h3 className="text-2xl md:text-3xl font-bold mb-2 text-gray-900">
            All {currentSubcategories.find(s => s.id === activeSubcategory)?.name || 'Vendors'}
            <span className="text-gray-400 font-normal ml-2">({filteredVendors.length})</span>
          </h3>
          <p className="text-gray-500 text-sm md:text-base">
            Start to book {currentSubcategories.find(s => s.id === activeSubcategory)?.name || 'vendors'} for your <span className="text-brand-pink font-semibold">Event</span> Because everything is on place
          </p>
        </div>

        {/* Loading or Vendor Grid */}
        {isLoadingCategory ? (
          <div className="text-center py-20">
            <Loader2 className="w-10 h-10 text-brand-pink animate-spin mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-800 mb-1">Loading vendors...</h3>
            <p className="text-gray-500 text-sm">Fetching the best options for you.</p>
          </div>
        ) : filteredVendors.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
            {filteredVendors.map((vendor) => (
              <VendorCard key={vendor.id} vendor={vendor} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-200 max-w-2xl mx-auto">
            <SearchX className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 font-medium text-lg">Not Available</p>
            <p className="text-gray-400 text-sm mt-2">No vendors found for this specific subcategory.</p>
          </div>
        )}

        {/* End of List Indicator */}
        {!isLoadingCategory && filteredVendors.length > 0 && (
          <div className="mt-12 max-w-md mx-auto">
            <div className="bg-pink-50 rounded-xl p-4 text-center border border-pink-100">
              <div className="w-full bg-pink-200 h-1 rounded-full mb-4">
                <div className="bg-brand-pink h-1 rounded-full w-full"></div>
              </div>
              <p className="text-xs text-gray-500 mb-2">Showing {filteredVendors.length} of {filteredVendors.length} vendors</p>
              <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
                <Star className="w-3 h-3" /> You've reached all available vendors
              </span>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default ExploreCategories;