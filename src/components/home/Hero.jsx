import React, { useState, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import {
  setSearchQuery, setLocation, setDate,
  toggleSearchSuggestions, toggleLocationSuggestions,
  startLoading, finishLoading, resetFilters,
  openLoginScreen  // <-- Added this import
} from '../../features/ui/uiSlice';
import { selectAllLocations, selectAllSearchTerms } from '../../features/data/dataSlice';
import { Search, MapPin, Calendar, X, RotateCcw, Loader2 } from 'lucide-react';
import VendorButton from './VendorButton';

const Hero = () => {
  const dispatch = useAppDispatch();

  const {
    searchQuery, location, date,
    showSearchSuggestions, showLocationSuggestions,
    isLoading, isSearching
  } = useAppSelector((state) => state.ui);
  const { vendors } = useAppSelector((state) => state.data);
  const allSearchTerms = useAppSelector(selectAllSearchTerms);
  const allLocations = useAppSelector(selectAllLocations);

  const [filteredSearch, setFilteredSearch] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const searchRef = useRef(null);
  const locationRef = useRef(null);

  useEffect(() => {
    if (searchQuery.length > 0) {
      setFilteredSearch(allSearchTerms.filter(t => t.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 5));
    } else {
      setFilteredSearch([]);
    }
  }, [searchQuery, allSearchTerms]);

  useEffect(() => {
    if (location.length > 0) {
      setFilteredLocations(allLocations.filter(l => l.toLowerCase().includes(location.toLowerCase())).slice(0, 5));
    } else {
      setFilteredLocations([]);
    }
  }, [location, allLocations]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) dispatch(toggleSearchSuggestions(false));
      if (locationRef.current && !locationRef.current.contains(event.target)) dispatch(toggleLocationSuggestions(false));
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dispatch]);

  const handleSearchSelect = (term) => { dispatch(setSearchQuery(term)); dispatch(toggleSearchSuggestions(false)); };
  const handleLocationSelect = (loc) => { dispatch(setLocation(loc)); dispatch(toggleLocationSuggestions(false)); };

  const handleSearch = () => {
    dispatch(startLoading());
    setTimeout(() => {
      const results = vendors.filter(vendor => {
        const matchSearch = searchQuery === '' ||
          vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          vendor.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchLocation = location === '' ||
          vendor.location.toLowerCase().includes(location.toLowerCase());
        return matchSearch && matchLocation;
      });
      dispatch(finishLoading(results));
      setTimeout(() => {
        document.getElementById('search-results-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }, 2500);
  };

  const handleReset = () => {
    dispatch(resetFilters());
  };

  // ----- FIX: Handle Vendor Button Click -----
  const handleVendorClick = () => {
    // Option A: Open the same login screen as "Sign in / Register"
    dispatch(openLoginScreen());

    // Option B (Recommended for future): Add a separate vendor flag
    // dispatch(openVendorLoginScreen());
  };

  return (
    <section className="relative min-h-[100vh] flex items-center justify-center bg-black py-20">
      <div className="absolute inset-0 z-0">
        <img src="./bg.png" alt="Event background" className="w-full h-full object-cover opacity-80" />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 text-center text-white">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-3 tracking-tight">
          Book <span className="font-bold">DJs, Food Trucks & Venues</span>
        </h1>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-8 tracking-tight">
          Fast, Easy & Without Hassle
        </h2>

        {/* Vendor Button — now opens Login Screen */}
        <div onClick={handleVendorClick} className="mb-10 md:mb-14 inline-block cursor-pointer">
          <VendorButton />
        </div>

        {/* Search Bar Panel */}
        <div className="bg-white/30 border border-white/10 backdrop-blur-sm rounded-xl sm:p-5 md:p-5 opacity-80">
          <div className="grid grid-cols-1 md:grid-cols-2 p-3 lg:grid-cols-4 gap-3 text-left">

            {/* Field 1 */}
            <div className="relative lg:col-span-1" ref={searchRef}>
              <label className="block text-xs font-semibold text-white/90 mb-1.5 ml-1">What are you looking for?</label>
              <div className="bg-white rounded-xl px-3.5 py-2.5 flex items-center gap-2.5">
                <Search className="text-slate-500 w-4 h-4 shrink-0" />
                <input
                  type="text"
                  placeholder="What are you looking for?"
                  value={searchQuery}
                  onChange={(e) => { dispatch(setSearchQuery(e.target.value)); dispatch(toggleSearchSuggestions(true)); }}
                  className="bg-transparent border-none outline-none w-full text-sm font-medium text-slate-800 placeholder-slate-400"
                />
                {searchQuery && <X className="w-4 h-4 py-3 text-slate-400 cursor-pointer" onClick={() => dispatch(setSearchQuery(''))} />}
              </div>
              {showSearchSuggestions && filteredSearch.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1.5 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden z-50">
                  {filteredSearch.map((term, idx) => (
                    <div key={idx} onClick={() => handleSearchSelect(term)} className="px-4 py-2.5 text-sm text-slate-700 hover:bg-pink-50 hover:text-pink-600 cursor-pointer flex items-center gap-2 border-b border-slate-50 last:border-0">
                      <Search className="w-3.5 h-3.5 text-slate-400" /> {term}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Field 2 */}
            <div className="relative lg:col-span-1" ref={locationRef}>
              <label className="block text-xs font-semibold text-white/90 mb-1.5 ml-1">Search location</label>
              <div className="bg-white rounded-xl px-3.5 py-2.5 flex items-center gap-2.5">
                <MapPin className="text-slate-500 w-4 h-4 shrink-0" />
                <input
                  type="text"
                  placeholder="Dallas, TX, USA"
                  value={location}
                  onChange={(e) => { dispatch(setLocation(e.target.value)); dispatch(toggleLocationSuggestions(true)); }}
                  className="bg-transparent border-none outline-none w-full text-sm font-medium text-slate-800 placeholder-slate-400"
                />
                {location && <X className="w-4 h-4 text-slate-400 cursor-pointer" onClick={() => dispatch(setLocation(''))} />}
              </div>
              {showLocationSuggestions && filteredLocations.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1.5 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden z-50">
                  {filteredLocations.map((loc, idx) => (
                    <div key={idx} onClick={() => handleLocationSelect(loc)} className="px-4 py-2.5 text-sm text-slate-700 hover:bg-pink-50 hover:text-pink-600 cursor-pointer flex items-center gap-2 border-b border-slate-50 last:border-0">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" /> {loc}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Field 3 */}
            <div className="lg:col-span-1">
              <label className="block text-xs font-semibold text-white/90 mb-1.5 ml-1">Search Date</label>
              <div className="bg-white rounded-xl px-3.5 py-2.5 flex items-center gap-2.5">
                <Calendar className="text-slate-500 w-4 h-4 shrink-0" />
                <input
                  type="date"
                  value={date}
                  onChange={(e) => dispatch(setDate(e.target.value))}
                  className="bg-transparent border-none outline-none w-full text-sm font-medium text-slate-800 cursor-pointer"
                />
              </div>
            </div>

            {/* Field 4 */}
            <div className="lg:col-span-1">
              <label className="block text-xs font-semibold text-white/90 mb-1.5 ml-1 opacity-0">Action</label>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleSearch}
                  disabled={isLoading}
                  className="flex-1 bg-gradient-to-r from-[#d81b70] via-[#ea1d82] to-[#ff2a5d] hover:opacity-95 disabled:opacity-70 text-white font-semibold rounded-xl text-sm h-[42px] flex items-center justify-center gap-2 transition shadow-md shadow-pink-500/25"
                >
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                  <span>{isLoading ? 'Searching...' : 'Search'}</span>
                </button>

                {isSearching && !isLoading && (
                  <button
                    onClick={handleReset}
                    className="bg-slate-500/80 hover:bg-slate-500 text-white rounded-xl h-[42px] px-3 flex items-center justify-center gap-1.5 transition shrink-0 text-xs font-semibold"
                    title="Clear search"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Reset
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;