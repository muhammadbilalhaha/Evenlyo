import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // Search & Filter state
  searchQuery: '',
  location: '',
  date: '',
  radius: '25',
  showSearchSuggestions: false,
  showLocationSuggestions: false,

  // Category browsing state
  activeCategory: 'locations',
  activeSubcategory: 'aluhallen',
  showAllSubcategories: false,
  isLoadingCategory: false,

  // Search results state
  isSearching: false,
  isLoading: false,
  searchResults: [],

  // Page / View state
  currentPage: 'home',
  selectedVendor: null,
  showLoginScreen: false,
  showBlogPage: false,
  showPricingPage: false,   // NEW
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    // ============ SEARCH INPUTS ============
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      state.showSearchSuggestions = action.payload.length > 0;
    },
    setLocation: (state, action) => {
      state.location = action.payload;
      state.showLocationSuggestions = action.payload.length > 0;
    },
    setDate: (state, action) => { state.date = action.payload; },
    setRadius: (state, action) => { state.radius = action.payload; },

    // ============ SUGGESTIONS ============
    toggleSearchSuggestions: (state, action) => { state.showSearchSuggestions = action.payload; },
    toggleLocationSuggestions: (state, action) => { state.showLocationSuggestions = action.payload; },

    // ============ CATEGORY LOADING ============
    startCategoryLoading: (state) => { state.isLoadingCategory = true; },
    finishCategoryLoading: (state) => { state.isLoadingCategory = false; },

    // ============ CATEGORY / SUBCATEGORY SELECTION ============
    setActiveCategory: (state, action) => {
      state.activeCategory = action.payload;
      state.activeSubcategory = null;
      state.showAllSubcategories = false;
      state.isSearching = false;
      state.currentPage = 'categories';
    },
    setActiveSubcategory: (state, action) => { state.activeSubcategory = action.payload; },
    toggleShowAllSubcategories: (state) => { state.showAllSubcategories = !state.showAllSubcategories; },

    // ============ SEARCH EXECUTION ============
    startLoading: (state) => {
      state.isLoading = true;
      state.isSearching = true;
      state.showSearchSuggestions = false;
      state.showLocationSuggestions = false;
    },
    finishLoading: (state, action) => {
      state.isLoading = false;
      state.isSearching = true;
      state.searchResults = action.payload;
    },
    resetFilters: (state) => {
      state.searchQuery = '';
      state.location = '';
      state.date = '';
      state.radius = '25';
      state.isSearching = false;
      state.isLoading = false;
      state.searchResults = [];
    },

    // ============ NAVIGATION ============
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },

    // ============ VENDOR DETAIL ============
    openVendorDetail: (state, action) => {
      state.selectedVendor = action.payload;
      state.showLoginScreen = false;
      state.showBlogPage = false;
      state.showPricingPage = false;
      state.currentPage = 'vendor';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    closeVendorDetail: (state) => {
      state.selectedVendor = null;
      state.currentPage = 'home';
    },

    // ============ LOGIN SCREEN ============
    openLoginScreen: (state) => {
      state.showLoginScreen = true;
      state.selectedVendor = null;
      state.showBlogPage = false;
      state.showPricingPage = false;
      state.currentPage = 'login';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    closeLoginScreen: (state) => {
      state.showLoginScreen = false;
      state.currentPage = 'home';
    },

    // ============ BLOG PAGE ============
    openBlogPage: (state) => {
      state.showBlogPage = true;
      state.selectedVendor = null;
      state.showLoginScreen = false;
      state.showPricingPage = false;
      state.currentPage = 'blog';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    closeBlogPage: (state) => {
      state.showBlogPage = false;
      state.currentPage = 'home';
    },

    // ============ PRICING PAGE (NEW) ============
    openPricingPage: (state) => {
      state.showPricingPage = true;
      state.selectedVendor = null;
      state.showLoginScreen = false;
      state.showBlogPage = false;
      state.currentPage = 'pricing';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    closePricingPage: (state) => {
      state.showPricingPage = false;
      state.currentPage = 'home';
    },
  },
});

export const {
  // Search
  setSearchQuery, setLocation, setDate, setRadius,
  toggleSearchSuggestions, toggleLocationSuggestions,
  // Category
  startCategoryLoading, finishCategoryLoading,
  setActiveCategory, setActiveSubcategory, toggleShowAllSubcategories,
  // Search execution
  startLoading, finishLoading, resetFilters,
  // Navigation
  setCurrentPage,
  // Vendor
  openVendorDetail, closeVendorDetail,
  // Login
  openLoginScreen, closeLoginScreen,
  // Blog
  openBlogPage, closeBlogPage,
  // Pricing (NEW)
  openPricingPage, closePricingPage,
} = uiSlice.actions;

export default uiSlice.reducer;